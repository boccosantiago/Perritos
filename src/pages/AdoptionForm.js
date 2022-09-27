import { useState, useContext } from "react";
import "../styles/AdoptionForm.css";
import { useParams, Link } from "react-router-dom";
import data from "../datos";
import { AuthContext } from "../context/auth";
import { db } from "../firebase";

import { setDoc, doc, Timestamp } from "firebase/firestore";
export default function Formulario() {
  const { id } = useParams();
  console.log(id);

  const infoProtect = data.map((item) => item.pets);
  const arrayPets = [];
  infoProtect.map((item) => item.map((y) => arrayPets.push(y)));
  const result = arrayPets.filter((item) => item.id === Number(id));
  console.log(result);
  
  const [formData, setFormData] = useState({
    
    dogName: result[0].name,
    breed: result[0].breed,
    dogAge:result[0].age,
    gender:result[0].gender,
    size:result[0].size,
    color: result[0].color,
    coatLength: result[0].coatLength,
    name: "",
    age: "",
    city: "",
    address: "",
    phone: "",
    email: "",
    adoptar: "",
    otrasMascotas: "",
    pasadoMascotas: "",
    tieneMascotas: "",
    casa: "",
    alergia: "",
    dormitorio: "",
    encargado: "",
    personasCasa: "",
    niños: "",
    acuerdo: "",
    visitas: "",
    paseos: "",
    tiempoSolo: "",
    vacaciones: "",
    cambioCasa: "",
    gasto: "",
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  const { user } = useContext(AuthContext);

  async function handleSubmit(event) {
    setFormData({ ...formData });
    event.preventDefault();
    // submitToApi(formData)
    console.log(formData);
    try {
      await setDoc(doc(db, "form", user.uid), {
        uid: user.uid,
        formData,
        createdAt: Timestamp.fromDate(new Date()),
        // isOnline: false,
      });
      setFormData({
        name: "",
        age: "",
        city: "",
        address: "",
        phone: "",
        email: "",
        adoptar: "",
        otrasMascotas: "",
        pasadoMascotas: "",
        tieneMascotas: "",
        casa: "",
        alergia: "",
        dormitorio: "",
        encargado: "",
        personasCasa: "",
        niños: "",
        acuerdo: "",
        visitas: "",
        paseos: "",
        tiempoSolo: "",
        vacaciones: "",
        cambioCasa: "",
        gasto: "",
      });
    } catch (err) {
      console.log(err);
    }
  }

 
  return (
    <div id="form-container">
      <h1>FORMULARIO DE SOLICITUD DE ADOPCIÓN</h1>
      <p>
        Para poder adoptar a uno de nuestros PERRITOS tendrá que rellenar el
        formulario que se muestra a continuación y automáticamente se enviará a
        la protectora que corresponda.
      </p>
      <form id="formulario">
        <div>
          <h2>Datos del adoptado</h2>
          <p>Nombre: {result[0].name}</p>
          <p>Raza: {result[0].breed}</p>
          <p>Edad: {result[0].age}</p>
          <p>Sexo: {result[0].gender}</p>
          <p>Tamaño: {result[0].size}</p>
          <p>Color: {result[0].color}</p>
          <p>Pelaje: {result[0].coatLength}</p>
        </div>
        <div className="datos-container">
          <h2>Datos del adoptante</h2>
          <label>
            Nombre completo:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Edad:
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </label>
          <label>
            Ciudad:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </label>
          <label>
            Dirección:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <label>
            Teléfono:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <label>
            Correo:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="datos-container">
          <h2>Información personal</h2>
          <label>
            ¿Por qué desea adoptar una mascota?
            <input
              type="text"
              name="adoptar"
              value={formData.adoptar}
              onChange={handleChange}
            />
          </label>
          <label>
            ¿Ha tenido otras mascotas? ¿Cuáles?
            <input
              type="text"
              name="otrasMascotas"
              value={formData.otrasMascotas}
              onChange={handleChange}
            />
          </label>
          <label>
            ¿Qué fue lo que pasó con sus otras mascotas?
            <input
              type="text"
              name="pasadoMascotas"
              value={formData.pasadoMascotas}
              onChange={handleChange}
            />
          </label>
          <label>
            ¿Actualmente tiene otras mascotas?¿Están esterilizados?
            <input
              type="text"
              name="tieneMascotas"
              value={formData.tieneMascotas}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="datos-container">
          <h2>Información sobre su hogas</h2>
          <fieldset>
            <label>
              ¿Vives en casa o departamento? ¿Propio o rentado?
              <label htmlFor="casa-propia">Casa propia</label>
              <input
                type="radio"
                value="casa-propia"
                id="casa-propia"
                name="casa"
                checked={formData.casa === "casa-propia"}
                onChange={handleChange}
              />
              <label htmlFor="casa-rentada">Casa rentada</label>
              <input
                type="radio"
                value="casa-rentada"
                id="casa-rentada"
                name="casa"
                checked={formData.casa === "casa-rentada"}
                onChange={handleChange}
              />
              <label htmlFor="departamento-propio">Departamento propio</label>
              <input
                type="radio"
                value="departamento-propio"
                id="departamento-propio"
                checked={formData.casa === "departamento-propio"}
                name="casa"
                onChange={handleChange}
              />
              <label htmlFor="departamento-rentado">Departamento rentado</label>
              <input
                type="radio"
                value="departamento-rentado"
                id="departamento-rentado"
                checked={formData.casa === "departamento-rentado"}
                name="casa"
                onChange={handleChange}
              />
            </label>
          </fieldset>
          <label>
            ¿Cuántas personas viven en su casa?
            <input
              type="text"
              name="personasCasa"
              value={formData.personasCasa}
              onChange={handleChange}
            />
          </label>
          <label>
            ¿Hay niños en casa? Edades:
            <input
              type="text"
              name="niños"
              value={formData.niños}
              onChange={handleChange}
            />
          </label>
          <label>
            ¿Están todos de acuerdo en adoptar?
            <label htmlFor="Si">Si</label>
            <input
              type="radio"
              value="Si"
              id="Si"
              name="acuerdo"
              checked={formData.acuerdo === "si"}
              onChange={handleChange}
            />
            <label htmlFor="No">No</label>
            <input
              type="radio"
              value="No"
              id="No"
              name="acuerdo"
              checked={formData.acuerdo === "no"}
              onChange={handleChange}
            />
          </label>
          <label>
            ¿Hay alguien que sea alérgico a los animales o sufra de asma?
            <input
              type="text"
              name="alergia"
              value={formData.alergia}
              onChange={handleChange}
            />
          </label>
          <label>
            ¿Dónde dormirá la mascota?
            <input
              type="text"
              name="dormitorio"
              value={formData.dormitorio}
              onChange={handleChange}
            />
          </label>
          <label>
            ¿Quién será el responsable y se hará cargo de cubrir los gastos del
            adoptado?
            <input
              type="text"
              name="encargado"
              value={formData.encargado}
              onChange={handleChange}
            />
          </label>
          <label>
            ¿Está de acuerdo en recibir visitas domiciliarias para conocer el
            estado de la mascota?¿Por qué?
            <input
              type="text"
              name="visitas"
              value={formData.visitas}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="datos-container">
          <h2>El futuro con su mascota</h2>
          <label>
            ¿Cuántas veces saldrá a pasear al día? ¿Cuánto tiempo en total?
            <input
              type="text"
              name="paseos"
              value={formData.paseos}
              onChange={handleChange}
            />
          </label>
          <label>
            ¿Cuánto tiempo pasará sola la mascota?
            <input
              type="text"
              name="tiempoSolo"
              value={formData.tiempoSolo}
              onChange={handleChange}
            />
          </label>
          <label>
            Si sales de vacaciones, ¿con quién dejarás al perro?
            <input
              type="text"
              name="vacaciones"
              value={formData.vacaciones}
              onChange={handleChange}
            />
          </label>
          <label>
            Si te cambias de país o casa y no puedes llevar al perro, ¿qué
            harías con él?
            <input
              type="text"
              name="cambioCasa"
              value={formData.cambioCasa}
              onChange={handleChange}
            />
          </label>
          <label>
            ¿Cuál es el gasto medio que crees que puedes gastar en un perro al
            mes?
            <input
              type="text"
              name="gasto"
              value={formData.gasto}
              onChange={handleChange}
            />
          </label>
        </div>
        <button onClick={handleSubmit} className="btn  buscar text-white">
          Enviar
        </button>
      </form>
      <Link to="/main" className="btn btn-secondary mb-5">
        Regresar
      </Link>
    </div>
  );
}
