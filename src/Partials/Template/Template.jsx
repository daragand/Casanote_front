import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Navigation from "../Navigation/Navigation"
import '../../Assets/Css/Style.css'
import {Outlet} from 'react-router-dom'

export default function Template() {
    return (
<main className="grid-global">

<Header />
<Navigation />
<Outlet />
<Footer />



</main>



    )
}