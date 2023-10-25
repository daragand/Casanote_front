
import { useState, useEffect } from 'react';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import { useAuth } from '../../Partials/Auth/AuthContext';
import axios from "axios";
import Swal from 'sweetalert2'
import logo from '../../Assets/visu/logo.png'
import visuhouse from '../../Assets/visu/connexion_house.svg'
import MarkerPosition from "../../Assets/images/icon/icon.png"


export default function Connexion() {
  const navigate = useNavigate();
  const { handleSignIn,isSignedIn} = useAuth();
  const [infoConnexion, setInfoConnexion] = useState({
    emailConnexion:'',
    passwordConnexion:''
   })
   const nouvellesErreurs = {};
   const nouvellesErreursConnexion = {};
   const [erreursChampsConnexion, setErreursChampsConnexion] = useState({});
   //des Regex pour la vérifications en front
 const motifs = {
  Gen:/^([a-zA-Zéèàëïüûêöäôâ-]+)( [a-zA-Zéèàëïüûêöäôâ-]+)*$/,
  Email:/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\];':"\\|,./?]).{8,}$/,
 }

  //useEffect pour rediriger l'usager si déjà connecté
  useEffect(() => {
    if (isSignedIn) {  // Vérifiez la connexion de l'utilisateur. 
      Swal.fire(
        'Déjà connecté',
        'Vous êtes déjà connecté. Vous allez être redirigé vers la page d\'accueil.',
        'info'
      ).then(() => {
        navigate('/'); //je redirige vers l'accueil
      });
    }
  }, []);

  //tentative de refactorisation de la partie connexion au 16/08/2023 via destructuration
  const signInInputChange = (e) => {
    const { name, value } = e.target;

    setInfoConnexion(prevState => ({
        ...prevState,
        [name]: value
    }));
    if (erreursChampsConnexion[name]) {
      setErreursChampsConnexion(prevErreurs => {
          const newState = { ...prevErreurs };
          delete newState[name];
          return newState;
      });
      
  }
  }

  //renvoi d'un mail de vérification pour que l'usager puisse confirmer son inscription si nécessaire.
  function sendEmailAgain(email) {
    console.log('email de send email again function',email)
    axios.post(`${process.env.REACT_APP_DOMAIN}users/inscription/sendmailagain`,{email:email},{ withCredentials: true })
    .then((res)=>{
console.log('suite à la demande du mail',res)
    })
    .catch(error => {
      console.error(error)
    })
  }


  const connexionFormulaire = (e) => {
    e.preventDefault();
    console.log('info de connexion',infoConnexion);

    if (!motifs.Email.test(infoConnexion.emailConnexion)) {
      nouvellesErreursConnexion['emailConnexion'] = "Votre mail doit être dans le format monmail@domaine.fr";
    }
    setErreursChampsConnexion(nouvellesErreurs);
    
    if (Object.keys(nouvellesErreurs).length === 0) {
     
      axios
      .post(`${process.env.REACT_APP_DOMAIN}users/sign`, infoConnexion,{ withCredentials: true })
          .then((data) => {
            
              if (data.status === 200) {
              //j'utilise la fonction handleSignIn situé dans le context Auth.
                handleSignIn()

              //une pop-up pour confirmer la création du compte
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Connexion réussie',
                showConfirmButton: false,
                timer: 2500
                })
                    .then(() => {
                          // La connexion a réussi, je redirige maintenant l'utilisateur vers le dashbord ou l'origine par la suite.
                        navigate('/')
                    })
}
    
  })
  .catch(error => {
    console.log('',error)
    const dataError = error.response

    //je m'assure que l'erreur existe et que la partie status soit défini
    if (dataError && dataError.status) {
      console.log('erreur lors de la connexion',dataError)
        //si mot de passe non reconnu
        if(dataError.status === 412){
             
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'erreur de mot de passe !',
      })}//fin du if 412
  //si email inexistant dans la base
        
         if(dataError.status=== 410){
    Swal.fire({
      icon: 'error',
      title: 'Email inexistant',
      text: 'merci de vérifier votre email ou de vous inscrire',
    })
      }//fin du if 410
  //si l'utilisateur n'a pas confirmé son adresse mail. 
      if(dataError.status=== 414){
    Swal.fire({
      icon: 'error',
      title: 'Compte non vérifié',
      text: 'merci d\'activer votre compte. Vérifiez vos mails ou les spams',
      footer: '<a href="#" id="resendConnexionEmail">Renvoyer l\'email</a>'
    })
    //pour récupérer à nouveau le mail. a voir si autre idée à mettre en place
          document.getElementById('resendConnexionEmail').addEventListener('click', function(e) {
            e.preventDefault(); 
            const mailCandidat= document.getElementById('emailConnexion').value
            sendEmailAgain(mailCandidat);
              })
       };//fin du if 414
    
    }else{

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Une erreur interne est survenue lors de la connexion !',
    })
     }//fin du else
    })//fin du catch error
     };
      }
    

  return (
    <div className="main-wrapper">
    <div className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative bgConnexion" >
      <div className="auth-box row">
        <div className="col-lg-7 col-md-5 modal-bg-img imgConnexion" >
        </div>
        <div className="col-lg-5 col-md-7 bg-white">
          <div className="p-3">
            <div className="text-center">
              <img src={MarkerPosition} alt="logo de position" />
            </div>
            <h2 className="mt-3 text-center">Se Connecter</h2>
            <p className="text-center">Renseignez vos identifiants pour accéder au service.</p>
            <form className="mt-4" onSubmit={connexionFormulaire}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label className="form-label text-dark" htmlFor="emailConnexion">Email</label>
                    <input className="form-control"  name="emailConnexion" id="emailConnexion" type="email" placeholder="Renseignez votre email" onChange={signInInputChange} />
                    <p className="error">{erreursChampsConnexion['emailConnexion']}</p>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label className="form-label text-dark" htmlFor="pwd">Mot de passe</label>
                    <input className="form-control" id="pwd" name="passwordConnexion" type="password" placeholder="enter your password" onChange={signInInputChange}/>
                    <p className="error">{erreursChampsConnexion['passwordConnexion']}</p>
                  </div>
                </div>
                <div className="col-lg-12 text-center">
                  <button type="submit" className="btn w-100 btn-dark">Se connecter</button>
                </div>
                <div className="col-lg-12 text-center mt-5">
                 Pas encore de compte? <Link to="/inscription" className="text-danger">S'inscrire</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
