import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faForward, faBackward, faPlay,faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//importation des images
import dashbordimg from '../../Assets/Picto/tableau_de_bord.png'
import logementimg from '../../Assets/Picto/maison.png'
import piecesimg from '../../Assets/Picto/pieces.png'
import travauximg from '../../Assets/Picto/travaux.png'
import infoimg from '../../Assets/Picto/travaux.png'

library.add(faForward, faBackward, faPlay);

const Menu = () => {
  const [menuRetractable, setMenuRetractable] = useState(false);

  const toggleMenu = () => {
    setMenuRetractable(!menuRetractable);
  };

  return (
    <nav id="navigation" role="navigation" className={`menu ${menuRetractable ? 'menuRetractable' : ''}`}>
      <button className="toggle_button" onClick={toggleMenu}>
        {menuRetractable ? (
          <FontAwesomeIcon icon={faEllipsisVertical} /> /* Icône pour la fermeture */
        ) : (
          <FontAwesomeIcon icon={faBars} /> /* Icône pour l'ouverture */
        )}
      </button>
      <Link to="/" className={`navigation_menu ${menuRetractable ? 'menuRetractable' : ''}`} style={{ backgroundImage: `url(${dashbordimg})` }}>
        Dashbord
      </Link>
      <Link to="/logement" className={`navigation_menu ${menuRetractable ? 'menuRetractable' : ''}`} style={{ backgroundImage: `url(${logementimg})` }}>
        Logement
      </Link>
      <Link to="/pieces" className={`navigation_menu ${menuRetractable ? 'menuRetractable' : ''}`} style={{ backgroundImage: `url(${piecesimg})` }}>
        Pièces
      </Link>
      <Link to="/travaux" className={`navigation_menu ${menuRetractable ? 'menuRetractable' : ''}`} style={{ backgroundImage: `url(${travauximg})` }}>
        Travaux
      </Link>
      <Link to="/infos" className={`navigation_menu ${menuRetractable ? 'menuRetractable' : ''}`} style={{ backgroundImage: `url(${infoimg})` }}>
        Informations
      </Link>
      
    </nav>
  );
};

export default Menu;
