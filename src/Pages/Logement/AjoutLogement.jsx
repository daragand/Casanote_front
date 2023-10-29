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
      <br />
      <div className="form-floating mb-2">
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
        <label for="adresse"> adresse complète</label>
      </div>
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
      <div class="form-floating mb-2">
      <input type="text" name="complement" class="form-control" id="complement"></input>
      <label for="complement">Complément d'adresse</label>
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
      <div>
      <button type="button">
        Précédent
      </button>
      <button type="button" onClick={handleNext}>
        Suivant
      </button>
      </div>
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
{/* début checkbox bois */}
<div class="checkbox-wrapper-16">
  <label class="checkbox-wrapper">
    <input class="checkbox-input" type="checkbox" name="chauffage"
            value="bois"
            checked={chauffage === "bois"} onChange={(e) => setChauffage(e.target.value)} />
    <span class="checkbox-tile">
      <span class="checkbox-icon">
     <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path fill="currentColor" d="M353.86 48.45c-10.626-.16-20.45 3.456-29.14 13.253l-.193.217l-50.586 50.098l.628.703c3.395 3.7 3.106 9.463-.642 12.804c-3.748 3.342-9.505 2.97-12.793-.825l-5.985-6.712a36.232 36.232 0 0 1-2.544 3.178c-5.116 5.68-11.746 9.448-18.688 11.023l5.438 20.302c2.54 8.98-8.582 15.417-15.102 8.738l-41.2 40.803a73.33 73.33 0 0 1 4.26-.135c40.63 0 73.616 33.616 73.616 74.672c0 .803-.036 1.598-.06 2.395l141.94-153.74c8.252-10.316 9.687-20.888 6.985-31.832C407.08 82.4 399.6 71.29 389.653 62.967a67.967 67.967 0 0 0-9.835-6.854L258.56 182.725c-3.418 3.685-9.193 3.856-12.824.38c-3.63-3.478-3.71-9.255-.175-12.83l115.932-121.05a45.56 45.56 0 0 0-5.494-.694a48.013 48.013 0 0 0-2.137-.08zM232.31 85.597c-4.224-.048-8.876 1.842-12.583 5.96c-6.327 7.024-5.918 16.11-.913 20.62c5.006 4.508 14.088 3.968 20.415-3.057c6.325-7.024 5.917-16.112.91-20.62c-1.877-1.69-4.328-2.672-6.992-2.867c-.277-.02-.556-.032-.837-.035zm-27.95 63.94c-7.19-.12-13.63 2.222-19.577 8.925l-.19.217l-99.734 98.77c10.89.53 20.967 4.222 29.386 10.167a74.889 74.889 0 0 1 11.785-32.332l.44-.67l6.39-8.21a74.532 74.532 0 0 1 6.11-6.05l70.907-70.224a31.108 31.108 0 0 0-4.07-.534c-.486-.03-.968-.05-1.448-.057zm193.3 14.415a45.862 45.862 0 0 0-6.588.52L245.744 321.88a74.987 74.987 0 0 1-9.976 10.806l-5.715 6.19a80.074 80.074 0 0 1 27.34 11.628c-.004-.254-.02-.505-.02-.76c0-12.38 4.545-23.756 12.03-32.496l-.087-.086l1.358-1.344a49.89 49.89 0 0 1 3.16-3.13L381.01 206.545c8.52-9.363 20.055-13.314 30.816-12.662c10.908.66 21.093 5.423 29.33 12.316c8.238 6.892 14.684 16.035 17.278 26.538a37.756 37.756 0 0 1 1.078 9.922c4.62-9.422 4.9-19.095 2.242-28.918c-3.484-12.87-12.614-25.674-24.47-34.967v.002c-11.194-8.77-24.658-14.314-37.27-14.79c-.79-.028-1.573-.04-2.354-.034zm11.926 47.852c-5.712-.106-10.696 1.69-15.463 7.064l-.193.216l-82.07 81.28c22.277 2.517 40.072 20.28 43.12 42.585l82.31-89.153c4.454-5.58 5.124-10.833 3.665-16.742c-1.468-5.945-5.675-12.3-11.35-17.05c-5.678-4.75-12.668-7.778-18.867-8.153c-.387-.024-.77-.04-1.152-.047zm-222.274 8.097c-4.898 0-9.644.647-14.167 1.85a45.276 45.276 0 0 1 5.994-.41c24.715 0 45.067 19.99 45.067 44.566c0 24.576-20.355 44.567-45.068 44.567c-24.718 0-45.07-19.992-45.07-44.567c0-2.83.282-5.593.797-8.277a57.873 57.873 0 0 0-3.166 18.94c0 31.482 24.873 56.668 55.613 56.668s55.61-25.185 55.61-56.668c0-31.482-24.87-56.668-55.61-56.668zm-8.173 19.44c-15.12 0-27.07 11.857-27.07 26.566c0 14.71 11.945 26.567 27.07 26.567c15.117 0 27.067-11.858 27.067-26.567c0-14.71-11.944-26.566-27.068-26.566zm-3.388 7.357c8.742 0 16.023 7.276 16.023 16.02s-7.285 16.02-16.023 16.02c-8.742 0-16.025-7.275-16.025-16.02c0-8.743 7.287-16.02 16.025-16.02zm-93.61 28.68c-21.25 0-38.427 17.364-38.427 39.2c0 21.835 17.177 39.2 38.426 39.2c21.25 0 38.426-17.364 38.426-39.2c0-3.01-.338-5.933-.957-8.74a74.367 74.367 0 0 1-3.08-8.838c-6.297-12.877-19.314-21.623-34.39-21.623zm-.36 11.016c15.59 0 27.085 14.1 27.085 29.823c0 15.724-11.498 29.82-27.086 29.82c-15.59 0-27.087-14.098-27.087-29.82c0-15.727 11.5-29.824 27.088-29.824zm372.58.325c-6.907-.118-13.068 2.118-18.79 8.567l-.193.22l-96.345 95.415c27.285 1.628 49.25 23.576 51.547 50.926l96.64-104.672c5.384-6.735 6.24-13.283 4.48-20.42a29.402 29.402 0 0 0-.868-2.844l-63.383 66.342c-3.41 3.703-9.196 3.888-12.837.41c-3.64-3.48-3.72-9.267-.175-12.844l65.103-68.144a9.1 9.1 0 0 1 1.122-1.018a46.184 46.184 0 0 0-2.447-2.203c-6.715-5.62-14.988-9.227-22.463-9.68c-.467-.028-.93-.046-1.39-.054zm-372.9 14.73c-7.59 0-13.74 7.046-13.74 15.738c0 8.69 6.15 15.736 13.74 15.736s13.743-7.045 13.743-15.736c0-8.69-6.152-15.737-13.742-15.737zm224.952 16.6c-17.17 0-31.04 14.004-31.04 31.694c0 17.69 13.87 31.695 31.04 31.695s31.04-14.006 31.04-31.696s-13.87-31.693-31.04-31.693zm-2.285 11.155c11.398 0 19.28 10.28 19.28 21.092c0 10.814-7.884 21.09-19.28 21.09c-11.4 0-19.282-10.277-19.282-21.09c0-10.814 7.883-21.092 19.28-21.092zm-163.378 5.13l-14.027 15.192a57.675 57.675 0 0 1-7.235 7.838l-3.986 4.317c9.624 5.793 17.842 13.746 24.006 23.185c6.715-14.72 17.602-27.106 31.113-35.588c-11.134-2.634-21.307-7.826-29.87-14.946zm72.31 20.704c-34.83 0-63.015 28.553-63.015 64.192c0 35.64 28.186 64.194 63.016 64.194s63.017-28.554 63.017-64.194c0-35.638-28.188-64.193-63.017-64.193zM68.68 370.114C42.442 374.65 22.5 397.775 22.5 425.96c0 14.03 4.95 26.802 13.146 36.66a48.17 48.17 0 0 1-8.064-26.725v-.004c-.005-26.31 21.188-47.994 47.29-47.994c26.105 0 47.298 21.684 47.292 47.996c.005 20.913-13.386 38.89-31.986 45.393c22.622-5.065 40.05-24.075 43.076-47.908a83.297 83.297 0 0 1-1.207-14.145c0-2.07.077-4.125.226-6.16c-4.7-20.763-20.513-37.028-40.71-42.11c-3.065.528-6.21.817-9.422.817c-4.64 0-9.146-.586-13.462-1.665zm140.48.643c27.187 0 49.2 22.702 49.2 50.203c0 27.503-22.016 50.204-49.2 50.204c-27.187 0-49.2-22.702-49.2-50.203c0-27.5 22.017-50.202 49.2-50.202zm0 17.998c-17.21 0-31.2 14.195-31.2 32.205c0 18.012 13.983 32.206 31.2 32.206c17.212 0 31.2-14.195 31.2-32.205c0-18.01-13.982-32.204-31.2-32.204zm81.856 8.148a82.57 82.57 0 0 1 2.642 13.912a55.86 55.86 0 0 1 12.852-11.38a1.475 1.475 0 0 1-.094.003c-5.38 0-10.554-.9-15.4-2.536zm-216.14 8.992c-16.2 0-29.295 13.238-29.29 29.995v.005c-.005 16.756 13.09 29.994 29.29 29.994c16.197 0 29.295-13.24 29.29-29.995v-.004c.005-16.756-13.093-29.994-29.29-29.994zm133.706.256c8.967 0 14.96 7.945 14.96 15.953c0 8.01-5.993 15.952-14.96 15.952c-8.966 0-14.96-7.943-14.96-15.952c0-8.008 5.994-15.953 14.96-15.953zm127.203 2.664c-20.47 0-37.013 16.723-37.013 37.766c0 21.042 16.544 37.766 37.013 37.766c20.47 0 37.012-16.723 37.012-37.766c0-21.042-16.543-37.766-37.012-37.766zM71.833 422.39c8.965 0 14.958 7.943 14.958 15.952c0 8.01-5.992 15.953-14.958 15.953c-8.966 0-14.96-7.944-14.96-15.953c0-8.01 5.994-15.953 14.96-15.953zm267.923 1.423c14.727 0 26.683 12.307 26.683 27.037c0 14.73-11.958 27.037-26.684 27.037c-14.728 0-26.682-12.308-26.682-27.037c0-14.73 11.955-27.038 26.682-27.038zm0 18c-4.802 0-8.682 3.845-8.682 9.037s3.877 9.037 8.682 9.037c4.8 0 8.683-3.846 8.683-9.037c0-5.193-3.88-9.038-8.684-9.038z"/></svg>
      </span>
      <span class="checkbox-label">Bois</span>
    </span>
  </label>
</div>

        {/* fin de checkbox bois */}
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
        {/* debut checkbox solaire */}
        
      <div class="checkbox-wrapper-16">
  <label class="checkbox-wrapper">
    <input class="checkbox-input"
    id="solaire" type="checkbox" name="chauffage"
            value="solaire"
            checked={chauffage === "solaire"} onChange={(e) => setChauffage(e.target.value)} />
    <span class="checkbox-tile">
      <span class="checkbox-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4V2h3v2H3ZM2 22h9v-4H2.8L2 22ZM6.125 9.325L4.7 7.925L6.825 5.8L8.25 7.2L6.125 9.325ZM3.2 16H11v-4H4l-.8 4ZM12 7Q9.925 7 8.462 5.537T7 2h10q0 2.075-1.463 3.538T12 7Zm-1 4V8h2v3h-2Zm2 11h9l-.8-4H13v4Zm0-6h7.8l-.8-4h-7v4Zm4.875-6.675l-2.1-2.125l1.4-1.4L19.3 7.9l-1.425 1.425ZM18 4V2h3v2h-3Z"/></svg>
      </span>
      <span class="checkbox-label">Solaire</span>
    </span>
  </label>
</div>
        {/* fin de checkbox solaire */}
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
      <div className="row">
      <div className="form-floating col-md-6 mb-3">
      <input
      className="form-control"
        type="text"
        id="nomLogement"
        name="nomLogement"
        value={nomLogement}
        onChange={(e) => setNomLogement(e.target.value)}
        required
      />
      <label for="nomLogement">Nom du logement :</label>
      </div>
      <div className="form-floating col-md-6  ">
      <input
      className="form-control"
        type="date"
        id="date_entree"
        name="date_entree"
        value={dateEntree}
        onChange={(e) => setDateEntree(e.target.value)}
      />
      <label htmlFor="date_entree">Date d'entrée dans le logement :</label>
      </div>
      </div>
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
        <a type="button" className={`btn  btn-circle ${currentStep === 1 ? "active" : ""}`}>1</a>
        <a type="button" className={`btn  btn-circle ${currentStep === 2 ? "active" : ""}`}>2</a>
        <a type="button" className={`btn  btn-circle ${currentStep === 3 ? "active" : ""}`}>3</a>
        <a type="button" className={`btn  btn-circle ${currentStep === 4 ? "active" : ""}`}>4</a>
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
      {currentStep > 1 && currentStep <= 4 && (
        
        <button type="button" onClick={() => setCurrentStep(currentStep - 1)}
        
        >
          
          Précédent
        </button>
      
      )}

    </div>
    
  );
}
