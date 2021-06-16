import React from 'react';
import  './Header.css';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import logo from '../../assets/logo (2).png';

const  Header = ({countries,country, onCountryChange}) =>  {
    
    return (
        <header>
            <div className="logo">
                <img src={logo} width="300px" alt="logo"/>
            </div>
            <div className="countries__list">
                <FormControl className="countries__list__dropdown">
                    <Select labelId="label" variant="outlined"  id="select" value={country} onChange={onCountryChange}>
                                    {/* Worldwide data */}
                    <MenuItem  value="worldwide">Worldwide</MenuItem>
                        {
                            countries.map(country => (    
                                <MenuItem   value={country.value}>{country.name}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
        </header>
     )
}

export default Header
