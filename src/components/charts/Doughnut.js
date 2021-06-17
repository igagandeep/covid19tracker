import React from "react";
import {Doughnut} from "react-chartjs-2";
import "./Doughnut.css";

function DoughNut({ countryInfo}) {

  console.log(countryInfo);
  const data = {
    labels: ["cases", "recovered","deaths"],
    datasets: [
      {
        label: "cases",
        data: [countryInfo.recovered,countryInfo.cases,countryInfo.deaths],
        backgroundColor: [
          '#cc1034',
          'greenyellow',
          'red'
        ]
      }
      
    ]
  };

  return (
    <div>
      <Doughnut className="donut" data={data} />
    </div>
  );
}

export default DoughNut;
