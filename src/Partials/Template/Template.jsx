import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Navigation from "../Navigation/Navigation"
import '../../Assets/Css/Style.css'
import {Outlet} from 'react-router-dom'

export default function Template({ onSignOut }) {
    return (
<main className="grid-global">

<Header onSignOut={onSignOut} />
<Navigation />
<Outlet />
<Footer />



</main>



    )
}