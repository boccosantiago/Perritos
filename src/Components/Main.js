import React,  { useState } from "react";
import Card from "./Card";
import Filter from "./Filter";
import "../styles/Main.css";

function Main (props) {
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
    <div className="container-main">
        <Filter setFilterData={setFilterData} />
        <Card filterData={filterData} isLoggedIn ={props.isLoggedIn}/>
        <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 700" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stopColor="#fcb900"></stop><stop offset="95%" stopColor="#ff6900"></stop></linearGradient></defs><path d="M 0,700 C 0,700 0,233 0,233 C 78.61244019138758,264.311004784689 157.22488038277515,295.62200956937795 253,266 C 348.77511961722485,236.37799043062202 461.7129186602871,145.82296650717706 566,159 C 670.2870813397129,172.17703349282294 765.9234449760764,289.0861244019138 873,313 C 980.0765550239236,336.9138755980862 1098.5933014354066,267.8325358851675 1195,239 C 1291.4066985645934,210.1674641148325 1365.7033492822966,221.58373205741626 1440,233 C 1440,233 1440,700 1440,700 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%"><stop offset="5%" stopColor="#fcb900"></stop><stop offset="95%" stopColor="#ff6900"></stop></linearGradient></defs><path d="M 0,700 C 0,700 0,466 0,466 C 84.22966507177034,473.5406698564593 168.45933014354068,481.08133971291863 280,499 C 391.5406698564593,516.9186602870814 530.3923444976076,545.2153110047848 623,522 C 715.6076555023924,498.7846889952153 761.9712918660288,424.0574162679426 854,422 C 946.0287081339712,419.9425837320574 1083.7224880382776,490.555023923445 1189,510 C 1294.2775119617224,529.444976076555 1367.1387559808613,497.7224880382775 1440,466 C 1440,466 1440,700 1440,700 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
    </div>
)
}

export default Main;