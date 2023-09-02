import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import "./FormAjoutLogement.css";
import axios from "axios";
import { useLoading } from "../../Partials/Loadingcontext";
import Swal from "sweetalert2";
import ImageUploader from "../../Partials/Imagesuploader/ImageUploader";
import ImagePreview from "../../Partials/Imagesuploader/ImageView";
import { useItemToEdit  } from "../../Partials/EditContext/EditContext";



function LocalisationStep({ onNext, data }) {
  const { setLoading } = useLoading();
  const [typeLogement, setTypeLogement] = useState(data.typeLogement || "");
  const [adresse, setAdresse] = useState(data.adresse || "");
  const [cp, setCp] = useState(data.cp || "");
  const [ville, setVille] = useState(data.ville || "");
  const [rue, setRue] = useState(data.rue || "");

  return (
    <form>
      <label htmlFor="adresse">Type de logement</label>
      <br />
      <br />
      <section className="typeLogement">
        <div>
          <input
            type="radio"
            id="Appartement"
            name="Appartement"
            value="Appartement"
            checked={typeLogement === "Appartement"}
            onChange={(e) => setTypeLogement(e.target.value)}
          />
          <label htmlFor="Appartement">Appartement</label>
          <br />
          <br />
        </div>
        <div>
          <input
            type="radio"
            id="Maison"
            name="Maison"
            value="Maison"
            checked={typeLogement === "Maison"}
            onChange={(e) => setTypeLogement(e.target.value)}
          />
          <label htmlFor="Maison">Maison</label>
          <br />
          <br />
        </div>
      </section>
      <label htmlFor="adresse">Adresse</label>
      <br />
      <input
        type="text"
        id="adresse"
        name="adresse"
        placeholder="N° et nom de la rue"
        value={adresse}
      />

      <br />
      <br />
      <label htmlFor="cp">Rue</label>
      <input
        type="text"
        id="rue"
        name="rue"
        placeholder="rue de la liberté"
        value={rue}
      />
      <br />
      <br />
      <label htmlFor="cp">Code Postal</label>
      <input type="text" id="cp" name="cp" placeholder="60000" value={cp} />
      <label htmlFor="ville">Ville</label>
      <input
        type="text"
        id="ville"
        name="ville"
        value={ville}
        placeholder="Franconville"
      />
      <br />
      <br />
      <button
        type="button"
        onClick={() =>
          onNext({ label: adresse, typeLogement, ville, cp, adresse: rue })
        }
      >
        Suivant
      </button>
    </form>
  );
}

function PiecesSurfaceStep({ onNext, data }) {
  const [niveaux, setNiveaux] = useState(data.niveaux || 1);
  const [pieces, setPieces] = useState(data.pieces || 1);
  const [surface, setSurface] = useState(data.surface || 0);

  const handleNext = (e) => {
    e.preventDefault();
    onNext({ niveaux, pieces, surface });
  };

  return (
    <form>
      <label htmlFor="niveaux">Nombre de niveaux :</label>
      <input
        type="number"
        id="niveaux"
        name="niveaux"
        min="1"
        value={niveaux}
        onChange={(e) => setNiveaux(parseInt(e.target.value))}
      />
      <br />
      <br />
      <label htmlFor="pieces">Nombre de pièces :</label>
      <input
        type="number"
        id="pieces"
        min="1"
        name="pieces"
        value={pieces}
        onChange={(e) => setPieces(parseInt(e.target.value))}
      />
      <br />
      <br />
      <label htmlFor="surface">Surface habitable en m² :</label>
      <input
        type="number"
        id="surface"
        name="surface"
        value={surface}
        onChange={(e) => setSurface(parseInt(e.target.value))}
      />
      <br />
      <br />
      <button type="button" onClick={handleNext}>
        Suivant
      </button>
    </form>
  );
}

function ChauffageStep({ onNext, data }) {
  const [chauffage, setChauffage] = useState(data.chauffage || "");
  const [errorChauffage, seterrorChauffage] = useState(false);
  //gestion de l'étape suivante avec envoi de l'info chauffage
  const handleNext = (e) => {
    e.preventDefault();
    if (chauffage) {
      onNext({ chauffage });
    } else {
      seterrorChauffage(true);
    }
  };

  return (
    <form>
      <label>Type de chauffage principal :</label>
      <br />
      <input
        type="radio"
        id="gaz"
        name="chauffage"
        value="gaz"
        checked={chauffage === "gaz"}
        onChange={() => setChauffage("gaz")}
      />
      <label htmlFor="gaz">Gaz</label>
      <br />
      <input
        type="radio"
        id="fioul"
        name="chauffage"
        value="fioul"
        checked={chauffage === "fioul"}
        onChange={() => setChauffage("fioul")}
      />
      <label htmlFor="fioul">Fioul</label>
      <br />
      <input
        type="radio"
        id="pompe_a_chaleur"
        name="chauffage"
        value="pompe à chaleur"
        checked={chauffage === "pompe à chaleur"}
        onChange={() => setChauffage("pompe à chaleur")}
      />
      <label htmlFor="pompe_a_chaleur">Pompe à chaleur</label>
      <br />
      <input
        type="radio"
        id="climatisation"
        name="chauffage"
        value="climatisation"
        checked={chauffage === "climatisation"}
        onChange={() => setChauffage("climatisation")}
      />
      <label htmlFor="climatisation">Climatisation</label>
      <br />
      <br />
      {/* placer le message d'erreur à ce niveau */}
      <br />
      <br />
      <button type="button" onClick={handleNext}>
        Suivant
      </button>
    </form>
  );
}

function DateEntreeStep({ onValidate, data }) {
  const [dateEntree, setDateEntree] = useState(data.dateEntree || "");
  const [nomLogement, setNomLogement] = useState(
    data.nomLogement || "Logement principal"
  );
  const [imagesLogement, setImagesLogement] = useState([]);

  // pour la récupération des images du logement
  const handleImagesSelected = (newImages) => {
    setImagesLogement((prev) => [...prev, ...newImages]);
  };

  const handleValidate = (e) => {
    e.preventDefault();

    //gestion des images
    const images = new FormData();
    for (let file of imagesLogement) {
      images.append("imagesLogement", file);
    }

    onValidate({ dateEntree, nomLogement, images: imagesLogement });
  };
  return (
    <form>
      <label htmlFor="nomLogement">Nom attribué à votre logement :</label>
      <input
        type="text"
        id="nomLogement"
        name="nomLogement"
        value={nomLogement}
        onChange={(e) => setNomLogement(e.target.value)}
        required
      />
      <label htmlFor="date_entree">Date d'entrée dans le logement :</label>
      <input
        type="date"
        id="date_entree"
        name="date_entree"
        value={dateEntree}
        onChange={(e) => setDateEntree(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="imagesLogement">Images de votre logement :</label>
      <ImageUploader onImagesSelected={handleImagesSelected} />
      <ImagePreview images={imagesLogement} />

      <button type="submit" onClick={handleValidate}>
        Valider
      </button>
    </form>
  );
}

export default function UpdateHouse({selectedLogement}) {
  const { itemToEdit, setItemToEdit } = useItemToEdit();

  const [currentStep, setCurrentStep] = useState(1);
  
  
  //je passe le logement via state et useLocation de SubMenu sur la route
  
 

  console.log("Selected House:", itemToEdit);


  //récupération des données de SelectedHouse dans formData
  const [formData, setFormData] = useState({
    localisation: itemToEdit.localisation || {},
    piecesSurface: itemToEdit.piecesSurface || {},
    chauffage: itemToEdit.chauffage || {},
    dateEntree: itemToEdit.dateEntree || {},
  });
  //pour mettre à jour formData directement à chaque fois
  useEffect(() => {
    setFormData({
      localisation: itemToEdit.localisation || {},
      piecesSurface: itemToEdit.piecesSurface || {},
      chauffage: itemToEdit.chauffage || {},
      dateEntree: itemToEdit.dateEntree || {},
    });
  }, [itemToEdit]);

  //fonction qui permet la récupération des données
  const onNext = (data) => {
    const newFormData = { ...formData };
    if (currentStep === 1) newFormData.localisation = data;
    if (currentStep === 2) newFormData.piecesSurface = data;
    if (currentStep === 3) newFormData.chauffage = data;
    if (currentStep === 4) newFormData.dateEntree = data;
    setFormData(newFormData);
    setCurrentStep(currentStep + 1);
  };

  const navigate = useNavigate();

  //envoi au back-end des infos globales du logement
  const finalValidate = (data) => {
    //récupération des éléments du formulaire en ajoutant les éléments de la dernière étape
    const dataLogement = {
      ...formData,
      dateEntree: data.dateEntree,
      nomLogement: data.nomLogement,
      images: data.images,
    };
    //concentration de l'objet avant envoi via formData
    const logement = new FormData();
    logement.append("data", JSON.stringify(dataLogement));
    data.images.forEach((image) => {
      logement.append("imagesLogement", image); // Ajout des images
    });

    axios
      .put(`${process.env.REACT_APP_DOMAIN}logement/update/:id`, logement, {
        withCredentials: true,
      })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logement modifié avec succès",
          showConfirmButton: false,
          timer: 2500,
        }).then(() => {
          // La connexion a réussi, je redirige maintenant l'utilisateur vers le dashbord ou l'origine par la suite.
          navigate("/logement");
        });
        console.log("Success: ", res);
      })
      .catch((error) => console.log("Error: ", error));
  };

  return (
    <div className="content">
      <ul className="step-indicator">
        <li className={currentStep === 1 ? "active" : ""}>Localisation</li>
        <li className={currentStep === 2 ? "active" : ""}>Pièces et Surface</li>
        <li className={currentStep === 3 ? "active" : ""}>Chauffage</li>
        <li className={currentStep === 4 ? "active" : ""}>Date d'entrée</li>
      </ul>

      {/* boutons suivant en récupérant les données à chaque étape */}
      {currentStep === 1 && (
        <LocalisationStep onNext={onNext} data={formData.localisation} />
      )}
      {currentStep === 2 && (
        <PiecesSurfaceStep onNext={onNext} data={formData.piecesSurface} />
      )}
      {currentStep === 3 && (
        <ChauffageStep onNext={onNext} data={formData.chauffage} />
      )}
      {currentStep === 4 && (
        <DateEntreeStep onValidate={finalValidate} data={formData.dateEntree} />
      )}

      {/* Bouton 'précendent' à partir de la seconde étape */}
      {currentStep > 1 && (
        <button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
          Précédent
        </button>
      )}
    </div>
  );
}
