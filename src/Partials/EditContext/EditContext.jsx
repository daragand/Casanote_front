import React, { createContext, useContext, useState } from "react";

// Création du contexte à exploiter pour la modification du logement, de la pièce et du travaux
export const ItemToEditContext = createContext();

// Le Provider qui rendra le contexte accessible à ses enfants
export const ItemToEditProvider = ({ children }) => {
  const [itemToEdit, setItemToEdit] = useState(null);

  return (
    <ItemToEditContext.Provider value={{ itemToEdit, setItemToEdit }}>
      {children}
    </ItemToEditContext.Provider>
  );
};

// Un hook personnalisé pour utiliser ce contexte
export const useItemToEdit = () => {
  const context = useContext(ItemToEditContext);
  if (!context) {
    throw new Error(
      "useItemToEdit doit être utilisé au sein d'un ItemToEditProvider. Vérifier dans App.js que le composant y est bien intégré"
    );
  }
  return context;
};
