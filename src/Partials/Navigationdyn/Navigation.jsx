import * as React from "react";
import { useRef, useEffect } from "react";
import { motion, useCycle } from "framer-motion";
import  useDimensions  from "./UseDimension";
import  ToggleBtn  from "./ToggleBtn";
import NavBar from "./NavBar";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    }
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
};

export default function Navigation2  () {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

// Fonction pour gérer le clic en dehors du menu
const handleClickOutside = (event) => {
  if (containerRef.current && !containerRef.current.contains(event.target)) {
    toggleOpen();  // fermer le menu
  }
};

useEffect(() => {
  if (isOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }
  
  // Retourner une fonction de nettoyage pour enlever l'écouteur
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [isOpen]);  // Les écouteurs seront ajoutés ou retirés en fonction de la valeur de isOpen




  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
    >
      <motion.div className="backgroundMenu" variants={sidebar} />
      <NavBar toggleOpen={toggleOpen} />
      <ToggleBtn toggle={() => toggleOpen()} />
    </motion.nav>
  );
};
