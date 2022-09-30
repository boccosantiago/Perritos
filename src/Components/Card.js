import React, { useState, useEffect } from "react";
import data from "../datos";
import "../styles/Card.css";
import { Link } from "react-router-dom";
import FavoriteDog from "./FavoriteDog";
import { IoLocationSharp } from "react-icons/io5";

function Card(props) {
  const value = props.filterData;
  const infoProtect = data.map((item) => item.pets);
  const [petFound, setPetFound] = useState([...infoProtect]);

  function filterPets() {
    if (Object.values(value).length === 0) {
      setPetFound([...infoProtect]);
    } else {

      const lowerCaseName = props.filterData.name.toLowerCase();
      const city = props.filterData.city;
      const age = props.filterData.age;
      const gender = props.filterData.gender;
      const size = props.filterData.size;
      const coat = props.filterData.coat;
      const breed = props.filterData.breed;
      const color = props.filterData.color;

      const filteredPet = infoProtect.map((item) =>
        item.filter((pet) => {
          return (
            (!lowerCaseName ||
              pet.name.toLowerCase().includes(lowerCaseName)) &&
            (!city || pet.city.includes(city)) &&
            (!age || pet.age.includes(age)) &&
            (!gender || pet.gender.includes(gender)) &&
            (!size || pet.size.includes(size)) &&
            (!coat || pet.coatLength.includes(coat)) &&
            (!breed || pet.breed.includes(breed)) &&
            (!color || pet.color.includes(color))
          );
        })
      );

      setPetFound([...filteredPet]);
    }
  }

  useEffect(() => {

    filterPets()
  },[value]);

  const isTherePets = petFound.flat() 

  const loadImage = require.context("../Assets/img", true);

  return isTherePets.length !== 0 ? (
      <div className="container-card ">
        {petFound.map((pets) =>
          pets.map((pet) => (
            <div
              key={pet.id}
              className="card card-compact w-80 bg-base-100 shadow-xl m-5"
            >
              <Link to={`./${pet.id}`}>
                <figure>
                  <img
                    id="img-card"
                    alt=""
                    src={loadImage(`./id${pet.id}.jpg`)}
                  />
                </figure>
                <div className="card-body">
                  <div className="flex justify-between">
                    <h2 className="card-title p-0">{pet.name}</h2>
                    <p className="flex place-content-end	text-gray-400">
                      <IoLocationSharp />
                      {pet.city}
                    </p>
                  </div>
                  <p className="text-justify m-2">{pet.description}</p>
                </div>
              </Link>
              <FavoriteDog petId={pet.id} />
            </div>
          ))
        )}
      </div>
  ) : (
    <div className="notFound">
      <p className="text-2xl pt-20">Modifique sus criterios de búsqueda.</p>{" "}
    </div>
  );
}

export default Card;
