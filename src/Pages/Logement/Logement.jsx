import {Link,useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLoading } from "../../Partials/Loadingcontext";

export default function Logement() {
  const [logements, setLogement] = useState([]);
  const [errorHouse, setErrorHouse] = useState([]);
 
const navigate = useNavigate();

  useEffect(() => {
    
    axios
      .get(`${process.env.REACT_APP_DOMAIN}logement`)
      .then(res => res.data)
      .then(data => setLogement(data))
      .catch((error) => {
        console.error(error);
      });
  },[]) 

  const addHouse=()=>{
navigate('/logement/ajout')
  }

  return (
    <main className="content">
      <button onClick={addHouse}>Ajouter un logement</button>
      {logements.length > 0 ? logements.map((log, index) => (
        <section key={index}>
          <p>{log.logementId}</p>
        </section>
      )):(
        <section>
          <h2>Aucun logement déclaré.</h2>
        </section>
      )}
      <h2>Votre logement</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab facilis laudantium reprehenderit earum natus recusandae repellat! Nulla, quia doloribus dolore dignissimos odit optio nihil consectetur dolorum libero minima possimus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos neque accusamus qui impedit corrupti! Doloribus, rem deserunt, magni quis fugit, iure facilis saepe aspernatur ut molestiae laborum provident nam temporibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quam harum voluptatum labore maxime! Quos vero est velit facere ipsum qui rerum, sed quae nobis voluptas dolores quidem tempore tenetur!</p>
    </main>
  );
}
