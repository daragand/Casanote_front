import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./Partials/Loadingcontext";
import Template from "./Partials/Template/Template";
import Logement from "./Pages/Logement/Logement";
import Pieces from "./Pages/Pieces/Pieces";
import Dashbord from "./Pages/Dashbord/Dashbord";
import Travaux from "./Pages/Travaux/Travaux";
import Informations from "./Pages/Informations/Informations";
import Compte from "./Pages/Compte/Compte";
import Connexion from "./Pages/Inscription/Connexion";
import FormulaireLogement from "./Pages/Logement/AjoutLogement";
import ProtectedRoutes from "./Partials/Auth/ProtectedRoutes";
import Cookies from "universal-cookie";
const userConnected = JSON.parse(localStorage.getItem("Connected")) === true;

function App() {
  const [isSignedIn, setIsSignedIn] = useState(userConnected);

  useEffect(() => {
    console.log("user connected", userConnected);
    console.log("verif isSigned depuis app.js", isSignedIn);
    // je mets à jour isSignedIn en fonction du localStorage chaque fois que cela change.
    const handleStorageChange = () => {
      setIsSignedIn(userConnected);
    };
    //pour tenir compte de chaque changement de connected, je place un ecouteur sur le localStorage
    window.addEventListener("storage", handleStorageChange);
    //pour éviter tout conflit, je le supprime une fois la vérification effectuée.
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <main className="App">
      <LoadingProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/connexion" element={<Connexion />} />
            <Route path="/" element={<Template />}>
              <Route exact path="/" element={<Dashbord />} />
              <Route
                exact
                path="/logement"
                element={
                  <ProtectedRoutes isSignedIn={isSignedIn}>
                    <Logement />
                  </ProtectedRoutes>
                }
              />
              <Route
                exact
                path="/pieces"
                element={
                  <ProtectedRoutes isSignedIn={isSignedIn}>
                    <Pieces />
                  </ProtectedRoutes>
                }
              />
              <Route
                exact
                path="/travaux"
                element={
                  <ProtectedRoutes isSignedIn={isSignedIn}>
                    <Travaux />
                  </ProtectedRoutes>
                }
              />
              <Route exact path="/infos" element={<Informations />} />
              <Route
                exact
                path="/compte"
                element={
                  <ProtectedRoutes isSignedIn={isSignedIn}>
                    <Compte />
                  </ProtectedRoutes>
                }
              />
              <Route
                exact
                path="/logement/ajout"
                element={<FormulaireLogement />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </LoadingProvider>
    </main>
  );
}

export default App;
