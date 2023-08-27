import {Link,useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../Partials/Loadingcontext";
import Carousel from "../../Partials/outils/carousel";

export default function Logement() {
  const [logements, setLogement] = useState(null);
  const [errorHouse, setErrorHouse] = useState([]);
 
const navigate = useNavigate();

  useEffect(() => {
    //récupération du logement
    axios
      .get(`${process.env.REACT_APP_DOMAIN}logement`,{ withCredentials: true })
      .then(res => res.data)
      .then(data => {
        console.log('réponse niveau axio',data)
        setLogement(data);
      }).catch((error) => {
        console.error(error);
      });
  },[]) 

  const addHouse=()=>{
  
navigate('/logement/ajout')
  }

  return (
    <main className="content">
      <button onClick={addHouse}>Ajouter un logement</button>
      {logements ? ( 
        
            <section className="flex-row" key={logements.logementId}>
             {logements.images && logements.images.length > 0 ? (
              
              // Je décortique le tableau des images pour récupérer que les liens
              <div><Carousel images={logements.images.map(image => `${process.env.REACT_APP_DOMAIN}${image.path}`)} />
   </div> ) : null}
              <div>
                <h3>{logements.logementId} - {logements.nomLogement}</h3>
                <h4>{logements.ville} ({logements.cp})</h4>
              </div>
            </section>
          
    ) : (
            <section>
              <h2>Aucun logement déclaré.</h2>
            </section>
    )}
  </main>
  );
}
