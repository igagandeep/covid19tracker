import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Line} from 'react-chartjs-2';
import './LineChart.css';


// This function build the line chart data accoridng to caseType
const buildCharData = (data, caseType) => {
    let charData = [];
    let lastDataPoint;
    for(let date in data.cases){
        if(lastDataPoint){
            let newDataPoint = {
                x : date,
                y :  data[caseType][date]-lastDataPoint
            }
            charData.push(newDataPoint);
        }
        lastDataPoint = data[caseType][date];
    }
    return charData;
}


function LineChart({caseType, countryName}) {
    const [covidData, setCovidData] = useState({});
    useEffect(() => {
        const  getData = async() =>  {
            // If countryName is worldwide then it will show all the global data in line chart
            if(countryName === 'worldwide'){
                await axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`)
                .then(res => {
                let charData = buildCharData(res.data, caseType);
                setCovidData(charData);
                });
            }
            // If countryName is specific then it will show all the country data in line chart
            else{
                await axios.get(`https://disease.sh/v3/covid-19/historical/${countryName}?lastdays=120`)
                .then(res => {
                let charData = buildCharData(res.data.timeline, caseType);
                setCovidData(charData);
                });
            }     
        }
        // calling the async function
        getData();
    }, [caseType, countryName]);

    return (
        <div>
            {covidData.length > 0 &&(
                <Line className="lineGraph" data={{        
                    datasets: [
                    {
                        label:caseType,
                        backgroundColor: "rgba(204, 16, 52, 0.5)",
                        borderColor: "#CC1034",
                        data: covidData,
                    }
                    ],
            }}
          />
            )}
        </div>
    )
}
export default LineChart;

