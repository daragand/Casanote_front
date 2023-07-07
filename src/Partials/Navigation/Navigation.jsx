import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faForward, faBackward, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
          <FontAwesomeIcon icon={faPlay} /> /* Icône pour la fermeture */
        ) : (
          <FontAwesomeIcon icon={faForward} /> /* Icône pour l'ouverture */
        )}
      </button>
      <Link to="/" className={`navigation_menu ${menuRetractable ? 'menuRetractable' : ''}`} style={{ backgroundImage: "url('../images/Picto/tableau_de_bord.png')" }}>
        Dashbord
      </Link>
      <Link to="/logement" className={`navigation_menu ${menuRetractable ? 'menuRetractable' : ''}`} style={{ backgroundImage: "url('../images/Picto/maison.png')" }}>
        Logement
      </Link>
      <Link to="/pieces" className={`navigation_menu ${menuRetractable ? 'menuRetractable' : ''}`} style={{ backgroundImage: "url('../images/Picto/pieces.png')" }}>
        Pièces
      </Link>
      <Link to="/travaux" className={`navigation_menu ${menuRetractable ? 'menuRetractable' : ''}`} style={{ backgroundImage: "url('../images/Picto/travaux_maison.png')" }}>
        Travaux
      </Link>
      <Link to="/infos" className={`navigation_menu ${menuRetractable ? 'menuRetractable' : ''}`} style={{ backgroundImage: "url('../images/Picto/maison.png')" }}>
        Informations
      </Link>
      
    </nav>
  );
};

export default Menu;
