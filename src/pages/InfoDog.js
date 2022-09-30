import React from "react";
import { useParams } from "react-router-dom";
import data from "../datos";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import FavoriteDog from "../Components/FavoriteDog";
import "../styles/InfoDog.css";

function Dogs() {
  const loadImage = require.context("../Assets/img", true);
  const params = useParams();
  const infoProtect = data.map((item) => item.pets);

  const arrayPets = [];
  infoProtect.map((item) => item.map((y) => arrayPets.push(y)));
  const result = arrayPets.filter((item) => item.id === Number(params.id));
  const dogData = result[0];



  return (
    <div className="container-dog text-center bg-stone-100">
      <div className="dog-card">
        <div className="card w-80 sm:w-96 mx-auto bg-base-100 shadow-xl">
          <figure>
            <img
              style={{ width: "100%" }}
              className="img-dog-card w-auto"
              alt=""
              src={loadImage(`./id${params.id}.jpg`)}
            />
          </figure>
          <div className="card-body">
            <FavoriteDog petId={dogData.id} />
            <p className="flex text-gray-400">
              <IoLocationSharp />
              {dogData.city}
            </p>
            <h2 className="card-title text-2xl p-0">{dogData.name}</h2>
            <h2 className="text-xl text-start p-0">Detalles: </h2>
            <div className="grid grid-cols-2 ">
              <div className="col1">
                <p className="text-start">
                  <span className="font-bold">Edad:</span>{" "}
                  <span>{dogData.age}</span>
                </p>
                <p className="text-start">
                  <span className="font-bold">Sexo:</span>{" "}
                  <span>{dogData.gender}</span>
                </p>
                <p className="text-start">
                  <span className="font-bold">Tamaño:</span>{" "}
                  <span>{dogData.size}</span>
                </p>
              </div>
              <div className="col2 ">
                <p className="text-start">
                  <span className="font-bold">Raza:</span>{" "}
                  <span>{dogData.breed}</span>
                </p>
                <p className="text-start">
                  <span className="font-bold">Pelo:</span>{" "}
                  <span>{dogData.coatLength}</span>
                </p>
              </div>
            </div>
            <h2 className="text-xl text-start p-0">Descripción: </h2>
            <div className="text-justify">{dogData.description}</div>
            <div className="card-actions justify-end">
              <Link to="./formulario" className="btn btn-primary absolute top-72 sm:top-80">
                Adóptame
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Link to='/main'>
      <button className="btn btn-secondary mb-5">
        Regresar
      </button>
      </Link>
    </div>
  );
}

export default Dogs;
