import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../Partials/Loadingcontext";
import Carousel from "../../Partials/outils/carousel";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubMenuHouse from "../../Partials/Submenu/LinksMenuHouse";
import { ItemToEditProvider,useItemToEdit  } from "../../Partials/EditContext/EditContext";


export default function Logement() {
  const [logements, setLogement] = useState(null);
  const [errorHouse, setErrorHouse] = useState([]);
//pour basculer le logement à la mise à jour
const { itemToEdit, setItemToEdit } = useItemToEdit();
  const navigate = useNavigate();
 

  
  useEffect(() => {
    //récupération du logement
    axios
      .get(`${process.env.REACT_APP_DOMAIN}logement`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        console.log("réponse niveau axio", data);
        setLogement(data);
        setItemToEdit(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  
   //pour le cadastre
//   useEffect(() => {

//     if (logements){
//   axios.get()
// }

//   }, []);
 


  const addHouse = () => {
    navigate("/logement/ajout");
  };

  return (
    <main className="content">
      <button onClick={addHouse}>Ajouter un logement</button>
      {logements ? (
        <article className="encadrement">
          <section className="flex-row gap-menu">
            <h3>
              {logements.logementId} - {logements.nomLogement}
            </h3>
            <div>
            <ItemToEditProvider>
              <SubMenuHouse selectedLogement={logements}  />
              </ItemToEditProvider>
            </div>
          </section>
          <section className="flex-row" key={logements.logementId}>
            {logements.images && logements.images.length > 0 ? (
              // Je décortique le tableau des images pour récupérer que les liens
              <div>
                <Carousel
                  images={logements.images.map(
                    (image) => `${process.env.REACT_APP_DOMAIN}${image.path}`
                  )}
                />
              </div>
            ) : null}
            <div>
              <h3>
                {logements.logementId} - {logements.nomLogement}
              </h3>
              <h4>
                {logements.ville} ({logements.cp})
              </h4>
              </div>
              <ul>
                {logements.surface_habitable ? (
                <li>superficie :{logements.surface_habitable}m²</li>
              ):(null)
              }
                {logements.nombre_pieces ? (
                <li>Nombre de pèces :{logements.nombre_pieces}</li>
              ):(null)
              }
                {logements.nombre_etages ? (
                <li>Nombre d'étages :{logements.nombre_etages}</li>
              ):(null)
              }
                {logements.type_chauffage ? (
                <li>Chauffage principal :{logements.type_chauffage}</li>
              ):(null)
              }
              </ul>
          </section>
        </article>
      ) : (
        <section>
          <h2>Aucun logement déclaré.</h2>
        </section>
      )}
    </main>
  );
}
