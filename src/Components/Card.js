import React from "react";
import data from "../datos"
import "../Components/Card.css"
function Card () {

    const infoProtect = data.map(item => item.pets)
    
    const name = infoProtect.map(pets => pets.map(pet => pet.name));
    const images = infoProtect.map(pets => pets.map(pet => console.log(`../img/id${pet.id}.jpg`)))
    console.log(images)
    
    const cargarImagen = require.context("../img", true);
    
    return (
        <div id="container-card">
            {infoProtect.map((pets, index) => (
                pets.map(pet => (
                    <div key={`pet.id${pet.id}`} id="card">
                        <div id="container-img">
                        <img id="img-card" src= {cargarImagen(`./id${pet.id}.jpg`)}></img>
                        </div>
                        {pet.name}
                    </div>)
                
                )
            )) }
           <div>
        </div>
        </div>
    )
}

export default Card