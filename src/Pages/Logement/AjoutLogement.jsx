import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FormAjoutLogement.css";
import axios from "axios";
import { useLoading } from "../../Partials/Loadingcontext";
import Swal from "sweetalert2";
import ImageUploader from "../../Partials/Imagesuploader/ImageUploader";
import ImagePreview from "../../Partials/Imagesuploader/ImageView";

function LocalisationStep({ onNext, data }) {
  const { setLoading } = useLoading();
  const [typeLogement, setTypeLogement] = useState(data.typeLogement || "");
  const [adresse, setAdresse] = useState(data.adresse || "");
  const [cp, setCp] = useState(data.cp || "");
  const [ville, setVille] = useState(data.ville || "");
  const [rue, setRue] = useState(data.rue || "");
  const [suggestionsAdresses, setSuggestionsAdresses] = useState([]);
  const [searchActivated, setSearchActivated] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleAddressChange = (e) => {
    const address = e.target.value;
    setAdresse(address);
    if (address.length > 3) {
      searchAdress(address);
    } else {
      setSuggestionsAdresses([]);
    }
  };

  const handleSuggestionMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const searchAdress = (address) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_DOMAIN}logement/adresse`,
        { address: address },
        { withCredentials: true }
      )
      .then((response) => {
        const data = response.data;
        if (data.features && data.features.length > 0) {
          setSearchActivated(false);
          const suggAdresses = data.features.map((feature) => {
            const suggestion = {
              label: feature.properties.label,
              adresse: feature.properties.name,
              cp: feature.properties.postcode,
              ville: feature.properties.city,
              context: feature.properties.context,
            };
            return { suggestion };
          });
          setSuggestionsAdresses(suggAdresses);
        } else {
          setSuggestionsAdresses([]);
          setSearchActivated(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setAdresse(suggestion.label);
    setVille(suggestion.ville);
    setCp(suggestion.cp);
    setRue(suggestion.adresse);
    setSuggestionsAdresses([]);
  };

  return (
    <form>
      <label htmlFor="adresse">Type de logement</label>
      <br />
      <br />
      <section className="typeLogement">
        
        {/* début checkbox apartment */}
        <div class="checkbox-wrapper-16">
  <label class="checkbox-wrapper">
    <input class="checkbox-input" type="checkbox" id="Appartement"
            name="Appartement"
            value="Appartement"
            checked={typeLogement === "Appartement"}
            onChange={(e) => setTypeLogement(e.target.value)}/>
    <span class="checkbox-tile">
      <span class="checkbox-icon">
        

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="IconChangeColor" height="200" width="200"><path d="M17,11V3H7v4H3v14h8v-4h2v4h8V11H17z M7,19H5v-2h2V19z M7,15H5v-2h2V15z M7,11H5V9h2V11z M11,15H9v-2h2V15z M11,11H9V9h2 V11z M11,7H9V5h2V7z M15,15h-2v-2h2V15z M15,11h-2V9h2V11z M15,7h-2V5h2V7z M19,19h-2v-2h2V19z M19,15h-2v-2h2V15z" id="mainIconPathAttribute" fill="#737373" stroke="#804040"></path></svg>


      </span>
      <span class="checkbox-label">Appartement</span>
    </span>
  </label>
</div>

        {/* fin checkbox apartment */}
        {/* début checkbox house */}
        <div class="checkbox-wrapper-16">
  <label class="checkbox-wrapper">
    <input class="checkbox-input" type="checkbox" name="Maison"
            value="Maison"
            checked={typeLogement === "Maison"} onChange={(e) => setTypeLogement(e.target.value)} />
    <span class="checkbox-tile">
      <span class="checkbox-icon">
        <svg width="450" height="450" viewBox="0 0 200 200" class="house">
  <g>
    <circle fill="#F4F4F9" cx="150" cy="15" r="30" />
    <circle fill="#B8DBD9" cx="140" cy="60" r="20" />
    <circle fill="#a1a1a1" cx="120" cy="80" r="10" />
    <rect fill="#8C5E58" width="20" height="50" x="110" y="90" />
    <polygon fill="#6B6570" points="100,100 150,150 50,150" />
    <rect fill="#2CEAA3" width="200" height="10" x="0" y="190" />
    <rect fill="#8C5E58" width="80" height="50" x="60" y="150" />
    <rect fill="#0D1F22" width="20" height="30" x="100" y="170" />
  </g>
</svg>
      </span>
      <span class="checkbox-label">Maison</span>
    </span>
  </label>
</div>

        {/* fin de checkbox house */}
        
      </section>
      <label htmlFor="adresse">Adresse</label>
      <br />
      <input
      class="form-control"
        type="text"
        id="adresse"
        name="adresse"
        placeholder="N° et nom de la rue"
        value={adresse}
        onChange={handleAddressChange}
        autoComplete="off"
      />
      {suggestionsAdresses.length > 0 ? (
        <div className="suggestions-results" autocomplete="off">
          {suggestionsAdresses.map((adresse, index) => (
            <div
              key={index}
              className={`suggestion-item ${
                hoveredIndex === index ? "selected-item" : ""
              }`}
              onClick={() => handleSuggestionClick(adresse.suggestion)}
              onMouseEnter={() => handleSuggestionMouseEnter(index)}
            >
              <div>
                <strong>{adresse.suggestion.label}</strong>
              </div>
              <div>{adresse.suggestion.context}</div>
            </div>
          ))}
        </div>
      ) : (
        searchActivated && (
          <div className="suggestions-results">Aucun résultat</div>
        )
      )}
      <br />
      <div class="col-auto">
      <label htmlFor="complement">Complément d'adresse</label>
      <input type="text" name="complement" class="form-control" id="complement"></input>
      </div>
      <label htmlFor="cp">Rue</label>
      <input
      class="form-control"
        type="text"
        id="rue"
        name="rue"
        placeholder="rue de la liberté"
        value={rue}
        disabled
      />
      <br />
      <div className="row">
        <div className="col-md-3 mb-3">
      <label htmlFor="cp">Code Postal</label>
      <input
      class="form-control"
        type="text"
        id="cp"
        name="cp"
        placeholder="60000"
        value={cp}
        disabled
      />
      </div>
      <div className="col-md-9 mb-3">
      <label htmlFor="ville">Ville</label>
      <input
      class="form-control"
        type="text"
        id="ville"
        name="ville"
        value={ville}
        placeholder="Franconville"
        disabled
      />
      </div>
      </div>
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

export default function FormulaireLogement() {
  const [currentStep, setCurrentStep] = useState(1);

  //création d'un objet pour récupérer les données du logement
  const [formData, setFormData] = useState({
    localisation: {},
    piecesSurface: {},
    chauffage: {},
    dateEntree: {},
  });

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
    console.log(logement);

    axios
      .post(`${process.env.REACT_APP_DOMAIN}logement/ajout`, logement, {
        withCredentials: true,
      })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logement créé avec succès",
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
