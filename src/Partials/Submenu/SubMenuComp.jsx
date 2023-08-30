import { useState, useEffect } from "react";
import { useAnimate, stagger, motion } from "framer-motion";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const staggerMenuItems = stagger(0.2, { startDelay: 0.15 });

function useSubMenu(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(10% 50% 90% 50% round 10px)"
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5
      }
    );

    animate(
      "li",
      isOpen
        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0
      }
    );
  }, [isOpen]);

  return scope;
}

export default function SubMenu({ links }) {
  const [isOpen, setIsOpen] = useState(false);
  const scope = useSubMenu(isOpen);

  return (
    <nav className="submenu" ref={scope}>
      <motion.button className="flex-row"
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsOpen(!isOpen)}
      >
          <FontAwesomeIcon icon={faGear} />
        <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </div>
      </motion.button>
      <ul className="cicleul"
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          clipPath: "inset(10% 50% 90% 50% round 10px)"
        }}
      >
        {links.map((link, index) => (
          <li key={index}>
            <Link
              to={link.href}
              onClick={() => {
                setIsOpen(false);
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};


