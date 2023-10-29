import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../Partials/Loadingcontext";
import Carousel from "../../Partials/outils/carousel";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubMenuHouse from "../../Partials/Submenu/LinksMenuHouse";
import { ItemToEditProvider, useItemToEdit } from "../../Partials/EditContext/EditContext";
import houseIMGdefaut from '../../Assets/visu/default_house.jpg';
export default function Logement() {
  const [logements, setLogements] = useState([]);
  const [errorHouse, setErrorHouse] = useState([]);
  const { itemToEdit, setItemToEdit } = useItemToEdit();
  const navigate = useNavigate();

  useEffect(() => {
    // Récupération de la liste des logements
    axios
      .get(`${process.env.REACT_APP_DOMAIN}logement`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        console.log("réponse niveau axios", data);
        //je passe par cette approche pour simplifier la modification du logement. Si l'usager dispose de plusieurs logements, l'id du logement sert d'index et simplifie la récupération dans updateHouse. Cette approche sera identique pour les pièces et les travaux pour setItemToEdit
      const logementData = data.reduce((acc, logement) => {
        acc[logement.logementId] = logement;
        return acc;
      }, {});
      setLogements(data);
      setItemToEdit(logementData);
    })
      .catch((error) => {
        console.error(error);
      });
  }, []);

 


  const addHouse = () => {
    navigate("/logement/ajout");
  };

  return (
    <main className="content">
      <div className="container-fluid">
      <button onClick={addHouse}>Ajouter un logement</button>
      {logements.length > 0 ? (
        logements.map((logement,index) => (
          <article className="encadrement" key={logement.logementId}>
            <section className="flex-row gap-menu">
              <h3>
                {logement.logementId} - {logement.nomLogement}
              </h3>
              <div>
                <ItemToEditProvider>
                  <SubMenuHouse selectedLogement={logement} index={index} />
                </ItemToEditProvider>
              </div>
            </section>
            <section className="flex-row">
              {logement.images && logement.images.length > 0 ? (
                <div>
                  <Carousel
                    images={logement.images.map(
                      (image) => `${process.env.REACT_APP_DOMAIN}${image.path}`
                    )}
                  />
                </div>
              ) : <img className="img-fluid w-50" src={houseIMGdefaut} alt="illustration d'une maison tenue sur une main" />}
              <div>
                <h3>
                  {logement.logementId} - {logement.nomLogement}
                </h3>
                <h4>
                  {logement.ville} ({logement.cp})
                </h4>
                <ul>
                  {logement.surface_habitable ? (
                    <li>Superficie : {logement.surface_habitable}m²</li>
                  ) : null}
                  {logement.nombre_pieces ? (
                    <li>Nombre de pièces : {logement.nombre_pieces}</li>
                  ) : null}
                  {logement.nombre_etages ? (
                    <li>Nombre d'étages : {logement.nombre_etages}</li>
                  ) : null}
                  {logement.type_chauffage ? (
                    <li>Chauffage principal : {logement.type_chauffage}</li>
                  ) : null}
                </ul>
              </div>
            </section>
          </article>
        ))
      ) : (
        <section>
          <h2>Aucun logement déclaré.</h2>
        </section>
      )}
      </div>
    </main>
  );
}
