import React from "react";
import data from "../datos";
import '../styles/Filter.css'

function Filter(props) {
  const mascotas = [];
  data.map((item) =>
    item.pets.map((pet) => mascotas.push(pet.breed.toString()))
  );
  const city = data.map((item) => item.city)


  const separ = mascotas.join();
  const separadas = Array.from(new Set(separ.split(",")));

  function handleChange(event) {
    const { name, value } = event.target;
    props.setFilterData((prevFilterData) => {
      return {
        ...prevFilterData,
        [name]: value,
      };
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
        >
          <option value="">Seleccionar</option>
          {separadas.map((item) => (
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
        >
          <option value="">Seleccionar</option>
          <option value="Corto">Corto</option>
          <option value="Mediano">Mediano</option>
          <option value="Largo">Largo</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
