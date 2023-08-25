import  { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VerifCompte () {
    const { token, email } = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        // je tente de récupérer le token et l'email depuis l'URL
        
console.log(token)
        if (token && email) {
            // Appel API pour confirmer l'inscription
            axios.get(`http://localhost:3002/users/confirmInscription/${token}/${email}`)
            .then(response => {
                if (response.status===200) {
                    Swal.fire({
                        title: 'Compte validé !',
                        text: response.message,
                        icon: 'success',
                        confirmButtonText: 'Se connecter',
                        //fonction sur sweetAlert pour diriger vers la page de connexion
                willClose: () => {
                    navigate('/connexion')
                }
                    });
                } else if (response.error) {
                    Swal.fire({
                        title: 'Erreur!',
                        text: response.error,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'Erreur!',
                    text: 'Une erreur est survenue lors de la vérification de votre compte.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
        } else {
            Swal.fire({
                title: 'Erreur!',
                text: 'Token ou email manquants dans l\'URL.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }, [token, email]);

    return (
        <div>
            <h1>Vérification du compte en cours</h1>
            <p>Veuillez patienter...</p>
        </div>
    );
};


