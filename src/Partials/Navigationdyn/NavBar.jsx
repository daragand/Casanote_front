import * as React from "react";
import { motion } from "framer-motion";
import  ItemsNavBar  from "./ItemsNavBar";
import dashbordimg from '../../Assets/Picto/tableau_de_bord.png'
import logementimg from '../../Assets/Picto/maison.png'
import piecesimg from '../../Assets/Picto/pieces.png'
import travauximg from '../../Assets/Picto/travaux.png'
import infoimg from '../../Assets/Picto/travaux.png'
const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};
const itemMenu = [
    {url:"/",name:"Dashbord",icon:dashbordimg},
    {url:"/logement",name:"Logement",icon:logementimg},
    {url:"/pieces",name:"Pièces",icon:piecesimg},
    {url:"/Travaux",name:"Travaux",icon:travauximg},
    {url:"/Infos",name:"Informations",icon:infoimg}
];

export default function NavBar ({ toggleOpen,isOpen }) {
    return (
      <motion.ul variants={variants} className={isOpen ? 'nav-links-active' : 'nav-links-inactive'} >
        {itemMenu.map(link => (
          <ItemsNavBar itemLink={link} key={link.name} toggleOpen={toggleOpen} />
        ))}
      </motion.ul>
    );
  };
  