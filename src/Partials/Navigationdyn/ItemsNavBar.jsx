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



export default function ItemsNavBar({ itemLink }) {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
       <div className="flex-row iconMenu">
        <img src={itemLink.icon} alt={itemLink.name} />
        <Link to={itemLink.url}>{itemLink.name}</Link>
      </div>
    </motion.li>
  );
}
