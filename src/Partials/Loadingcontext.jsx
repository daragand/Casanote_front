import React, { createContext, useState, useContext } from "react";
import Loader from "./Loader";
//je créé une fonction de conception de context
const LoadingContext = createContext();

export const useLoading = () => {
  return useContext(LoadingContext);
};

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && <Loader />} {/* Votre composant de loader */}
    </LoadingContext.Provider>
  );
};
