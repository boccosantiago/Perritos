import React,  { useState } from "react";
import { Link } from "react-router-dom";
import Card from "./Card";
import Filter from "./Filter";

function Main () {
    const [filterData, setFilterData] = useState({
        name: "",
        age: "",
        gender: "",
        breed: "",
        size: "",
        color: "",
        coat: ""
    })
return (
    <div>
        <Link to='/'><a>HOME</a></Link>
        <Filter setFilterData={setFilterData} />
        <Card filterData={filterData}/>
    </div>
)
}

export default Main;