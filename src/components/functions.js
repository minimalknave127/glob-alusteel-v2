import React from 'react';

export const GetDate = (props) => {
    const dateInput = props.dateInput;
    const d = new Date(Date.parse(dateInput));
    return <>{d.getDate()+ "." + (d.getMonth() + 1) + " " + d.getFullYear() + "  " + d.getHours() + ":" + d.getMinutes()}</>
}
export const GetStatus = (props) => {
    let result = undefined;
    switch(props.status){
        case "0":
            result = <h5 className="text-warning popis">Nepřijata</h5>;
        break;
        case "1":
            result = <h5 className="text-info popis">V průběhu</h5>;
        break;
        case "2":
            result = <h5 className="text-warning popis">V průběhu</h5>;
        break;
        default:
            result = <h5 className="text-danger popis">Neznámý</h5>;
    }
    return result;
}