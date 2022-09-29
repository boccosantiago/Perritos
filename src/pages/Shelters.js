import React from "react";
import Instagram from "../Components/Instagram";
import Map from "../Components/Map";
import datos from "../datos"
import "../styles/Shelters.css";

export default function Shelters() {
  
  return (
    <div className="bg-stone-100 shelter-container">
      <h1 className="text-2xl text-stone-500 divider">
        Información de contacto
      </h1>
      <div className=" xl:grid grid-cols-4 xl:px-12 p-5">
        {datos.map((info) => (
          <div className="pb-6">
            <div className="text-xl font-medium">
              <p className="px-5">{info.shelterName}</p>
            </div>
            <div className=" bg-stone-100 p-5">
              <p>{info.email}</p>
              <p>{info.address}</p>
              <p>{info.phone}</p>
              <p>{info.web}</p>
            </div>
          </div>
        ))}
      </div>
      <Map />
      <Instagram />
    </div>
  );
}
