import React, { useState } from "react";
import data from "../datos"
import "../Components/Card.css"
import {Link} from  'react-router-dom'

function Card (props) {
    var value = props.filterData
    const infoProtect = data.map(item => item.pets)

    const [petFound, setPetFound] = useState([...infoProtect])


    function filterPets() {
        
        if (Object.values(value).length === 0) {
            setPetFound([...infoProtect])
        } else {
            
                const lowerCaseName = props.filterData.name.toLowerCase()
                const lowerCaseAge = props.filterData.age.toLowerCase()
                const lowerCaseGender = props.filterData.gender.toLowerCase()
                const lowerCaseSize = props.filterData.size.toLowerCase()
                const lowerCaseCoat= props.filterData.coat.toLowerCase()
           
                const lowerCaseBreed = props.filterData.breed.toLowerCase()
                const lowerCaseColor= props.filterData.color.toLowerCase()
                
                const filteredPet = infoProtect.map(item => item.filter(pet => {
                    return (!lowerCaseName || pet.name.toLowerCase().includes(lowerCaseName))
                    && (!lowerCaseAge || pet.age.toLowerCase().includes(lowerCaseAge)) 
                    && (!lowerCaseGender || pet.gender.toLowerCase().includes(lowerCaseGender)) 
                    && (!lowerCaseSize || pet.size.toLowerCase().includes(lowerCaseSize)) 
                    && (!lowerCaseCoat || pet.coatLength.toLowerCase().includes(lowerCaseCoat))
                    && (!lowerCaseBreed || pet.breed.includes(lowerCaseBreed))
                    && (!lowerCaseColor || pet.color.includes(lowerCaseColor))
                }));
        
                setPetFound([...filteredPet])
        }
    }
  
    const cargarImagen = require.context("../img", true);
    
    return (
        <div id="container-card">
            <button onClick={filterPets}>Buscar</button>
            {petFound.map((pets, index) => (
                pets.map(pet => (
                    <Link to= ""><div key={`pet.id${pet.id}`} id="card">
                        <div id="container-img">
                        <img id="img-card" src= {cargarImagen(`./id${pet.id}.jpg`)}></img>
                        </div>
                        {pet.name}
                    </div></Link>)
                )
            )) }
           <div>
        </div>
        </div>
    )
}

export default Card