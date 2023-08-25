import {Link,useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../Partials/Loadingcontext";

export default function Logement() {
  const [logements, setLogement] = useState(null);
  const [errorHouse, setErrorHouse] = useState([]);
 
const navigate = useNavigate();

  useEffect(() => {
    
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
    {logements ? ( // Vérification si logements contient des données
        
            <section key={logements.logementId}>
              <h3>{logements.logementId} - {logements.nomLogement}</h3>
              <h4>{logements.ville} ({logements.cp})</h4>
            </section>
          
    ) : (
        <section>
          <h2>Aucun logement déclaré.</h2>
        </section>
    )}
  </main>
  );
}
