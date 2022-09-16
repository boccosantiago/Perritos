import {React, useState} from "react";
import { useParams } from "react-router-dom";
import data from "../datos";
import { Link } from "react-router-dom";
import "../styles/Dogs.css";
import { IoLocationSharp } from "react-icons/io5";

function Dogs() {
  const loadImage = require.context("../img", true);
  const params = useParams();
  const infoProtect = data.map((item) => item.pets);

  const arrayPets = [];
  infoProtect.map((item) => item.map((y) => arrayPets.push(y)));
  const result = arrayPets.filter((item) => item.id === Number(params.id));
  let dogData = result[0];

 console.log("infoprotect", result);
 // console.log("result", result[0]);
 // console.log("params", typeof params.id);

  const indexProtectora = infoProtect.findIndex(item => item.findIndex(pet => pet.id === Number(params.id)) > -1);

  //console.log("index", data[indexProtectora]);

  const [like, setLike] = useState(false)
  function handleLike(){
    setLike(prevLike => !prevLike)
  }



  return (

    <div className="container-dog">
      <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 700" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stopColor="#ff6900"></stop><stop offset="95%" stopColor="#fcb900"></stop></linearGradient></defs><path d="M 0,700 C 0,700 0,233 0,233 C 57.20478480700457,218.0610432852386 114.40956961400914,203.12208657047725 170,216 C 225.59043038599086,228.87791342952275 279.56650635096804,269.5726970033296 334,258 C 388.43349364903196,246.4273029966704 443.3244049821187,182.5871254162042 498,188 C 552.6755950178813,193.4128745837958 607.1358737205574,268.0788013318535 652,284 C 696.8641262794426,299.9211986681465 732.1321001356517,257.0976692563818 790,243 C 847.8678998643483,228.9023307436182 928.3357257368357,243.5305216426193 980,252 C 1031.6642742631643,260.4694783573807 1054.5249969170056,262.7802441731409 1105,248 C 1155.4750030829944,233.21975582685909 1233.5642865951413,201.3485016648169 1294,196 C 1354.4357134048587,190.6514983351831 1397.2178567024293,211.82574916759154 1440,233 C 1440,233 1440,700 1440,700 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stopColor="#ff6900"></stop><stop offset="95%" stopColor="#fcb900"></stop></linearGradient></defs><path d="M 0,700 C 0,700 0,466 0,466 C 43.03327167344925,443.2100135651745 86.0665433468985,420.420027130349 143,438 C 199.9334566531015,455.579972869651 270.76709828585524,513.5299050437785 325,540 C 379.23290171414476,566.4700949562215 416.86506350968057,561.4603526945369 469,552 C 521.1349364903194,542.5396473054631 587.7726476754224,528.6286841780739 641,497 C 694.2273523245776,465.3713158219262 734.0443457886298,416.0249105931681 789,409 C 843.9556542113702,401.9750894068319 914.049969170058,437.271673449254 968,446 C 1021.950030829942,454.728326550746 1059.7557775311382,436.8883956098162 1104,447 C 1148.2442224688618,457.1116043901838 1198.926920705389,495.17474411148106 1256,503 C 1313.073079294611,510.82525588851894 1376.5365396473055,488.4126279442595 1440,466 C 1440,466 1440,700 1440,700 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>     
      <div className="dog-card">
        <h1>{dogData.name}</h1>
        <div className="heart-dogs" onClick={handleLike}>{like ? '❤️' : '🤍'}</div>
        <img
          className="img-dog-card"
          alt=""
          src={loadImage(`./id${params.id}.jpg`)}
        ></img>
        {infoProtect.name}
        <div className="dog-data">
        <h3 className="location"><IoLocationSharp/>{data[indexProtectora].city}</h3>
          <br />
          <h3>Detalles: <Link to={"/main"} className='adoptame'> Adoptame </Link></h3>
          <br/>
          <p>Edad: {dogData.age} </p>
          <p>Raza: {dogData.breed.toString()} </p>
          <p>Sexo: {dogData.gender} </p>
          <p>Tamaño: {dogData.size} </p>
          <p>Pelo: {dogData.coatLength} </p>
        </div>
        <br/>
        <h3>Descripcion: </h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div className="links-dog">
        <Link to={"/main"} className='regresar'> Regresar </Link>
        </div> 
    </div>
   
  );
}


export default Dogs;
