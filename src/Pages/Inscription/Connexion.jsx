import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './connexion_style.scss'
import './style_formulaire.scss'
import Cookies from "universal-cookie";
import Swal from 'sweetalert2'
const cookies = new Cookies();

export default function Connexion({ onSignIn }) {
  const connected=JSON.parse(localStorage.getItem("Connected"))
  const location = useLocation();
  const navigate = useNavigate();





  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [email_connexion, setEmail_connexion] = useState('');
  const [pwd_connexion, setPwd_connexion] = useState('');
  const motifGen = /^([a-zA-Zéèàëïüûêöäôâ-]+)( [a-zA-Zéèàëïüûêöäôâ-]+)*$/;
  const motifEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const motifPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\];':"\\|,./?]).{8,}$/;
  const motifLogin = /^[a-zA-Z0-9_-]{4,}$/;
  const nouvellesErreurs = {};
  

  const [erreursChamps, setErreursChamps] = useState({});

  const verifFormulaire = (e) => {
    e.preventDefault();

    if (!motifGen.test(nom)) {
      nouvellesErreurs['nom'] = "Votre nom ne doit contenir que des lettres";
    }

    if (!motifGen.test(prenom)) {
      nouvellesErreurs['prenom'] = "Votre prénom ne doit contenir que des lettres";
    }

    if (!motifEmail.test(email)) {
      nouvellesErreurs['email'] = "Votre mail doit être dans le format monmail@domaine.fr";
    }

    if (!motifLogin.test(login)) {
      nouvellesErreurs['pseudo'] = "Votre pseudo ne doit contenir que des lettres";
    }

    if (!motifPassword.test(pwd)) {
      nouvellesErreurs['password'] = "Votre mot de passe doit disposer de minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre, et 1 caractère spécial";
    }

    if (confirmation !== pwd) {
      nouvellesErreurs['confirmation'] = "Les mots de passe sont différents";
    }

    setErreursChamps(nouvellesErreurs);

    if (Object.keys(nouvellesErreurs).length === 0) {
      const formInscription = new FormData();
      formInscription.append('nom', nom);
      formInscription.append('prenom', prenom);
      formInscription.append('pseudo', login);
      formInscription.append('password', pwd);
      formInscription.append('confirmation', confirmation);
      formInscription.append('email', email);

      fetch(`${process.env.REACT_APP_DOMAIN}users/inscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formInscription).toString()
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          if (data.message === 'Le membre a été créé avec succès.') {
            setNom('')
            setPrenom('')
            setEmail('')
            setLogin('')
            setPwd('')
            setConfirmation('')
            Swal.fire({
              icon: 'success',
              title: 'Bravo',
              text: 'Votre compte a été bien été créé ',
              footer: '<a href="/connexion">se connecter</a>'
            })
          }
        })
        .catch(error => {
          console.error('Erreur:', error);
        });
    }
  };

  const handleInputChange = (e) => {
    const fieldName = e.target.name;

    if (erreursChamps[fieldName]) {
      setErreursChamps((precErreurs) => {
        const newState = { ...precErreurs };
        delete newState[fieldName];
        return newState;
      });
    }

    if (fieldName === 'nom') {
      setNom(e.target.value);
    } else if (fieldName === 'prenom') {
      setPrenom(e.target.value);
    } else if (fieldName === 'email') {
      setEmail(e.target.value);
    } else if (fieldName === 'pseudo') {
      setLogin(e.target.value);
    } else if (fieldName === 'password') {
      setPwd(e.target.value);
    } else if (fieldName === 'confirmation') {
      setConfirmation(e.target.value);
    } else if (fieldName === 'email-connexion') {
      setEmail_connexion(e.target.value);
    } else if (fieldName === 'password-connexion') {
      setPwd_connexion(e.target.value);
    }
  };

  const [afficherInscription, setAfficherInscription] = useState(true);

  const toggleAfficherInscription = () => {
    setAfficherInscription((prevAfficherInscription) => !prevAfficherInscription);
  };

  const connexionFormulaire = (e) => {
    e.preventDefault();

    if (!motifEmail.test(email_connexion)) {
      nouvellesErreurs['email-connexion'] = "Votre mail doit être dans le format monmail@domaine.fr";
    }
    setErreursChamps(nouvellesErreurs);
    
    if (Object.keys(nouvellesErreurs).length === 0) {
      fetch(`${process.env.REACT_APP_DOMAIN}users/sign`, {
        method: 'POST',
        credentials: 'include', // c'est l'équivalent de withCredentials: true pour axios
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email_connexion,
          password: pwd_connexion
        })
          })
          .then(response => response.json())
  .then((data) => {
    console.log(data);
    if (data.message === 'Connexion établie') {
      //je place quelques infos en local storage pour une exploitation de protection de page et un usage par la suite
onSignIn(data.user);


//une pop-up pour confirmer la création du compte
Swal.fire({
  position: 'center',
  icon: 'success',
  title: 'Connexion réussie',
  showConfirmButton: false,
  timer: 2500
}).then(() => {
      // La connexion a réussi, je redirige maintenant l'utilisateur vers le dashbord ou l'origine par la suite.
    navigate('/')
})
}
    //si mot de passe non reconnu
    if(data.message=== "Mot de passe erroné"){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'erreur de mot de passe !',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  })
  .catch(error => {
    console.error('Erreur lors de la connexion:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Une erreur est survenue lors de la connexion !',
      footer: '<a href="">Why do I have this issue?</a>'
    })
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
            value={nom}
            onChange={handleInputChange}
          />
          <p className="error">{erreursChamps['nom']}</p>
          <input
            type="text"
            className="champs"
            id="email"
            name="email"
            placeholder="Votre adresse mail"
            required
            onChange={handleInputChange}
          />
          <p className="error">{erreursChamps['email']}</p>
          <input
            type="text"
            className="champs"
            id="pseudo"
            name="pseudo"
            placeholder="Choisissez un pseudo"
            required
            onChange={handleInputChange}
          />
          <p className="error">{erreursChamps['pseudo']}</p>
          <input
            type="password"
            className="champs"
            id="password"
            name="password"
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
            id="email-connexion"
            name="email-connexion"
            placeholder="Adresse email"
            required
          onChange={handleInputChange}/>
          <p className="error">{erreursChamps['email-connexion']}</p>
          <input
            type="password"
            className="champs"
            id="password-connexion"
            name="password-connexion"
            placeholder="Mot de passe"
            required
            onChange={handleInputChange}
          />
          <p className="error">{erreursChamps['password-connexion']}</p>
          <button type="submit">Se connecter</button>
        </form>
      </section>

     
    </div>
  );
}
