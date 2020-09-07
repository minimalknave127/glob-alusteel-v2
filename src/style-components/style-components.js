import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
    div{
        overflow: hidden;
        position: relative;
        width: 100%;
        height: 120px;
        display: none;
        justify-content: center;
        align-items: center;
    }
    div > h1{
        font-size: 60px !important;
    }
    img{
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: 0.8;
        
    }
`;

export const Title = (props) => {
    return(
        <Styles>
            <div className={props.className}>
                <h1 className="font-weight-bold">{props.title}</h1>
                <img src={require("../media/patternCustom.svg")} />
            </div>
        </Styles>
    )
}