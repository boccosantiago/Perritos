import React, { useState, useContext } from "react";
import data from "../datos";
import "../styles/Card.css";
import { Link } from "react-router-dom";
import FavoriteDog from "./FavoriteDog";

function Card(props) {
  const value = props.filterData;
  const infoProtect = data.map((item) => item.pets);
  const [petFound, setPetFound] = useState([...infoProtect]);

  console.log('filter', props.filterData)

  const indexProtectora = infoProtect.findIndex(item => item.findIndex(pet => pet.id) > -1);


  console.log('DATA', data[0].city)

  function filterPets() {
    if (Object.values(value).length === 0) {
      setPetFound([...infoProtect]);
    } else {
      const lowerCaseName = props.filterData.name.toLowerCase();
      const lowerCaseCity = props.filterData.city;
      const lowerCaseAge = props.filterData.age;
      const lowerCaseGender = props.filterData.gender;
      const lowerCaseSize = props.filterData.size;
      const lowerCaseCoat = props.filterData.coat;
      const lowerCaseBreed = props.filterData.breed;
      const lowerCaseColor = props.filterData.color;

      

      const filteredPet = infoProtect.map((item) =>
        item.filter((pet) => {
          
          return (
            (!lowerCaseName || pet.name.toLowerCase().includes(lowerCaseName)) &&
            (!lowerCaseCity || data[indexProtectora].city.includes(lowerCaseCity)) &&
            (!lowerCaseAge || pet.age.includes(lowerCaseAge)) &&
            (!lowerCaseGender || pet.gender.includes(lowerCaseGender)) &&
            (!lowerCaseSize || pet.size.includes(lowerCaseSize)) &&
            (!lowerCaseCoat || pet.coatLength.includes(lowerCaseCoat)) &&
            (!lowerCaseBreed || pet.breed.includes(lowerCaseBreed)) &&
            (!lowerCaseColor || pet.color.includes(lowerCaseColor))
          );
        })
      );

      setPetFound([...filteredPet]);
    }
  }

  const cargarImagen = require.context("../img", true);

  return (
    <div id="container">
      <button className="btn m-auto buscar" onClick={filterPets}>
        Buscar
      </button>
      <div id="container-card">
        {petFound.map((pets) =>
          pets.map((pet) => (
            <div key={pet.id} className="card  card-compact w-96 bg-base-100 shadow-xl m-5">
              <Link to={`./${pet.id}`}>
              <figure>
              <img
                    id="img-card"
                    alt=""
                    src={cargarImagen(`./id${pet.id}.jpg`)}
                  />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{pet.name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Adoptame</button>
                </div>
              </div>
              </Link>
              <FavoriteDog petId={pet.id} />
            </div>
            
          ))
        )}
      </div>
    </div>
  );
}

export default Card;
