import React, {useState, useEffect} from "react";
import {Doughnut} from "react-chartjs-2";
import "./Doughnut.css";
import axios from "axios";

function DoughNut({countryName}) {

  const [covidData, setCovidData] = useState({});

  useEffect(() => {
    if(countryName === 'worldwide'){
        axios.get(`https://disease.sh/v3/covid-19/all`)
        .then(res => {
          setCovidData(res.data);
        })
    }
    else{
      axios.get(`https://disease.sh/v3/covid-19/countries/${countryName}`)
        .then(res => {
          setCovidData(res.data);
        })
    }
  }, [countryName])

  console.log(covidData);
  const data = {
    labels: ["cases", "recovered","deaths"],
    datasets: [
      {
        label: "cases",
        data: [covidData.recovered,covidData.cases,covidData.deaths],
        backgroundColor: [
          '#cc1034',
          'greenyellow',
          'red'
        ]
      }
      
    ]
  };

  return (
    <div className="donut">
      <h2> {countryName}</h2>  
      <Doughnut  data={data} />
    </div>
  );
}

export default DoughNut;
