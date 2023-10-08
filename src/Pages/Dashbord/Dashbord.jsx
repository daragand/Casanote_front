import {Link} from "react-router-dom"
import { useState,useEffect } from "react"
import axios from "axios";
import usericon from '../../Assets/visu/user.png'
import houseicon from '../../Assets/visu/home.png'
import roomicon from '../../Assets/visu/room.png'



export default function Dashbord() {
    const [user,setUser]=useState('');
    const menuDash =[
        {
            title:'Gérer ses logements',
            icon:houseicon,
            description:'Déclarez et modifiez votre logement'
    },
        {
            title:'Gérer ses pièces',
            icon:roomicon,
            description:'Annoncez les différentes pièces de votre logement'
    },
    ]
    //récupération des données de l'utilisateur
    
    
    

    return (
<main className="content grid-col4">
{menuDash.map((card,index) => (
        <section key={index} className="card-menu">
            <img src={card.icon} alt={card.title} />
            <h2>{card.title}</h2>
            <p>{card.description}</p>
        </section>
    ))};


<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab facilis laudantium reprehenderit earum natus recusandae repellat! Nulla, quia doloribus dolore dignissimos odit optio nihil consectetur dolorum libero minima possimus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos neque accusamus qui impedit corrupti! Doloribus, rem deserunt, magni quis fugit, iure facilis saepe aspernatur ut molestiae laborum provident nam temporibus? Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam quam harum voluptatum labore maxime! Quos vero est velit facere ipsum qui rerum, sed quae nobis voluptas dolores quidem tempore tenetur!</p>
</main>

    )
}