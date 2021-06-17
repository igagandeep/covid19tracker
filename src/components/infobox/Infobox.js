import React from 'react'
import {Card, CardContent, Typography}  from '@material-ui/core';
import './Infobox.css';

const Infobox = ({title, cases, total, style,active,isRed, ...props})  => {
    return (
        <>
            <Card  onClick={props.onClick} className={`info ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
                <CardContent>
                    <Typography className="title" color="textSecondary">{title}</Typography>
                    <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}> {cases}</h2>
                    <Typography className="infoBox__total">{total} Total</Typography>
                </CardContent>
            </Card>
           
        </>
        
    )
}

export default Infobox;

