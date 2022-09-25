import React from "react";
import { useParams } from "react-router-dom";
import data from "../datos";
import { Link } from "react-router-dom";
import "../styles/Dogs.css";
import { IoLocationSharp } from "react-icons/io5";
import FavoriteDog from "./FavoriteDog";

function Dogs() {
  const loadImage = require.context("../img", true);
  const params = useParams();
  const infoProtect = data.map((item) => item.pets);

  const arrayPets = [];
  infoProtect.map((item) => item.map((y) => arrayPets.push(y)));
  const result = arrayPets.filter((item) => item.id === Number(params.id));
  const dogData = result[0];

  const indexProtectora = infoProtect.findIndex(
    (item) => item.findIndex((pet) => pet.id === Number(params.id)) > -1
  );

  return (
    <div className="container-dog">
      <div className="dog-card">
        <div className="card w-96 mx-auto bg-base-100 shadow-xl">
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
              {data[indexProtectora].city}
            </p>
            <h2 className="card-title text-2xl ">{dogData.name}</h2>
            <h2 className="text-xl">Detalles: </h2>
            <p>Edad: {dogData.age}</p>
            <p>Sexo: {dogData.gender}</p>
            <p>Tamaño: {dogData.size}</p>
            <p>Raza: {dogData.breed}</p>
            <p>Pelo: {dogData.coatLength}</p>
            <div className="card-actions justify-end">
              <Link to="./formulario" className="btn btn-primary">
                Adoptame
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dogs;
