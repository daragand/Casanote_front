import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../Partials/Auth/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import MarkerPosition from "../../Assets/images/icon/icon.png";

export default function Inscription() {
  const navigate = useNavigate();
  const { handleSignIn, isSignedIn } = useAuth();

  //useEffect pour rediriger l'usager si déjà connecté
  useEffect(() => {
    if (isSignedIn) {
      // Vérifiez la connexion de l'utilisateur.
      Swal.fire(
        "Déjà connecté",
        "Vous êtes déjà connecté. Vous allez être redirigé vers la page d'accueil.",
        "info"
      ).then(() => {
        navigate("/"); //je redirige vers l'accueil
      });
    }
  }, []);
  //j'ai rétiré la dépendance à isSignedIn car le message se mettait au moment de la connexion

  // création d'un objet pour récupérer les infos
  const [inscription, setInscription] = useState({
    nom: "",
    prenom: "",
    email: "",
    pwd: "",
    confirmation: "",
  });

  //des Regex pour la vérifications en front
  const motifs = {
    Gen: /^([a-zA-Zéèàëïüûêöäôâ-]+)( [a-zA-Zéèàëïüûêöäôâ-]+)*$/,
    Email: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    Password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\];':"\\|,./?]).{8,}$/,
  };

  const nouvellesErreurs = {};
  const [erreursChamps, setErreursChamps] = useState({});

  //renvoi d'un mail de vérification
  function sendEmailAgain(email) {
    console.log("email de send email again function", email);
    axios
      .post(
        `${process.env.REACT_APP_DOMAIN}users/inscription/sendmailagain`,
        { email: email },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("suite à la demande du mail", res);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //submit formulaire inscription
  const verifFormulaire = (e) => {
    e.preventDefault();

    if (!motifs.Gen.test(inscription.nom)) {
      nouvellesErreurs["nom"] = "Votre nom ne doit contenir que des lettres";
    }

    if (!motifs.Gen.test(inscription.prenom)) {
      nouvellesErreurs["prenom"] =
        "Votre prénom ne doit contenir que des lettres";
    }

    if (!motifs.Email.test(inscription.email)) {
      nouvellesErreurs["email"] =
        "Votre mail doit être dans le format monmail@domaine.fr";
    }

    if (!motifs.Password.test(inscription.pwd)) {
      nouvellesErreurs["password"] =
        "Votre mot de passe doit disposer de minimum 8 caractères, dont 1 majuscule, 1 minuscule, 1 chiffre, et 1 caractère spécial";
    }

    if (inscription.confirmation !== inscription.pwd) {
      nouvellesErreurs["confirmation"] = "Les mots de passe sont différents";
    }

    setErreursChamps(nouvellesErreurs);

    if (Object.keys(nouvellesErreurs).length === 0) {
      axios
        .post(`${process.env.REACT_APP_DOMAIN}users/inscription`, inscription, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("réponse inscription", res);
          if (res.status === 200) {
            setInscription({
              nom: "",
              prenom: "",
              pwd: "",
              confirmation: "",
            });
            Swal.fire({
              icon: "success",
              title: "Bravo... vérifiez vos emails",
              text: "Votre compte a été bien été créé. Controlez vos emails pour activer le compte ",
              footer:
                '<a href="#" id="resendEmail">Renvoyer l\'email</a> | <a href="/connexion">Se connecter</a>',
            });
            document
              .getElementById("resendEmail")
              .addEventListener("click", function (e) {
                e.preventDefault(); // Pour éviter que le lien ne navigue
                sendEmailAgain(inscription.email);
              });
          } //fin du if 200
        })
        .catch((error) => {
          const dataError = error.response;
          if (dataError && dataError.status) {
            if (dataError.status === 400) {
              Swal.fire({
                icon: "error",
                title: "Email existant",
                text: "Veuillez choisir un nouvel email ou vous connecter ",
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "ooops...",
                text: "une erreur est survenue. Merci de réitérer votre inscription ",
                footer: '<a href="/connexion">se connecter</a>',
              });
            }
          }
        });
    }
  };

  //tentative de refactorisation de l'inscription au 16/08/2023 via destructuration
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInscription((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (erreursChamps[name]) {
      setErreursChamps((prevErreurs) => {
        const newState = { ...prevErreurs };
        delete newState[name];
        return newState;
      });
    }
  };

  return (
    <div className="main-wrapper">
      <div className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative bgConnexion">
        <div className="auth-box row text-center">
          <div className="col-lg-7 col-md-5 modal-bg-img imgConnexion"></div>
          <div className="col-lg-5 col-md-7 bg-white">
            <div className="p-3">
              <img src="../../Assets/images/icon/icon.png" alt="wrapkit" />
              <h2 className="mt-3 text-center">Sign Up for Free</h2>
              <form className="mt-4" onSubmit={verifFormulaire}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="nom"
                        placeholder="Votre nom"
                        onChange={handleInputChange}
                      />
                      <p className="error">{erreursChamps['nom']}</p>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="prenom"
                        placeholder="Votre prénom"
                        onChange={handleInputChange}
                      />
                      <p className="error">{erreursChamps['prenom']}</p>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        placeholder="Votre email"
                        onChange={handleInputChange}
                      />
                      
                      <p className="error">{erreursChamps['email']}</p>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        name="pwd"
                        type="password"
                        placeholder="password"
                        onChange={handleInputChange}
                      />
                       <p className="error">{erreursChamps['password']}</p>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group mb-3">
                      <input
                        className="form-control"
                        name="confirmation"
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        onChange={handleInputChange}
                      />
                       <p className="error">{erreursChamps['confirmation']}</p>
                    </div>
                  </div>
                  <div className="col-lg-12 text-center">
                    <button type="submit" className="btn w-100 btn-dark">
                      S'inscrire
                    </button>
                  </div>
                  <div className="col-lg-12 text-center mt-5">
                    Vous avez déjà un compte ?{" "}
                    <a href="/connexion" className="text-danger">
                      Se connecter
                    </a>
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
