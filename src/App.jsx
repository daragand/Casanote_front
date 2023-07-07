import logo from './logo.svg';
import './Assets/Css/Style.css'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from './Partials/Template/Template'
import Logement from './Pages/Logement/Logement'
import Pieces from './Pages/Pieces/Pieces'
import Dashbord from './Pages/Dashbord/Dashbord'
import Travaux from './Pages/Travaux/Travaux'
import Informations from './Pages/Informations/Informations';
import Compte from './Pages/Compte/Compte';
import Inscription from './Pages/Inscription/Inscription';


function App() {
  return (
    <main  className="App">
<BrowserRouter>
        <Routes>
        <Route path="/" element={<Template />}>
          <Route path="/" element={<Dashbord />}/>
          <Route path="/logement" element={<Logement />}/>
          <Route path="/pieces" element={<Pieces />}/>
          <Route path="/travaux" element={<Travaux />}/>
          <Route path="/infos" element={<Informations />}/>
          <Route path="/compte" element={<Compte />}/>
</Route>
<Route path="/Inscription" element={<Inscription/>}/>
        </Routes>

</BrowserRouter>


    </main>
  );
}

export default App;
