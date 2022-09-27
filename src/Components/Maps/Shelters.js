import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import "./Shelters.css";
import { useState } from "react";
import Instagram from "./Instagram";
import Map from "./Map";

export default function Shelters() {
  const api = process.env.REACT_APP_API_KEY;
  const containerStyle = {
    width: "97%",
    maxWidth: "700px",
    height: "100%",
    minHeight: "400px",
  };

  return (
    <div className="bg-stone-100 shelter-container">
      <h1 className="text-2xl text-stone-500 divider">
        Información de contacto
      </h1>
      <div className=" lg:grid grid-cols-4 ">
        {datos.map((info) => (
          <div tabIndex={0} className="collapse">
            <div className="collapse-title text-xl font-medium">
              <p>{info.shelterName}</p>
            </div>
            <div className="collapse-content">
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
