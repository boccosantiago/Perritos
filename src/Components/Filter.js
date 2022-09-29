import React from "react";
import data from "../datos";
import "../styles/Filter.css";

function Filter(props) {
  const petArray = [];
  const cityArray = [];

  data.map((item) =>
    item.pets.map((pet) => {
      petArray.push(pet.breed.toString());
      cityArray.push(pet.city);
    })
  );

  const cityJoin = cityArray.join();
  const city = Array.from(new Set(cityJoin.split(",")));

  const petJoin = petArray.join();
  const petSplit = Array.from(new Set(petJoin.split(",")));

  function handleChange(event) {
    const { name, value } = event.target;
    props.setFilterData((prevFilterData) => {
      return {
        ...prevFilterData,
        [name]: value,
      };
    });
  }

  function resetFilter() {
    props.setFilterData({
      name: "",
      age: "",
      city: "",
      gender: "",
      breed: "",
      size: "",
      color: "",
      coat: "",
    });
  }

  return (
    <div className="filter-main ">
      <div>
        <p>Nombre</p>
        <input
          type="text"
          placeholder="Escriba un nombre"
          name="name"
          onChange={(e) => {
            handleChange(e);
          }}
          value={props.filterData.name}
        />
      </div>
      <div>
        <p>Ubicacion</p>
        <select
          name="city"
          id="listCity"
          onChange={(e) => {
            handleChange(e);
          }}
          value={props.filterData.city}
        >
          <option value="">Seleccionar</option>
          {city.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Edad</p>
        <select
          name="age"
          id="listAge"
          onChange={(e) => {
            handleChange(e);
          }}
          value={props.filterData.age}
        >
          <option value="">Seleccionar</option>
          <option value="Cachorro">Cachorro</option>
          <option value="Joven">Joven</option>
          <option value="Adulto">Adulto</option>
        </select>
      </div>
      <div>
        <p>Sexo</p>
        <select
          name="gender"
          id="dataListSex"
          onChange={(e) => {
            handleChange(e);
          }}
          value={props.filterData.gender}
        >
          <option value="">Seleccionar</option>
          <option value="Macho">Macho</option>
          <option value="Hembra">Hembra</option>
        </select>
      </div>
      <div>
        <p>Raza</p>
        <select
          name="breed"
          id="listBreed"
          onChange={(e) => {
            handleChange(e);
          }}
          value={props.filterData.breed}
        >
          <option value="">Seleccionar</option>
          {petSplit.map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Color</p>
        <select
          name="color"
          id="listColor"
          onChange={(e) => {
            handleChange(e);
          }}
          value={props.filterData.color}
        >
          <option value="">Seleccionar</option>
          <option value="Negro">Negro</option>
          <option value="Blanco">Blanco</option>
          <option value="Marrón">Marrón</option>
        </select>
      </div>
      <div>
        <p>Tamaño</p>
        <select
          name="size"
          id="listSize"
          onChange={(e) => {
            handleChange(e);
          }}
          value={props.filterData.size}
        >
          <option value="">Seleccionar</option>
          <option value="Pequeño">Pequeño</option>
          <option value="Mediano">Mediano</option>
          <option value="Grande">Grande</option>
        </select>
      </div>
      <div>
        <p>Pelaje</p>
        <select
          name="coat"
          id="listCoat"
          onChange={(e) => {
            handleChange(e);
          }}
          value={props.filterData.coat}
        >
          <option value="">Seleccionar</option>
          <option value="Corto">Corto</option>
          <option value="Mediano">Mediano</option>
          <option value="Largo">Largo</option>
        </select>
      </div>
      <button className="btn btn-xs mt-8" onClick={resetFilter}>
        Restablecer
      </button>
    </div>
  );
}

export default Filter;
