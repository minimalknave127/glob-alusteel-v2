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
        width: 25px;
    }
    .send{
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow: hidden;
    }
    .send span{
        transition: all 0.3s;
    }
    .send img{
        position: absolute;
        left: 100%;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        transition: all 0.3s;
    }
    .send:hover span{
        transform: translateX(-125%);
    }
    .send:hover img{
        left: 0;
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
                <div onClick={props.onClick} className={props.className + " send btn"}>
                    <span>{props.children}</span>
                    <img src={require("../media/icons/send.svg")} />
                </div>
            </SendStyles>
        </ButtonStyles>
    )
}