import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./FormAjoutLogement.css";
import axios from "axios";
import Swal from "sweetalert2";
import ImageUploader from "../../Partials/Imagesuploader/ImageUploader";
import ImagePreview from "../../Partials/Imagesuploader/ImageView";
import { useItemToEdit } from "../../Partials/EditContext/EditContext";

function LocalisationStep({ onNext, data }) {
  const [typeLogement, setTypeLogement] = useState(data.typeLogement || "");
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
            name="typeLogement"
            value="appartement"
            checked={typeLogement === "appartement"}
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
            name="typeLogement"
            value="maison"
            checked={typeLogement == "maison"}
            onChange={(e) => setTypeLogement(e.target.value)}
          />
          <label htmlFor="Maison">Maison</label>
          <br />
          <br />
        </div>
      </section>

      <label htmlFor="cp">Rue</label>
      <input
        type="text"
        id="rue"
        name="rue"
        placeholder="rue de la liberté"
        value={rue}
        onChange={(e) => setRue(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="cp">Code Postal</label>
      <input
        type="text"
        id="cp"
        name="cp"
        placeholder="60000"
        value={data.cp}
        onChange={(e) => setCp(e.target.value)}
      />
      <label htmlFor="ville">Ville</label>
      <input
        type="text"
        id="ville"
        name="ville"
        value={ville}
        onChange={(e) => setVille(e.target.value)}
        placeholder="Franconville"
      />
      <br />
      <br />
      <button onClick={() => onNext({ typeLogement, ville, cp, adresse: rue })}>
        Suivant
      </button>
    </form>
  );
}

function PiecesSurfaceStep({ onNext, data }) {
  const [niveaux, setNiveaux] = useState(data.nombre_etages || 1);
  const [pieces, setPieces] = useState(data.nombre_pieces || 1);
  const [surface, setSurface] = useState(data.surface_habitable || 0);

  //pour forcer l'initialisation des données
  useEffect(() => {
    if (data) {
      setPieces(data.nombre_pieces);
      setNiveaux(data.nombre_etages);
      setSurface(data.surface_habitable);
    }
  }, [data]);

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
      <button onClick={handleNext}>Suivant</button>
    </form>
  );
}

function ChauffageStep({ onNext, data }) {
  const [chauffage, setChauffage] = useState(data.type_chauffage || "");
  const [errorChauffage, seterrorChauffage] = useState(false);
  useEffect(() => {
    if (data) {
      setChauffage(data.type_chauffage);
    }
  }, [data]);

  //gestion de l'étape suivante avec envoi de l'info chauffage
  const handleNext = (e) => {
    e.preventDefault();

    onNext({ chauffage });
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
      <button onClick={handleNext}>Suivant</button>
    </form>
  );
}

function DateEntreeStep({ onValidate, data }) {
  const [dateEntree, setDateEntree] = useState(data.dateEntree || "");
  const [nomLogement, setNomLogement] = useState(
    data.nomLogement || "Logement principal"
  );
  const [imagesLogement, setImagesLogement] = useState(data.images || []);

  console.log("mes images", data.images);
  // pour la récupération des images du logement
  const handleImagesSelected = (newImages) => {
    setImagesLogement((prev) => [...prev, ...newImages]);
  };

  const handleValidate = (e) => {
    e.preventDefault();
    e.stopPropagation();

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
      <ImageUploader />
      {/* <ImagePreview images={imagesLogement} /> */}

      <button onClick={handleValidate}>Valider</button>
    </form>
  );
}

const UpdateHouse = () => {
  const { id } = useParams();
  const { itemToEdit } = useItemToEdit();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  console.log("item id", itemToEdit[id]);
  const [formData, setFormData] = useState({
    localisation: {},
    piecesSurface: {},
    chauffage: {},
    dateEntree: {},
  });

  // Met à jour formData dès que itemToEdit change
  useEffect(() => {
    if (itemToEdit === null) {
      // Si itemToEdit n'est pas encore prêt, montrez le loader
      setIsLoading(true);
    } else {
      // Une fois que itemToEdit est prêt, arrêtez le loader et mettez à jour formData
      setIsLoading(false);
      setFormData({
        logID: itemToEdit[id].logementId,
        localisation: {
          typeLogement: itemToEdit[id].type,
          rue: itemToEdit[id].rue,
          cp: itemToEdit[id].cp,
          ville: itemToEdit[id].ville,
        },
        piecesSurface: {
          nombre_pieces: itemToEdit[id].nombre_pieces,
          nombre_etages: itemToEdit[id].nombre_etages,
          surface_habitable: itemToEdit[id].surface_habitable,
        },
        chauffage: {
          type_chauffage: itemToEdit[id].type_chauffage,
        },
        dateEntree: {
          dateEntree: itemToEdit[id].dateEntree,
          nomLogement: itemToEdit[id].nomLogement,
          images: itemToEdit[id].images,
        },
      });
    }
  }, [itemToEdit]);

  const onNext = (data) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [currentStep === 1
        ? "localisation"
        : currentStep === 2
        ? "piecesSurface"
        : currentStep === 3
        ? "chauffage"
        : "dateEntree"]: data,
    }));
    setCurrentStep(currentStep + 1);
  };

  const navigate = useNavigate();
  //étape finale pour valider le logement modifié
  const finalValidate = (data) => {
    //récupération des éléments du formulaire en ajoutant les éléments de la dernière étape
    const dataLogement = {
      ...formData,
      dateEntree: data.dateEntree,
      nomLogement: data.nomLogement,
      images: data.images,
    };
    console.log("final validate", dataLogement);
    //concentration de l'objet avant envoi via formData
    const logement = new FormData();
    logement.append("data", JSON.stringify(dataLogement));
    data.images.forEach((image) => {
      logement.append("imagesLogement", image); // Ajout des images
    });
    console.log("final validate le logement", logement);
    axios
      .put(
        `${process.env.REACT_APP_DOMAIN}logement/update/${itemToEdit.logementId}`,
        logement,
        {
          withCredentials: true,
        }
      )
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
      {isLoading ? (
        // Affichez le loader si isLoading est vrai
        <p>Chargement en cours...</p>
      ) : (
        <>
          <ul className="step-indicator">
            <li className={currentStep === 1 ? "active" : ""}>Localisation</li>
            <li className={currentStep === 2 ? "active" : ""}>
              Pièces et Surface
            </li>
            <li className={currentStep === 3 ? "active" : ""}>Chauffage</li>
            <li className={currentStep === 4 ? "active" : ""}>Date d'entrée</li>
          </ul>

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
            <DateEntreeStep
              onValidate={finalValidate}
              data={formData.dateEntree}
            />
          )}

          {currentStep > 1 && (
            <button onClick={() => setCurrentStep(currentStep - 1)}>
              Précédent
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default UpdateHouse;
