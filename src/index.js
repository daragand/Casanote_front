import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//pour la gestion de l'authentification
import { AuthProvider } from './Partials/Auth/AuthContext'
import { ItemToEditProvider } from "./Partials/EditContext/EditContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      
      <App />
      
    </AuthProvider>
  </React.StrictMode>
);

