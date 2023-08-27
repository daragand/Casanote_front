import * as React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};



export default function ItemsNavBar({ itemLink, toggleOpen }) {
    return (
      <motion.li
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div 
          className="flex-row iconMenu"
        >
          <Link className="flex-row" to={itemLink.url} onClick={(event) => {
              event.stopPropagation(); // Empêche la propagation de l'événement
              toggleOpen(); // Ferme le menu
            }}>
            <img src={itemLink.icon} alt={itemLink.name} />
            <span>{itemLink.name}</span>
          </Link>
        </div>
      </motion.li>
    );
  }
  
