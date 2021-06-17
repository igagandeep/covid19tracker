import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {prettyPrintStat} from "./util";
import numeral from 'numeral';
import './App.css';
import Header from './components/header/Header';
import Infobox from './components/infobox/Infobox';
import LineChart from './components/charts/LineChart';
// import Test from './components/charts/test';
import {Card, CardContent, Typography}  from '@material-ui/core';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [countryName, setCountryName] = useState("worldwide");
  const [countryInfo, setCountryInfo]  = useState({});
  const [caseType, setCaseType] = useState('cases');
  
  // This hook will render the global data
  useEffect(() => {
    axios.get(`https://disease.sh/v3/covid-19/all`)
    .then(res => {
      console.log(res.data);
      setCountryInfo(res.data);
    })
  }, []);


  useEffect(() => {
        //  This function will show list of countries data
    const getCountriesData = () => {
      axios.get(`https://disease.sh/v3/covid-19/countries`)
      .then(res => {
        const countries = res.data.map(country => ({
            name : country.country,
            value : country.countryInfo.iso2,
        }))
        setCountries(countries);
      })
      .catch(error => {
        console.log(error);
      })    
    }
    getCountriesData();
  }, []);

// This function will select the specific country and changes info accordingly
const onCountryChange = (e) => {
    const countryCode = e.target.value;
    if(countryCode === 'worldwide'){
      axios.get(`https://disease.sh/v3/covid-19/all`)
      .then(res => {
        setCountryName("worldwide");
        setCountryInfo(res.data)
    })
    } else{
      axios.get(`https://disease.sh/v3/covid-19/countries/${countryCode}`)
      .then(res => {
        setCountryName(res.data.country);
        setCountryInfo(res.data);
    })
    } 
    setInputCountry(countryCode);
}

  return (
    <div className="App">
    <div className="app__left">
      <Header   country={country} countries={countries} onCountryChange={onCountryChange}/>
      <div className="app__stats">
        <Infobox  
                onClick={(e) => { setCaseType('cases') }} 
                title="Coronavirus Cases" 
                active = {caseType === 'cases'}
                isRed
                cases={prettyPrintStat(countryInfo.todayCases)}
                total = {numeral(countryInfo.cases).format("0.0a")}
                style={{color:'red'}} 

        />
        <Infobox  
                onClick={(e) => { setCaseType('recovered') }}
                title="Recovered" 
                cases={countryInfo.todayRecovered}
                active = {caseType === 'recovered'}
                total = {numeral(countryInfo.recovered).format("0.0a")} 
                style={{color:'green'}}
        />
        <Infobox  
                onClick={(e) => { setCaseType('deaths') }}
                title="Deaths"
                isRed 
                active = {caseType === 'deaths'}
                cases={countryInfo.todayDeaths}
                total = {numeral(countryInfo.deaths).format("0.0a")} 
                style={{color:'red'}}
        />       
      </div>
      
      <div className="app__chart">
          <LineChart caseType={caseType}  countryName={countryName}/>
      </div>
      
      </div>

        {/* RIGHT SECTION OF THE APP */}

        <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            {/* <Table countries={tableData} /> */}
            {/* <h3>Worldwide new {casesType}</h3> */}
            {/* <LineGraph casesType={casesType} /> */}
          </div>
        </CardContent>
      </Card>



    {/* <Test countryInfo={countryInfo}/> */}

    </div>
  );
}



export default App;
