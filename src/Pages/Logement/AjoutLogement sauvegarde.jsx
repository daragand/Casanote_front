import React, { useState,useEffect } from 'react';
import './FormAjoutLogement.css'
import axios from 'axios';



// Composant pour la première étape du formulaire
function LocalisationStep({ onNext }) {
  const [adresse, setAdresse] = useState('');
  const [cp, setCp] = useState('');
  const [ville, setVille] = useState('');
  const [suggestionsAdresses, setSuggestionsAdresses] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false); 



  const handleAddressChange = (e) => {
    setAdresse(e.target.value); 
  };
  

//le fetch est fait avec une temporalité. a voir si je conserve cette temporalité
useEffect(() => {
  const timerId = setTimeout(() => {
    searchAdress(adresse);
  },100);
  return () => {
    clearTimeout(timerId);
  };
}, [adresse]);
useEffect(() => {
  setShowSuggestions(true);// Pour imposer suggestions adresses dans Datalist à chaque changement
}, [suggestionsAdresses]);

const searchAdress = (address) => {
  if (address.length > 3) {
    setIsTyping(true);
    axios.post('http://195.20.227.120/casanote:3002/logement/adresse', { address: address })
      .then((response) => {
        const data = response.data;
        if (data.features && data.features.length > 0) {
          const suggAdresses = data.features.map((feature) => {
            const suggestion = {
              label:feature.properties.label,
              adresse:feature.properties.name, 
              cp:feature.properties.postcode,
              ville:feature.properties.city,
            };
            // console.log('label dans sugg',suggestion.label)
            return { suggestion };
          });
          setSuggestionsAdresses(suggAdresses)
          console.log('sugg d\'adresse',suggestionsAdresses); //controle si des résultats sont fournis de nodeJS(apigouv)
        } else {
          setSuggestionsAdresses([]); // Aucune suggestion si aucune réponse valide
        }
        setIsTyping(false);
      })
      .catch((error) => {
        console.error(error);
        setIsTyping(false);
      });
  } else {
    setSuggestionsAdresses([]); // Réinitialiser la liste des suggestions si le champ de recherche est vide ou court
  }
};



  const handleNext = (e) => {
    e.preventDefault();
    onNext();
  };



  return (
    <form>
      <label htmlFor="adresse">Adresse</label>
      <input
        type="text"
        id="adresse"
        name="adresse"
        placeholder="N° et nom de la rue"
        value={adresse}
        onChange={handleAddressChange}
        list="suggestions"
      />
          {(isTyping || suggestionsAdresses.length > 0) && ( // Show suggestions when typing or when results are available
        <datalist id="suggestions">
          {suggestionsAdresses.map((adresse, index) => (
            <option key={index} value={adresse.suggestion.label} />
          ))}
        </datalist>
)}
      <br /><br />
      <label htmlFor="cp">Code Postal</label>
      <input
        type="text"
        id="cp"
        name="cp"
        placeholder="75001"
        value={cp}
        onChange={(e) => setCp(e.target.value)}
      disabled/>
      <label htmlFor="ville">Ville</label>
      <input
        type="text"
        id="ville"
        name="ville"
        placeholder="Paris"
      />
     
 
      <br /><br />
      <button type="submit" onClick={handleNext}>Suivant</button>
    </form>
  );
}

// Composant pour la deuxième étape du formulaire
function PiecesSurfaceStep({ onNext }) {
  const [niveaux, setNiveaux] = useState(0);
  const [pieces, setPieces] = useState(0);
  const [surface, setSurface] = useState(0);

  const handleNext = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form>
      <label htmlFor="niveaux">Nombre de niveaux :</label>
      <input
        type="number"
        id="niveaux"
        name="niveaux"
        value={niveaux}
        onChange={(e) => setNiveaux(parseInt(e.target.value))}
      />
      <br /><br />
      <label htmlFor="pieces">Nombre de pièces :</label>
      <input
        type="number"
        id="pieces"
        name="pieces"
        value={pieces}
        onChange={(e) => setPieces(parseInt(e.target.value))}
      />
      <br /><br />
      <label htmlFor="surface">Surface habitable en m² :</label>
      <input
        type="number"
        id="surface"
        name="surface"
        value={surface}
        onChange={(e) => setSurface(parseInt(e.target.value))}
      />
      <br /><br />
      <button type="button" onClick={handleNext}>Suivant</button>
    </form>
  );
}

// Composant pour la troisième étape du formulaire
function ChauffageStep({ onNext }) {
  const [chauffage, setChauffage] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    onNext();
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
        checked={chauffage === 'gaz'}
        onChange={() => setChauffage('gaz')}
      />
      <label htmlFor="gaz">Gaz</label>
      <br />
      <input
        type="radio"
        id="fioul"
        name="chauffage"
        value="fioul"
        checked={chauffage === 'fioul'}
        onChange={() => setChauffage('fioul')}
      />
      <label htmlFor="fioul">Fioul</label>
      <br />
      <input
        type="radio"
        id="pompe_a_chaleur"
        name="chauffage"
        value="pompe_a_chaleur"
        checked={chauffage === 'pompe_a_chaleur'}
        onChange={() => setChauffage('pompe_a_chaleur')}
      />
      <label htmlFor="pompe_a_chaleur">Pompe à chaleur</label>
      <br />
      <input
        type="radio"
        id="climatisation"
        name="chauffage"
        value="climatisation"
        checked={chauffage === 'climatisation'}
        onChange={() => setChauffage('climatisation')}
      />
      <label htmlFor="climatisation">Climatisation</label>
      <br /><br />
      <button type="button" onClick={handleNext}>Suivant</button>
    </form>
  );
}

// Composant pour la dernière étape du formulaire
function DateEntreeStep({ onValidate }) {
  const [dateEntree, setDateEntree] = useState('');

  const handleValidate = (e) => {
    e.preventDefault();
    onValidate();
  };

  return (
    <form>
      <label htmlFor="date_entree">Date d'entrée dans le logement :</label>
      <input
        type="date"
        id="date_entree"
        name="date_entree"
        value={dateEntree}
        onChange={(e) => setDateEntree(e.target.value)}
      />
      <br /><br />
      <button type="submit" onClick={handleValidate}>Valider</button>
    </form>
  );
}

// Composant principal du formulaire
function SAUVEGARDEFormulaireLogement() {
  const [currentStep, setCurrentStep] = useState(1);
  const [typeLogement, setTypeLogement] = useState('');
  const [adresse, setAdresse] = useState('');
  const [cp, setCp] = useState('');
  const [ville, setVille] = useState('');
  const [niveaux, setNiveaux] = useState(0);
  const [pieces, setPieces] = useState(0);
  const [surface, setSurface] = useState(0);
  const [chauffage, setChauffage] = useState('');
  const [dateEntree, setDateEntree] = useState('');

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleValidate = () => {
    // Envoyer les données à un serveur ou effectuer d'autres traitements
    console.log('Données du formulaire :');
    console.log('Type de logement :', typeLogement);
    console.log('Adresse :', adresse);
    console.log('Code Postal :', cp);
    console.log('Ville :', ville);
    console.log('Nombre de niveaux :', niveaux);
    console.log('Nombre de pièces :', pieces);
    console.log('Surface habitable en m² :', surface);
    console.log('Type de chauffage principal :', chauffage);
    console.log('Date d\'entrée dans le logement :', dateEntree);
  };

  return (
    <div className='content'>
      <ul className="step-indicator">
        <li className={currentStep === 1 ? 'active' : ''}>Localisation</li>
        <li className={currentStep === 2 ? 'active' : ''}>Pièces et Surface</li>
        <li className={currentStep === 3 ? 'active' : ''}>Chauffage</li>
        <li className={currentStep === 4 ? 'active' : ''}>Date d'entrée</li>
      </ul>

      {currentStep === 1 && (
        <LocalisationStep
          onNext={() => handleNext()}
          setAdresse={setAdresse}
          setCp={setCp}
          setVille={setVille}
        />
      )}
      {currentStep === 2 && (
        <PiecesSurfaceStep
          onNext={() => handleNext()}
          setNiveaux={setNiveaux}
          setPieces={setPieces}
          setSurface={setSurface}
        />
      )}
      {currentStep === 3 && (
        <ChauffageStep
          onNext={() => handleNext()}
          setChauffage={setChauffage}
        />
      )}
      {currentStep === 4 && (
        <DateEntreeStep
          onValidate={() => handleValidate()}
          setDateEntree={setDateEntree}
        />
      )}
    </div>
  );
}

export default FormulaireLogement;
