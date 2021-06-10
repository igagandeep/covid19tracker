import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/header/Header';
import Infobox from './components/infobox/Infobox';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");

  useEffect(() => {
    axios.get(`https://disease.sh/v3/covid-19/all`)
    .then(res => {
      console.log(res.data);
      
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
        console.log(res.data);
    })
    } else{
      axios.get(`https://disease.sh/v3/covid-19/countries/${countryCode}`)
      .then(res => {
        console.log(res.data);
    })
    } 
    setInputCountry(countryCode);  
}

  return (
    <div className="App">
      <Header   country={country} countries={countries} onCountryChange={onCountryChange}/>
      <div className="app__stats">
        <Infobox />
        <Infobox />
        <Infobox />
      </div>
    </div>
  );
}

export default App;
