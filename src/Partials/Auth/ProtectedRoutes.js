import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";



export default function ProtectedRoutes({ children,isSignedIn }) {

    console.log('cequejerecupereenisSigned',isSignedIn)
 
  //je créé une constante avec les infos du user pour trouver aisément son pseudo ou son mail
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const user={
        email:localStorage.getItem("userEmail"),
        pseudo:localStorage.getItem("userPseudo")
    }
    if(isSignedIn){
      setUserData(user)
    } else {
      setUserData(null);
      localStorage.removeItem("UserEmail")
      localStorage.removeItem("UserPseudo")
    }
   
  }, []);

  // Si l'utilisateur est connecté et le token est valide(vérifié coté Node), j'affiche le contenu protégé
  // Sinon, je redirige vers la page de connexion
  return isSignedIn ? children : <Navigate to="/connexion" state={{ from: location }} replace />;
}
