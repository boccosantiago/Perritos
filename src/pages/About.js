import React from "react";
import catsdogs from "../catsdogs.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import "../styles/Card.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: catsdogs.Respuesta.Titulo,
    },
  },
};

const catdog = catsdogs.Respuesta.Datos.Metricas[0].Datos;
const dogs = catsdogs.Respuesta.Datos.Metricas[1].Datos;


const year = catdog.map((i) => i.Agno);
const quantityAll = catdog.map((i) => i.Valor);
const quantityDogs = dogs.map((i) => i.Valor);


const labels = year;

export const data = {
  labels,
  datasets: [
    {
      label: "España",
      data: quantityAll,
      backgroundColor: "rgba(92, 92, 255, 0.5)",
    },
    {
      label: "Nuestras protectoras",
      data: quantityDogs,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  
  ],
};

export const dataCircle = {
  labels: ["Perros", "Gatos", "Otros"],
  datasets: [
    {
      label: "",
      data: [1833, 1288, 255],
      backgroundColor: [
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function About() {
  return (
    <div className="bg-stone-100">
    <div className="mx-auto w-full sm:w-4/6">
      <br />
      <h1 className="text-xl bold text-center">¿Quiénes somos?</h1>
      <p className="text-justify text-stone-600 mx-10">
        Somos una plataforma de adopción de animales, cuyo fin es ayudar a las
        protectoras a dar visibilidad en internet a sus animales. 
      </p>
      <p className="text-justify text-stone-600 mx-10">
        Alrededor de 280.000 perros y gatos fueron abandonados o se perdieron en
        2020 en España, según las estimaciones elaboradas por la Fundación Affinity. Por eso nuestra misión es trabajar por
        y para los animales sin hogar.
      </p>
      <br />
      <h1 className="text-xl bold text-center">
        Animales recogidos en España y animales recogidos por nuestras protectoras.
      </h1>
      <br />
      <div className="sm:m-auto mx-10">
        <Bar options={options} data={data} />
      </div>
      <br />
      <h1 className="text-xl bold text-center">
        Relación de animales recogidos por nuestras protectoras.
      </h1>
      <br />
      <div className="md:w-2/4 sm:mx-auto mx-10">
        <Doughnut data={dataCircle} />
      </div>
      <br />
    </div>
    </div>
  );
}
