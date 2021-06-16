


import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import './LineChart.css';

// import numeral from "numeral";



const buildCharData = (data) => {
    let charData = [];
    for(let date in data){
        // if(lastDataPoint){
            let newDataPoint = {
                x : date,
                y :  data[date]
            }
            charData.push(newDataPoint);
        }
        // lastDataPoint = data[date];
    // }
    return charData;
}


function LineChart({caseType}) {
    const [covidCases, setCovidCases] = useState([]);
    const [covidRecovered, setCovidRecovered] = useState([]);
    const [covidDeaths, setCovidDeaths] = useState([]);
    
    useEffect(() => {
        axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(res => {
            console.log(res.data.cases);
            const charDataCases = buildCharData(res.data.cases);
            const charDataRecovered = buildCharData(res.data.recovered);
            const charDataDeaths = buildCharData(res.data.deaths);

            setCovidCases(charDataCases);
            setCovidRecovered(charDataRecovered);
            setCovidDeaths(charDataDeaths);
            
        
        })
        // console.log(covidData);
        
    }, []);

    return (
        <div >

        
        {covidCases.length > 0 &&(
                <Line className="lineGraph" data={{
                 labels: covidCases.map(data => (
                    data.x
                 )),    
            datasets: [
              {
                label:'Cases',
                backgroundColor: "blue",
                borderColor: "#CC1034",
                data: covidCases.map(data => (data.y) ),
              },
              {
                label:'Recovered',
                backgroundColor: "green",
                borderColor: "#CC1034",
                data: covidRecovered.map(data => (data.y) ),
              },
              {
                label:'Deaths',
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: covidDeaths.map(data => (data.y) ),
              },
            ],
          }} 
         
          />
            ) }
             
        </div>
    )
}

export default LineChart
