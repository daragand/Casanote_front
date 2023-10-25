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
    <div classNameName="page-wrapper">
      <div classNameName="container-fluid">
        <div classNameName="row m-5">
          {menuDash.map((card, index) => (
            <div classNameName="col-md-4" key={index}>
              <div classNameName="card border-dark">
                <div classNameName="card-header bg-dark">
                  <h4 classNameName="mb-0 text-white">{card.title}</h4>
                </div>
                <div classNameName="card-body">
                <img src={card.icon} alt={card.title} className="rounded-circle w-50 mx-auto d-block"/>
                  {/* <h3 classNameName="card-title">Special title treatment</h3> */}
                  <p classNameName="card-text">{card.description}</p>
                  <Link to={card.link} classNameName="btn btn-secondary mx-auto">
                    Accéder
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    // <main classNameNameName="row p-2 d-flex flex-row ">
    //   <article classNameNameName="col-lg-9 mb-3 mb-sm-0 ">
    //     {menuDash.map((card, index) => (
    //       <section
    //         key={index}
    //         classNameNameName="card p-2 d-flex flex-column bd-highlight align-items-center"
    //       >
    //         <div classNameNameName="icon text-center">
    //           <img src={card.icon} alt={card.title} />
    //         </div>
    //         <div classNameNameName="details">
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
