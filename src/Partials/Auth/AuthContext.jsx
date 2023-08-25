import React,{useState} from "react";

//si non fonctionnel, tenter Redux ou un autre élément de context

const AuthContext = React.createContext();
//création en local storage d'une info précisant la connexion de l'usager
export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(JSON.parse(localStorage.getItem("Connected")) || false);

  //au moment de la connexion
  const handleSignIn = () => {
    localStorage.setItem("Connected", true);
    setIsSignedIn(true);
  };

  //au moment de la déconnexion
  const handleSignOut = () => {
    localStorage.removeItem("Connected");
    setIsSignedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé au sein d\'un AuthProvider');
  }
  return context;
};
