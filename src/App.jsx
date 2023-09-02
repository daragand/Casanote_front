import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initAxiosInterceptors } from "./Partials/Auth/InterceptorAxios"
import { AuthProvider,useAuth } from "./Partials/Auth/AuthContext"
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
import VerifCompte from "./Pages/Inscription/VerificationMail";
import UpdateHouse from "./Pages/Logement/UpdateHouse";



function App() {
  const {handleSignOut}  = useAuth();

 
 
  useEffect(() => {
    initAxiosInterceptors(handleSignOut);
  }, [handleSignOut]);


  return (
    <main className="App">
      <LoadingProvider>
          <AuthProvider>
        <BrowserRouter>
          <Routes>
          <Route exact path="/connexion" element={<Connexion />} />
          <Route exact path="/users/confirmInscription/:token/:email" element={<VerifCompte />} />
              
            <Route path="/" element={<Template />}>
              <Route exact path="/" element={<Dashbord />} />
              <Route
                exact
                path="/logement"
                element={
                  <ProtectedRoutes >
                    <Logement />
                  </ProtectedRoutes>
                }
              />
              <Route
                exact
                path="/house/update/:id"
                element={
                  <ProtectedRoutes >
                    <UpdateHouse />
                  </ProtectedRoutes>
                }
              />
              <Route
                exact
                path="/pieces"
                element={
                  <ProtectedRoutes >
                    <Pieces />
                  </ProtectedRoutes>
                }
                />
              <Route
                exact
                path="/travaux"
                element={
                  <ProtectedRoutes >
                    <Travaux />
                  </ProtectedRoutes>
                }
                />
              <Route exact path="/infos" element={<Informations />} />
              <Route
                exact
                path="/compte"
                element={
                  <ProtectedRoutes >
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
            </AuthProvider>
      </LoadingProvider>
    </main>
  );
}

export default App;
