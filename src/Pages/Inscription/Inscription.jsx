import './style_formulaire.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Inscription() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const navigate = useNavigate()

  //création de motifs de vérification.

  const motifGen = /^([a-zA-Zéèàëïüûêöäôâ-]+)( [a-zA-Zéèàëïüûêöäôâ-]+)*$/;
  const motifEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const motifPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\];':"\\|,./?]).{8,}$/;
  const motifLogin = /^[a-zA-Z0-9_-]{4,}$/; 

  const [erreursChamps, setErreursChamps] = useState({});

  const verifFormulaire = (e) => {
    e.preventDefault();

    // Vérification des champs et mise à jour des erreurs
    const nouvellesErreurs = {};

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

    // Validation réussie, j'effectue donc l'envoi
    if (Object.keys(nouvellesErreurs).length === 0) {
      // Créer un objet pour y ajouter les valeurs des champs



const formInscription = new FormData();
formInscription.append('nom', nom);
formInscription.append('prenom', prenom);
formInscription.append('pseudo', login);
formInscription.append('password', pwd);
formInscription.append('confirmation', confirmation);
formInscription.append('email', email);
console.log(formInscription)
// Effectuer la requête POST avec fetch
fetch('http://localhost:3002/users/inscription', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(formInscription).toString()
})
.then(response => response.json())
.then((data) => {
  // Traiter la réponse du serveur
  console.log(data); 
  if (data.message ==='Le membre a été créé avec succès.'){
    navigate('/')
  }
  // Afficher la réponse du serveur dans la console
  // Autres actions à effectuer en fonction de la réponse du serveur
})
.catch(error => {
  console.error('Erreur:', error); // Afficher les erreurs dans la console
  // Gérer l'erreur d'une manière appropriée
})};
    }
 

  const handleInputChange = (e) => {
    const fieldName = e.target.name;

    // Effacer le message d'erreur correspondant lors de la modification correcte du champ en copiant le champs ErreursChamps
    if (erreursChamps[fieldName]) {
      setErreursChamps((precErreurs) => {
        const newState = { ...precErreurs };
        delete newState[fieldName];
        return newState;
      });
    }

    // Mettre à jour la valeur du champ
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
    }
  };

  return (
    <section className="inscription" id="inscription">
      <h2 className="title">Bienvenue</h2>
      <h4 className="subtitle">Casanote est le carnet d'entretien de votre maison en ligne. Il suit votre demeure dans son histoire, vous permet de recenser les pièces et les travaux que vous jugez opportun de renseigner.</h4>
      <form onSubmit={verifFormulaire}>
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
          class="champs"
          id="prenom"
          name="prenom"
          placeholder="Votre prénom"
          required
          onChange={handleInputChange}
        />
        <p class="error">{erreursChamps['prenom']}</p>
        <input
          type="text"
          class="champs"
          id="email"
          name="email"
          placeholder="Votre adresse mail"
          required
          onChange={handleInputChange}
        />
        <p class="error">{erreursChamps['email']}</p>
        <input
          type="text"
          class="champs"
          id="pseudo"
          name="pseudo"
          placeholder="Choississez un pseudo"
          required
          onChange={handleInputChange}
        />
        <p class="error">{erreursChamps['pseudo']}</p>
        <input
          type="password"
          class="champs"
          id="password"
          name="password"
          placeholder="Choisissez un mot de passe"
          required
          onChange={handleInputChange}
        />
        <p class="error">{erreursChamps['password']}</p>
        <input
          type="password"
          class="champs"
          id="confirmation"
          name="confirmation"
          placeholder="Confirmez votre mot de passe"
          required
          onChange={handleInputChange}
        />
        <p class="error">{erreursChamps['confirmation']}</p>
<button type="submit">s'inscrire</button>

</form>

</section>

    )
}

