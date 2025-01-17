import axios from "axios";
import { useAuth } from "./AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const initAxiosInterceptors = (signOut) => {
  axios.interceptors.response.use(
    (response) => {
      console.log("Response received:", response);
      return response;
    },
    (error) => {
      if (error.response) {
        console.log("Error intercepted:", error.response.status);
        if (
          error.response.status === 402 ||
          error.response.status === 401 ||
          error.response.status === 403
        ) {
          //je le deconnecte
          signOut();
          //je le renvoie à la page de connexion
          useNavigate("/connexion");
          //j'affiche le message d'erreur
          Swal.fire({
            icon: "error",
            title: "Session expirée",
            text: "Votre session a expiré, veuillez vous reconnecter.",
          });
        }

        //en cas de grand nombre de tentative de connexion
        if (error.response.status === 429) {
          //à améliorer pour afficher le temps restant
          Swal.fire({
            icon: "error",
            title: "Trop de tentatives",
            text: "Suite à un grand nombre de tentatives, veuillez réitérer dans 15 minutes. ",
          });
        }

        if (error == undefined) {
          //à améliorer pour afficher le temps restant
          Swal.fire({
            icon: "error",
            title: "Erreur interne",
            text: "Suite à un grand nombre de tentatives, veuillez réitérer dans 15 minutes. ",
          });
          //je le renvoie à la page de connexion
          // useNavigate('/connexion')
        }
        return Promise.reject(error);
      }
    }
  );
};
