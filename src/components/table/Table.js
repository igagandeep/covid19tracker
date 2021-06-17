import React from 'react';
import "./Table.css";

function Table({countries}) {

    return (
        <div className="table">
        <table >
            <tbody>
            {countries.map(country  => (
                <tr>
                    <td>{country.country}</td>
                    <td >{country.cases}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    )
}

export default Table
