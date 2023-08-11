import React, { useState, useEffect } from "react";
import "./FormAjoutLogement.css";
import axios from "axios";
import { useLoading } from "../../Partials/Loadingcontext";


function LocalisationStep({ onNext }) {
  const { setLoading } = useLoading();
  const [typeLogement, setTypeLogement] = useState("");
  const [adresse, setAdresse] = useState("");
  const [cp, setCp] = useState("");
  const [ville, setVille] = useState("");
  const [rue, setRue] = useState("");
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
      .post("http://localhost:3002/logement/adresse", { address: address })
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
        onChange={handleAddressChange}
      />
      {suggestionsAdresses.length > 0 ? (
        <div className="suggestions-results">
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
      <br />
      <label htmlFor="cp">Rue</label>
      <input
        type="text"
        id="rue"
        name="rue"
        placeholder="rue de la liberté"
        value={rue}
        disabled
      />
      <br />
      <br />
      <label htmlFor="cp">Code Postal</label>
      <input
        type="text"
        id="cp"
        name="cp"
        placeholder="60000"
        value={cp}
        disabled
      />
      <label htmlFor="ville">Ville</label>
      <input
        type="text"
        id="ville"
        name="ville"
        value={ville}
        placeholder="Franconville"
        disabled
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

function PiecesSurfaceStep({ onNext }) {
  const [niveaux, setNiveaux] = useState(1);
  const [pieces, setPieces] = useState(1);
  const [surface, setSurface] = useState(0);

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

function ChauffageStep({ onNext }) {
  const [chauffage, setChauffage] = useState("");
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

function DateEntreeStep({ onValidate }) {
  const [dateEntree, setDateEntree] = useState("");
  const [nomLogement, setNomLogement] = useState("Logement principal");

  const handleValidate = (e) => {
    e.preventDefault();
    onValidate({ dateEntree, nomLogement });
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
      <button type="submit" onClick={handleValidate}>
        Valider
      </button>
    </form>
  );
}

export default function FormulaireLogement() {
  const [currentStep, setCurrentStep] = useState(1);
  const [typeLogement, setTypeLogement] = useState("");
  const [nomLogement, setNomLogement] = useState("");
  const [adresse, setAdresse] = useState("");
  const [rue, setRue] = useState("");
  const [cp, setCp] = useState("");
  const [ville, setVille] = useState("");
  const [niveaux, setNiveaux] = useState(0);
  const [pieces, setPieces] = useState(0);
  const [surface, setSurface] = useState(0);
  const [chauffage, setChauffage] = useState("");
  const [dateEntree, setDateEntree] = useState();

  //récupération des données de l'étape adresse
  const handleNext = (suggestion) => {
    setTypeLogement(suggestion.typeLogement);
    setAdresse(suggestion.label);
    setVille(suggestion.ville);
    setCp(suggestion.cp);
    setRue(suggestion.adresse);
    setCurrentStep(currentStep + 1);
  };
  //récupération des données de l'étape info logement
  const handleStepTwoNext = (data) => {
    setNiveaux(data.niveaux);
    setPieces(data.pieces);
    setSurface(data.surface);
    setCurrentStep(currentStep + 1);
  };
  //récupération des données de l'étape du type de logement
  const handleStepThreeNext = (data) => {
    setChauffage(data.chauffage);
    setCurrentStep(currentStep + 1);
  };
  const handleStepFourNext = (data) => {
    console.log(data);
    setDateEntree(data.dateEntree);
    setNomLogement(data.nomLogement);
    //faute de récupérer les donnéées date entrée et nom logement correctement, je renvoie l'ensemble avec data
    handleValidate(data);
  };

  //envoi au back-end des infos globales du logement
  const handleValidate = (data) => {
    const dataLogement = {
      type: typeLogement,
      //récupération de l'info date et nom avec data via handleValidate
      nomLogement: data.nomLogement,
      labelAdresse: adresse,
      rue: rue,
      cp: cp,
      ville: ville,
      nombre_pieces: pieces,
      nombre_etages: niveaux,
      surface_habitable: surface,
      type_chauffage: chauffage,
      dateEntree: data.dateEntree,
    };
    console.log(dataLogement);
    axios
      .post("http://localhost:3002/logement/ajout", { dataLogement })
      .then((response) => console.log("Success: ", response))
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

      {currentStep === 1 && <LocalisationStep onNext={handleNext} />}
      {currentStep === 2 && <PiecesSurfaceStep onNext={handleStepTwoNext} />}
      {currentStep === 3 && <ChauffageStep onNext={handleStepThreeNext} />}
      {currentStep === 4 && <DateEntreeStep onValidate={handleStepFourNext} />}
    </div>
  );
}
