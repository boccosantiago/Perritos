import React,  { useState } from "react";
//import { Link } from "react-router-dom";
//import Card from "./Card";
//import Filter from "./Filter";
//import "../styles/Main.css";
import { useParams } from "react-router-dom";
import data from "../datos";

function Dogs () {
    const loadImage = require.context("../img", true);
    const params = useParams();
    const infoProtect = data.map(item => item.pets)

    //const result = infoProtect.filter(id => id === params.id);
    const array = []
    infoProtect.map(item => item.map(y => array.push(y)))
    const result = array.filter(item => item.id == params.id )
    let dogData = result[0]

    console.log('infoprotect', infoProtect)
    console.log('result', result[0].name)
    console.log(params.id)
 
    


return (
    <div className="container-main">
        <h1>{params.id} number</h1>
        
        <img id="img-card" src= {loadImage(`./id${params.id}.jpg`)}></img>
        {infoProtect.name}
        <div> {dogData.name}</div>
        <div> {dogData.age} </div>
        <div> {dogData.breed} </div> 

    </div>
)
}

export default Dogs;