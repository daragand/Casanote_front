

import {Link} from "react-router-dom"
export default function Header() {
    return (

<header role="banner" id="banner">
    <Link to="/"
      id="accueil"><img class="logo_entete" src="../../../Images/logo/logo_projet carnet.png" alt=""
    /></Link>
        <nav class='menu_entete' role="menubar">
            
        
                <Link to="/compte">
                <img src="../../../images/Picto/utilisateur.png" alt="" />
                <p>Mon compte</p>
                </Link>
                <Link to="">
                <img src="../../../images/Picto/notification.png" alt="" />
                </Link>
                <Link to="">
                <img src="../../../images/picto/option-de-deconnexion.png" alt="" />
                <p>Deconnexion</p>
                </Link>
            
        </nav>
  </header>





    )
}