import React from 'react';
import axios from 'axios';

export const GetDate = (props) => {
    const dateInput = props.dateInput;
    const d = new Date(Date.parse(dateInput));
    return <>{d.getDate()+ "." + (d.getMonth() + 1) + " " + d.getFullYear() + "  " + d.getHours() + ":" + d.getMinutes()}</>
}
export const GetStatus = (props) => {
    switch(props.status){
        case "0":
            return <h5 className="text-warning popis">Nepřijata</h5>;
        break;
        case "1":
            return <h5 className="text-info popis">V průběhu</h5>;
        break;
        case "2":
            return <h5 className="text-warning popis">V průběhu</h5>;
        break;
        default:
            return <h5 className="text-danger popis">Neznámý</h5>;
    }
}