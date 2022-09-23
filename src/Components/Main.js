import React, { useState } from "react";
import Card from "./Card";
import Filter from "./Filter";
import "../styles/Main.css";


function Main() {

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
        <div className="container-main bg-stone-100	">
            <Filter setFilterData={setFilterData} />
            <Card filterData={filterData} />
        </div>
    )
}

export default Main;