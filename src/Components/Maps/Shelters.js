import React from "react";
import {
  useJsApiLoader,
} from "@react-google-maps/api";
import "./Shelters.css";
import { useState } from "react";
import datos from "../../datos";
import Instagram from "./Instagram";
import Map from "./Map";


export default function Shelters(){

const api = process.env.REACT_APP_API_KEY;
const containerStyle = {
  width: '97%',
  maxWidth: '700px',
  height: "100%",
  minHeight: '400px'
};



  return( 
    <div className="bg-stone-100">
    <Map/>
    <Instagram/>
    </div>
    )
}
