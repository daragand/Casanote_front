import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Navigation2 from "../Navigationdyn/Navigation"
import '../../Assets/Css/Style.css'
// import '../../Assets/Css/connexion_style.css';

import {Outlet} from 'react-router-dom'

export default function Template() {
    return (
<main className="grid-global">

<Header />
<Navigation2 />
<Outlet />
<Footer />



</main>



    )
}