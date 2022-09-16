import React, { useState } from "react";
import data from "../datos";
import "../styles/Card.css";
import { Link } from "react-router-dom";
import FavoriteContext from "../contexts/favoritesContext";


function Card(props) {
  const value = props.filterData;
  const infoProtect = data.map((item) => item.pets);
  const {favoriteDogs, updateFavoriteDogs} = useContext(FavoriteContext)
  const [petFound, setPetFound] = useState([...infoProtect]);

  function filterPets() {
    if (Object.values(value).length === 0) {
      setPetFound([...infoProtect]);
    } else {
      const lowerCaseName = props.filterData.name.toLowerCase();
      const lowerCaseAge = props.filterData.age;
      const lowerCaseGender = props.filterData.gender;
      const lowerCaseSize = props.filterData.size;
      const lowerCaseCoat = props.filterData.coat;
      const lowerCaseBreed = props.filterData.breed;
      const lowerCaseColor = props.filterData.color;

      //  console.log('lower', lowerCaseColor)

      const filteredPet = infoProtect.map((item) =>
        item.filter((pet) => {
          return (
            (!lowerCaseName ||
              pet.name.toLowerCase().includes(lowerCaseName)) &&
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

  const [favorite, setFavorite] = useState([]);

  function updateFavorite (itemId) {
    let updatedFavorite = [...favorite];
    if (!updatedFavorite.includes(itemId)) {
      updatedFavorite = [...favorite, itemId];
    } else {
      updatedFavorite = updatedFavorite.filter(
        (favoriteItem) => itemId !== favoriteItem
      );
    }
    setFavorite(updatedFavorite);
  };

  console.log('fav', favorite)

  const cargarImagen = require.context("../img", true);

  return (
    <div id="container">
      <button className="buscar" onClick={filterPets}>
        Buscar
      </button>
      <div id="container-card">
        {petFound.map((pets) =>
          pets.map((pet, index) => (
            <div id="card" key={pet.id}>
              <Link to={`./${pet.id}`}>
                <div id="container-img">
                  <img
                    id="img-card"
                    alt=""
                    src={cargarImagen(`./id${pet.id}.jpg`)}
                  ></img>
                </div>
                <p className="pet-name">{pet.name}</p>
              </Link>
              <div className="heart" onClick={() => updateFavorite(pet.id)}>
                {favorite.includes(pet.id) ? "❤️" : "🤍"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  
}

export default Card;

