import React from 'react'
import {Card, CardContent}  from '@material-ui/core';
import './Infobox.css';

const Infobox = ()  => {
    return (

        <Card className="info">
            <CardContent>
                <h2>Deaths</h2>
                <p>Cases: 15498711552</p>
                <p>Total :12m</p>
            </CardContent>
        </Card>
    )
}

export default Infobox;

