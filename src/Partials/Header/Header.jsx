
import logoutimg from '../../Assets/Picto/option-de-deconnexion.png'
import compteimg from '../../Assets/Picto/utilisateur.png'
import notifimg from '../../Assets/Picto/notification.png'
import {Link} from "react-router-dom"
export default function Header({ onSignOut }) {

  
    return (

<header role="banner" id="banner">
    <Link to="/"
      id="accueil"><img className="logo_entete" src="../../../Images/logo/logo_projet carnet.png" alt="maison en forme de C avec Casanote écrit dessus"
    /></Link>
        <nav className='menu_entete' role="menubar">
            
        
                <Link to="/compte">
                <img src={compteimg} alt="silhouette d\'un buste de personnage" />
                <p>Mon compte</p>
                </Link>
                <Link to="">
                <img src={notifimg} alt="clochette jaune avec un point d'interrogation" />
                </Link>
                <Link to="" onClick={onSignOut}>
                <img src={logoutimg} alt="carré avec une flèche qui va sur la droite" />
                <p>Deconnexion</p>
                </Link>
            
        </nav>
  </header>





    )
}