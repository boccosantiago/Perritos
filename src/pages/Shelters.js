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
      <div className=" lg:grid grid-cols-4 ">
        {datos.map((info) => (
          <div tabIndex={0} className="collapse">
            <div className="collapse-title text-xl font-medium">
              <p className="">{info.shelterName}</p>
            </div>
            <div className="collapse-content bg-stone-100">
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
