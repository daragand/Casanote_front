import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Carousel({ images }) {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [carouselModal,setCarouselModal]=useState(false)

//pour aggrandir l'image
const toggleModal = () => {
  setCarouselModal(!carouselModal);
};

//pour sortir du clic sur une image
useEffect(() => {
  const closeOnEscape = (e) => {
    if (e.key === "Escape") {
      setCarouselModal(false);
    }
  };

  window.addEventListener("keydown", closeOnEscape);

  return () => {
    window.removeEventListener("keydown", closeOnEscape);
  };
}, []);



  const slideVariants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };
  
  //pour la flèche suivante
  const handleNext = () => {
    setCurrentIndex([(currentIndex + 1) % images.length, 1]);
  };
  //pour la flèche précédente
  const handlePrevious = () => {
    setCurrentIndex([(currentIndex - 1 + images.length) % images.length, -1]);
  };
  //pour la gestion des images en points
  const handleDotClick = (index) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setCurrentIndex([index, newDirection]);
  };

  return (
    <div className="carousel-images">
        <AnimatePresence initial={false} custom={direction}>
        <motion.img

          key={currentIndex}
          onClick={toggleModal}
          src={images[currentIndex]}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
        />
      </AnimatePresence>
      <div className="carousel-slide_direction modal-direction">
        <div className="carousel-arrow-left modal-arrow-left" onClick={handlePrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </div>
        <div className="carousel-arrow-right modal-arrow-right" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            viewBox="0 96 960 960"
            width="20"
          >
            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
          </svg>
        </div>
      </div>
      <div className="carousel-indicator modal-indicator">
        {images.map((_, index) => (
          <div
            key={index}
            className={`carousel-dot ${currentIndex === index ? "dot-active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
      {carouselModal && (
        <div className="carousel-modal">
          <motion.img
            src={images[currentIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="modal-close" onClick={toggleModal}>
            X
          </div>
        </div>
      )}
    </div>
  );
}
