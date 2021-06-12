import React from 'react'
import {Card, CardContent, Typography}  from '@material-ui/core';
import './Infobox.css';

const Infobox = ({title, cases, total, style,active,isRed, ...props})  => {
    console.log(active)
    return (
        <>
            <Card  onClick={props.onClick} className={`info ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
                <CardContent>
                    <Typography color="textSecondary">{title}</Typography>
                    <h2 className={`infoBox--cases ${!isRed && 'infoBox--green--cases'}`}> {cases}</h2>
                    <Typography className="infoBox__total">{total} Total</Typography>
                </CardContent>
            </Card>
           
        </>
        
    )
}

export default Infobox;

