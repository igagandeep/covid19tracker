import React from "react";
import {Doughnut} from "react-chartjs-2";
import "./Test.css";

function Test({ countryInfo}) {

  console.log(countryInfo);
  const data = {
    labels: ["cases", "recovered","deaths"],
    datasets: [
      {
        label: "cases",
        data: [countryInfo.cases, countryInfo.recovered,countryInfo.deaths],
        backgroundColor: [
          'red',
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

export default Test;
