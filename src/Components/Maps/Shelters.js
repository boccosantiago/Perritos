import React from "react";
import {
  useJsApiLoader,
} from "@react-google-maps/api";
import "./Shelters.css";
import { useState } from "react";
import Instagram from "./Instagram";
import Map from "./Map";


export default function Shelters(){

  return( 
    <div className="bg-stone-100">
    <Map/>
    <Instagram/>
    </div>
    )
}
