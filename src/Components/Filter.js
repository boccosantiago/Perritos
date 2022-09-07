import React from "react";
import data from "../datos";

function Filter(props) {

  const mascotas = []
  data.map(item => item.pets.map(pet=> mascotas.push(pet.breed.toString())))
  const separ = mascotas.join()
  const separadas = Array.from(new Set(separ.split(',')));


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
    <div>
      <div>
        <p>Nombre</p>
        <input
          type="text"
          placeholder="Kimba"
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </div>
      <div>
        <p>Edad</p>
        <input
          id="listAge"
          type="text"
          name="edad"
          list="dataListAge"
          placeholder="Adulto"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <datalist id="dataListAge">
          <option value="Cachorro" />
          <option value="Joven" />
          <option value="Adulto" />
        </datalist>
      </div>
      <div>
        <p>Sexo</p>
        <input
          type="text"
          name="sexo"
          list="dataListSex"
          placeholder="Macho"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <datalist id="dataListSex">
          <option value="Macho" />
          <option value="Hembra" />
        </datalist>
      </div>
      <div>
        <p>Raza</p>
        <input
          type="text"
          name="raza"
          list="dataListBreed"
          placeholder="Pitbull"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <select id="dataListBreed">
        <option value=''>Select</option>
        {separadas.map((item)=>(
           <option value={item} key={item}>
            {item}
           </option> 
        ))}
        </select>
      </div>
      <div>
        <p>Color</p>
        <input
          type="text"
          name="color"
          list="dataListColor"
          placeholder="Negro"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <datalist id="dataListColor">
          <option value="Negro" />
          <option value="Blanco" />
          <option value="Marrón" />
        </datalist>
      </div>
      <div>
        <p>Tamaño</p>
        <input
          type="text"
          name="tamaño"
          list="dataListSize"
          placeholder="Grande"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <datalist id="dataListSize">
          <option value="Pequeño" />
          <option value="Mediano" />
          <option value="Grande" />
        </datalist>
      </div>
      <div>
        <p>Pelaje</p>
        <input
          type="text"
          name="pelaje"
          list="dataListCoat"
          placeholder="Corto"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <datalist id="dataListCoat">
          <option value="Corto" />
          <option value="Mediano" />
          <option value="Largo" />
        </datalist>
      </div>
    </div>
  );
}

export default Filter;
