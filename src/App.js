import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/header/Header';
import axios from 'axios';

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

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
        console.log(res.data);
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
    setCountry(countryCode);
}

  return (
    <div className="App">
      <Header  country={country} countries={countries} onCountryChange={onCountryChange}/>
    </div>
  );
}

export default App;
