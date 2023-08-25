import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './connexion_style.scss'
// import './style_formulaire.scss'
import { useAuth } from '../../Partials/Auth/AuthContext';
import axios from "axios";
import Swal from 'sweetalert2'


export default function Connexion() {
 
  const navigate = useNavigate();
  const { handleSignIn,isSignedIn} = useAuth();

  //renvoi d'un mail de vérification
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

  //useEffect pour rediriger l'usager si déjà connecté
  useEffect(() => {
    if (isSignedIn) {  // Vérifiez la connexion de l'utilisateur. 
      Swal.fire(
        'Déjà connecté',
        'Vous êtes déjà connecté. Vous allez être redirigé vers la page d\'accueil.',
        'info'
      ).then(() => {
        navigate('/'); // Redirigez vers la page d'accueil ou toute autre page appropriée.
      });
    }
  }, []);
  //j'ai rétiré la dépendance à isSignedIn car le message se mettait au moment de la connexion

  // création d'un objet pour récupérer les infos
  const [inscription,setInscription] = useState({
    nom:'',
    prenom:'',
    email:'',
    login:'',
    pwd:'',
    confirmation:''
  })

  //des Regex pour la vérifications en front
 const motifs = {
  Gen:/^([a-zA-Zéèàëïüûêöäôâ-]+)( [a-zA-Zéèàëïüûêöäôâ-]+)*$/,
  Email:/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
  Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\];':"\\|,./?]).{8,}$/,
  Login: /^[a-zA-Z0-9_-]{4,}$/ 
 }
 const [infoConnexion, setInfoConnexion] = useState({
  emailConnexion:'',
  passwordConnexion:''
 })
  
  const nouvellesErreurs = {};
  const nouvellesErreursConnexion = {};
  

  const [erreursChamps, setErreursChamps] = useState({});
  const [erreursChampsConnexion, setErreursChampsConnexion] = useState({});
  
  
//submit formulaire inscription
  const verifFormulaire = (e) => {
    e.preventDefault();

    if (!motifs.Gen.test(inscription.nom)) {
      nouvellesErreurs['nom'] = "Votre nom ne doit contenir que des lettres";
    }

    if (!motifs.Gen.test(inscription.prenom)) {
      nouvellesErreurs['prenom'] = "Votre prénom ne doit contenir que des lettres";
    }

    if (!motifs.Email.test(inscription.email)) {
      nouvellesErreurs['email'] = "Votre mail doit être dans le format monmail@domaine.fr";
    }

    if (!motifs.Login.test(inscription.login)) {
      nouvellesErreurs['pseudo'] = "Votre pseudo ne doit contenir que des lettres";
    }

    if (!motifs.Password.test(inscription.pwd)) {
      nouvellesErreurs['password'] = "Votre mot de passe doit disposer de minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre, et 1 caractère spécial";
    }

    if (inscription.confirmation !== inscription.pwd) {
      nouvellesErreurs['confirmation'] = "Les mots de passe sont différents";
    }

    setErreursChamps(nouvellesErreurs);

    if (Object.keys(nouvellesErreurs).length === 0) {
      axios
      .post(`${process.env.REACT_APP_DOMAIN}users/inscription`, inscription,{ withCredentials: true })
        .then((res) => {
          
          console.log('réponse inscription',res);
          if (res.status === 200) {
            setInscription({
              nom:'',
              prenom:'',
            
              login:'',
              pwd:'',
              confirmation:''
          })
            Swal.fire({
              icon: 'success',
              title: 'Bravo... vérifiez vos emails',
              text: 'Votre compte a été bien été créé. Controlez vos emails pour activer le compte ',
              footer: '<a href="#" id="resendEmail">Renvoyer l\'email</a> | <a href="/connexion">Se connecter</a>'
            })
            document.getElementById('resendEmail').addEventListener('click', function(e) {
              e.preventDefault(); // Pour éviter que le lien ne navigue
              sendEmailAgain(inscription.email);
            });
          }
        })
        .catch(error => {
          const dataError = error.response
          if (dataError && dataError.status) {
              if(dataError.status === 400){
            Swal.fire({
              icon: 'error',
              title: 'Email ou pseudo existant',
              text: 'Veuillez choisir un nouvel email ou un autre pseudo ',
            })
            }else{
          Swal.fire({
            icon: 'error',
            title: 'ooops...',
            text: 'une erreur est survenue. Merci de réitérer votre inscription ',
            footer: '<a href="/connexion">se connecter</a>'
          })
          }
        }
        });
    }
  };


  //tentative de refactorisation de l'inscription au 16/08/2023 via destructuration
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInscription(prevState => ({
        ...prevState,
        [name]: value
    }));
    if (erreursChamps[name]) {
      setErreursChamps(prevErreurs => {
          const newState = { ...prevErreurs };
          delete newState[name];
          return newState;
      });
  }
  };

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
      console.log(infoConnexion)
  }
  }

  const [afficherInscription, setAfficherInscription] = useState(true);

  const toggleAfficherInscription = () => {
    setAfficherInscription((prevAfficherInscription) => !prevAfficherInscription);
  };

  const connexionFormulaire = (e) => {
    e.preventDefault();

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
    
    const dataError = error.response

    //je m'assure que l'erreur existe et que la partie status soit défini
    if (dataError && dataError.status) {
//si mot de passe non reconnu
        if(dataError.status === 412){
  console.log('dataError')
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'erreur de mot de passe !',
  })
  //si email inexistant dans la base
       } 
         if(dataError.status=== 410){
    Swal.fire({
      icon: 'error',
      title: 'Email inexistant',
      text: 'merci de vérifier votre email ou de vous inscrire',
    })
      }
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
    });
    }else{

    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Une erreur interne est survenue lors de la connexion !',
    })
     }
    }
     });
      }
    };
 

  return (
    <div className={`inscription ${afficherInscription ? 'connexion-visible' : ''}`}>
      <div className="headerSign">
      <button onClick={toggleAfficherInscription}>Inscription</button><br /><br />
      <button onClick={toggleAfficherInscription}>Sign-in</button>
      </div>
       
      <section id="inscription" className={afficherInscription ? 'fade-out' : ''}>
        <h2 className="title">Bienvenue</h2>
        <h4 className="subtitle">
          Casanote est le carnet d'entretien de votre maison en ligne. Il suit votre demeure dans son histoire, vous permet de recenser les pièces et les travaux que vous jugez opportun de renseigner.
        </h4>
        <form onSubmit={verifFormulaire}>
          <input
            type="text"
            className="champs"
            id="prenom"
            name="prenom"
            placeholder="Votre prénom"
            value={inscription.prenom}
            required
            onChange={handleInputChange}
          />
          <p className="error">{erreursChamps['prenom']}</p>
          <input
            type="text"
            className="champs"
            id="nom"
            name="nom"
            placeholder="Votre nom"
            required
            value={inscription.nom}
            onChange={handleInputChange}
          />
          <p className="error">{erreursChamps['nom']}</p>
          <input
            type="text"
            className="champs"
            id="email"
            name="email"
            value={inscription.email}
            placeholder="Votre adresse mail"
            required
            onChange={handleInputChange}
          />
          <p className="error">{erreursChamps['email']}</p>
          <input
            type="text"
            className="champs"
            id="login"
            name="login"
            value={inscription.login}
            placeholder="Choisissez un pseudo"
            required
            onChange={handleInputChange}
          />
          <p className="error">{erreursChamps['login']}</p>
          <input
            type="password"
            className="champs"
            id="password"
            name="pwd"
            value={inscription.pwd}
            placeholder="Choisissez un mot de passe"
            required
            onChange={handleInputChange}
          />
          <p className="error">{erreursChamps['password']}</p>
          <input
            type="password"
            className="champs"
            id="confirmation"
            name="confirmation"
            value={inscription.confirmation}
            placeholder="Confirmez votre mot de passe"
            required
            onChange={handleInputChange}
          />
          <p className="error">{erreursChamps['confirmation']}</p>
          <button type="submit">S'inscrire</button>
        </form>
      </section>

      <section id="connexion" className={`${afficherInscription ? 'fade-in' : ''} ${afficherInscription ? '' : 'connexion-visible'}`}>
        <h2 className="title">Connexion</h2>
        <h4 className="subtitle">Connectez-vous à votre compte</h4>
        <form onSubmit={connexionFormulaire}>
          <input
            type="text"
            className="champs"
            id="emailConnexion"
            name="emailConnexion"
            placeholder="Adresse email"
            value={infoConnexion.emailConnexion}
            required
          onChange={signInInputChange}/>
          <p className="error">{erreursChampsConnexion['emailConnexion']}</p>
          <input
            type="password"
            className="champs"
            id="passwordConnexion"
            name="passwordConnexion"
            placeholder="Mot de passe"
            value={infoConnexion.passwordConnexion}
            required
            onChange={signInInputChange}
          />
          <p className="error">{erreursChampsConnexion['passwordConnexion']}</p>
          <button type="submit">Se connecter</button>
        </form>
      </section>

     
    </div>
  );
}
