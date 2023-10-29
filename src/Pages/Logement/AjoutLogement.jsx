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
      <div className="form-floating mb-2 col-sm-9">
      <input
      className="form-control"
        type="number"
        id="niveaux"
        name="niveaux"
        min="1"
        value={niveaux}
        onChange={(e) => setNiveaux(parseInt(e.target.value))}
      />
      <label for="niveaux">Nombre de niveaux :</label>
      </div>
      
      <div className="form-floating mb-2 col-sm-9">
      <input
      className="form-control"
        type="number"
        id="pieces"
        min="1"
        name="pieces"
        value={pieces}
        onChange={(e) => setPieces(parseInt(e.target.value))}
      />
      <label for="pieces">Nombre de pièces :</label>
      </div>
      
      <div className="form-floating mb-2 col-sm-9">
      <input
      className="form-control"
        type="number"
        id="surface"
        name="surface"
        value={surface}
        onChange={(e) => setSurface(parseInt(e.target.value))}
      />
      <label htmlFor="surface">Surface habitable en m² :</label>
      </div>
      
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
      <div className="d-flex justify-content-center gap-3">
{/* début checkbox électricité */}
<div class="checkbox-wrapper-16">
  <label class="checkbox-wrapper">
    <input class="checkbox-input" type="checkbox" name="chauffage"
            value="électricité"
            checked={chauffage === "électricité"} onChange={(e) => setChauffage(e.target.value)} />
    <span class="checkbox-tile">
      <span class="checkbox-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><g fill="currentColor"><path d="M12.187 10H16a.5.5 0 0 1 .325.88l-4.958 4.241l-5.024 4.743c-.39.368-1.007-.053-.807-.55L8.474 12H6a.5.5 0 0 1-.46-.697l3-7A.5.5 0 0 1 9 4h5a.5.5 0 0 1 .46.697L12.187 10Z" opacity=".2"/><path fill-rule="evenodd" d="M15 8.5h-3.813l2.273-5.303A.5.5 0 0 0 13 2.5H8a.5.5 0 0 0-.46.303l-3 7A.5.5 0 0 0 5 10.5h2.474l-2.938 7.314c-.2.497.417.918.807.55l5.024-4.743l4.958-4.241A.5.5 0 0 0 15 8.5Zm-4.571 1h3.217l-3.948 3.378l-3.385 3.195l2.365-5.887a.5.5 0 0 0-.464-.686H5.758l2.572-6h3.912L9.969 8.803a.5.5 0 0 0 .46.697Z" clip-rule="evenodd"/></g></svg>
      </span>
      <span class="checkbox-label">Electricité</span>
    </span>
  </label>
</div>
        {/* fin de checkbox électricité */}

       {/* début checkbox gaz */}
       <div class="checkbox-wrapper-16">
  <label class="checkbox-wrapper">
    <input class="checkbox-input" type="checkbox" name="chauffage"
            value="gaz"
            checked={chauffage === "gaz"} onChange={(e) => setChauffage(e.target.value)} />
    <span class="checkbox-tile">
      <span class="checkbox-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="m9.13 15l-.53-.77a1.85 1.85 0 0 0-.28-2.54a3.51 3.51 0 0 1-1.19-2c-1.56 2.23-.75 3.46 0 4.55l-.55.76A4.4 4.4 0 0 1 3 10.46S2.79 8.3 5.28 6.19c0 0 2.82-2.61 1.84-4.54L7.83 1a6.57 6.57 0 0 1 2.61 6.94a2.57 2.57 0 0 0 .56-.81l.87-.07c.07.12 1.84 2.93.89 5.3A4.72 4.72 0 0 1 9.13 15zm-2-6.95l.87.39a3 3 0 0 0 .92 2.48a2.64 2.64 0 0 1 1 2.8A3.241 3.241 0 0 0 11.8 12a4.87 4.87 0 0 0-.41-3.63a1.85 1.85 0 0 1-1.84.86l-.35-.68a5.31 5.31 0 0 0-.89-5.8C8.17 4.87 6 6.83 5.93 6.94C3.86 8.7 4 10.33 4 10.4a3.47 3.47 0 0 0 1.59 3.14C5 12.14 5 10.46 7.16 8.05h-.03z"/></svg>
      </span>
      <span class="checkbox-label">Gaz</span>
    </span>
  </label>
</div>

        {/* fin de checkbox gaz */}

        {/* début checkbox fioul */}
       <div class="checkbox-wrapper-16">
  <label class="checkbox-wrapper">
    <input class="checkbox-input" type="checkbox" name="chauffage"
            value="fioul"
            checked={chauffage === "fioul"} onChange={(e) => setChauffage(e.target.value)} />
    <span class="checkbox-tile">
      <span class="checkbox-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 2h3c.28 0 .53.11.71.29l2.08 2.09l.8-.79C10 3.2 10.5 3 11 3h6c.5 0 1 .2 1.41.59l1 1C19.8 5 20 5.5 20 6v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8c0-.5.2-1 .59-1.41l.79-.8L5.59 4H3V2m8 3v2h6V5h-6m.41 6l-2-2H8v1.41l2 2v3.18l-2 2V19h1.41l2-2h3.18l2 2H18v-1.41l-2-2v-3.18l2-2V9h-1.41l-2 2h-3.18m.59 2h2v2h-2v-2Z"/></svg>
      </span>
      <span class="checkbox-label">Fioul</span>
    </span>
  </label>
</div>

        {/* fin de checkbox fioul */}
      {/* debut de checkbox pompe à chaleur  */}
      <div class="checkbox-wrapper-16">
  <label class="checkbox-wrapper">
    <input class="checkbox-input"
    id="pompe_a_chaleur" type="checkbox" name="chauffage"
            value="pompe à chaleur"
            checked={chauffage === "pompe à chaleur"} onChange={(e) => setChauffage(e.target.value)} />
    <span class="checkbox-tile">
      <span class="checkbox-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 18.6q1.25 0 2.125-.875T10 15.6v-6q0-.425.288-.712T11 8.6q.425 0 .713.288T12 9.6v6q0 1.25.875 2.125T15 18.6q1.25 0 2.125-.875T18 15.6v-7q0-.425.288-.713T19 7.6h1.175L19 8.75l1.4 1.425L24 6.6L20.4 3L19 4.425L20.175 5.6H19q-1.25 0-2.125.875T16 8.6v7q0 .425-.288.713T15 16.6q-.425 0-.713-.288T14 15.6v-6q0-1.25-.875-2.125T11 6.6q-1.25 0-2.125.875T8 9.6v6q0 .425-.288.713T7 16.6q-.425 0-.713-.288T6 15.6v-9H4v9q0 1.25.875 2.125T7 18.6Zm-4 3q-.825 0-1.413-.588T1 19.6v-8h22v8q0 .825-.588 1.413T21 21.6H3Z"/></svg>
      </span>
      <span class="checkbox-label">Pompe à chaleur</span>
    </span>
  </label>
</div>

       {/* fin de checkbox pompe à chaleur  */}
     {/* debut de checkbox climatisation  */}
     <div class="checkbox-wrapper-16">
  <label class="checkbox-wrapper">
    <input class="checkbox-input"
    id="climatisation" type="checkbox" name="chauffage"
            value="climatisation"
            checked={chauffage === "climatisation"} onChange={(e) => setChauffage(e.target.value)} />
    <span class="checkbox-tile">
      <span class="checkbox-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 16a3 3 0 0 1-3 3m11-3a3 3 0 0 0 3 3m-7-3v4M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M7 13v-3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3"/></g></svg>
      </span>
      <span class="checkbox-label">Climatisation</span>
    </span>
  </label>
</div>
     {/* fin de checkbox climatisation   */}
      <br />
     
      </div>
      <br />
      
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
