import React, { useState } from "react";
import data from "../datos"
import "../Components/Card.css"
function Card (props) {
    var value = props.filterData
    const infoProtect = data.map(item => item.pets)
    const [petFilter, setPetFilter] = useState([...infoProtect])
    
    const [petFound, setPetFound] = useState([...petFilter])


    function filterPets() {
        
        
        console.log(value, petFilter)
        if (Object.values(value).length === 0) {
            setPetFound([...petFilter])
        } else {
            console.log("hola")
        }
        
        //else {
        //     const filteredName = [...petFilter].filter(item => {
        //         return item.name.toLowerCase().includes(lowerCaseValue)
        //     });
        //     setPetFound(filteredName);
        //  }
    }


    
    
    // const name = infoProtect.map(pets => pets.map(pet => pet.name));
    // const images = infoProtect.map(pets => pets.map(pet => console.log(`../img/id${pet.id}.jpg`)))
    
    
    const cargarImagen = require.context("../img", true);
    
    return (
        <div id="container-card">
            <button onClick={filterPets}>Buscar</button>
            {petFilter.map((pets, index) => (
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