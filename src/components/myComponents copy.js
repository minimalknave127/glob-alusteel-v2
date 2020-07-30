import React from 'react';
import styled from 'styled-components';

const ButtonStyles = styled.div`
       .btn, button{
            background-color: ${props => props.background};
            color: ${props => props.color};
            padding: 8px 14px;
            font-size: 16px;
            border: none;
            -webkit-box-shadow: 0px 6px 34px -2px rgba(0,0,0,0.39);
            -moz-box-shadow: 0px 6px 34px -2px rgba(0,0,0,0.39);
            box-shadow: 0px 6px 34px -2px rgba(0,0,0,0.39);
            border-radius: 2rem;
            outline: none;
       }
        
`;
const SendStyles = styled.div`

    div{
        overflow: hidden;
    }
    img{
        width: 20px;
    }
    .send span{
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.3s;
    }
    .send span::before{
        content: "";
        background-image: url(${require("../media/icons/send.svg")});
        background-size: 25px;
        background-repeat: no-repeat;
        position: absolute;
        opacity: 1;
        top: 0;
        left: 150%;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        transition: 0s;
        width: 25px; height: 25px;
        z-index: 10;
    }
    .send:hover span{
        transform: translateX(-125%);
    }
    .send:hover span::before{
        opacity: 1;
    }
`;

export const MyButton = (props) => {
   const variant = props.variant;
   let background = undefined;
   let color = undefined;
   if(variant == "primary"){
       background = "rgb(3,80,153)";
       color = "white";
   }

   return(
    <ButtonStyles background={background} color={color}>
        <button className={props.className}>{props.children}</button>
    </ButtonStyles>
   )
}
export const MySend = (props) => {
    const variant = props.variant;
    let background = undefined;
    let color = undefined;
    if (variant == "primary") {
        background = "rgb(3,80,153)";
        color = "white";
    }

    return (
        <ButtonStyles background="rgb(3,80,153)" color="white">
            <SendStyles background={background} color={color}>
                <button onClick={props.onClick} className={props.className + " send"}><span>{props.children}</span></button>
            </SendStyles>
        </ButtonStyles>
    )
}