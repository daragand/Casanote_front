import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import usericon from "../../Assets/visu/user.png";
import houseicon from "../../Assets/visu/home.png";
import roomicon from "../../Assets/visu/room.png";

export default function Dashbord() {
  const [user, setUser] = useState("");
  const menuDash = [
    {
      title: "Gérer ses logements",
      icon: houseicon,
      description: "Déclarez et modifiez votre logement",
      link: "/logement",
    },
    {
      title: "Gérer ses pièces",
      icon: roomicon,
      description: "Annoncez les différentes pièces de votre logement",
      link: "/pieces",
    },
  ];
  //récupération des données de l'utilisateur

  return (
    <div className="page-wrapper">
      <div className="container-fluid">
        <div className="row m-5">
          {menuDash.map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className="card border-dark">
                <div className="card-header bg-dark">
                  <h4 className="mb-0 text-white">{card.title}</h4>
                </div>
                <div className="card-body">
                  <h3 className="card-title">Special title treatment</h3>
                  <p className="card-text">{card.description}</p>
                  <Link to={card.link} className="btn btn-secondary">
                    Accéder
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    // <main classNameName="row p-2 d-flex flex-row ">
    //   <article classNameName="col-lg-9 mb-3 mb-sm-0 ">
    //     {menuDash.map((card, index) => (
    //       <section
    //         key={index}
    //         classNameName="card p-2 d-flex flex-column bd-highlight align-items-center"
    //       >
    //         <div classNameName="icon text-center">
    //           <img src={card.icon} alt={card.title} />
    //         </div>
    //         <div classNameName="details">
    //           <h2>{card.title}</h2>
    //           <p>{card.description}</p>
    //         </div>
    //       </section>
    //     ))}
    //     ;
    //     <p>
    //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab facilis
    //       laudantium reprehenderit earum natus recusandae repellat! Nulla, quia
    //       doloribus dolore dignissimos odit optio nihil consectetur dolorum
    //       libero minima possimus vero! Lorem ipsum dolor sit amet consectetur,
    //       adipisicing elit. Eos neque accusamus qui impedit corrupti! Doloribus,
    //       rem deserunt, magni quis fugit, iure facilis saepe aspernatur ut
    //       molestiae laborum provident nam temporibus? Lorem ipsum dolor sit amet
    //       consectetur adipisicing elit. Totam quam harum voluptatum labore
    //       maxime! Quos vero est velit facere ipsum qui rerum, sed quae nobis
    //       voluptas dolores quidem tempore tenetur!
    //     </p>
    //   </article>
    // </main>
  );
}
