import React, { useState } from "react";
import data from "../datos"
import "../Components/Card.css"
import { Link } from "react-router-dom";

function Card (props) {
    var value = props.filterData
    const infoProtect = data.map(item => item.pets)
    const [petFilter, setPetFilter] = useState([...infoProtect])
    
    const [petFound, setPetFound] = useState([...petFilter])


    function filterPets() {
        
        
        console.log('a', value, petFilter)
        if (Object.values(value).length === 0) {
            setPetFound([...petFilter])
        } else {
            console.log("hola")
        }

    }

    
    
    const cargarImagen = require.context("../img", true);
    
    return (
        <div id="container-card">
            <button onClick={filterPets}>Buscar</button>
            {petFilter.map((pets, index) => (
                pets.map(pet => (
                    <div key={`pet.id${pet.id}`} id="card">
                        <Link to={`${pet.id}`}><div id="container-img">
                        <img id="img-card" src= {cargarImagen(`./id${pet.id}.jpg`)}></img>
                        </div> </Link>
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