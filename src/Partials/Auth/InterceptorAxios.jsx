import axios from 'axios';
import { useAuth } from './AuthContext'
import Swal from 'sweetalert2'

export const initAxiosInterceptors = (signOut) => {
axios.interceptors.response.use(

    
    (response) => {
      console.log("Response received:", response);
      return response;
    },
    (error) => {
      if(error.response){
      console.log("Error intercepted:", error);
      if (error.response.status === 402 || error.response.status === 401|| error.response.status === 403) {
        signOut();
        Swal.fire({
          icon: 'error',
          title: 'Session expirée',
          text: 'Votre session a expiré, veuillez vous reconnecter.',
        });
      }

      //en cas de grand nombre de tentative de connexion
      if (error.response.status === 429) {
        Swal.fire({
            icon: 'error',
            title: 'Trop de tentatives',
            text: 'Suite à un grand nombre de tentatives, veuillez réitérer dans 15 minutes. ',
          })
      }
      return Promise.reject(error);
    }
    }
  );
}