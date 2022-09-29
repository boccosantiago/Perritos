import React, { useState } from "react";
import Card from "../Components/Card";
import Filter from "../Components/Filter";
import "../styles/DogSearch.css";

function DogSearch() {
  const [filterData, setFilterData] = useState({
    name: "",
    age: "",
    city: "",
    gender: "",
    breed: "",
    size: "",
    color: "",
    coat: "",
  });
  return (
    <div className="container-main bg-stone-100	">
      <Filter setFilterData={setFilterData} filterData={filterData} />
      <Card filterData={filterData} />
    </div>
  );
}

export default DogSearch;
