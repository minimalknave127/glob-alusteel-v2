import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FormControl, InputGroup, Button } from 'react-bootstrap';

const Styles = styled.div`

    #chat{
        max-height: 500px;
        overflow-y: scroll;
        padding: 1vw;
        background-color: rgb(213, 221, 228);
    }
    .chat-post{
        display: flex;
        flex-direction: row;
        align-items: top;
        width: 100%;
    }
    .chat-text{
        max-width: 100%;
        font-size: 14px;
        word-break: break-all
    }
    .left > img{
        width: 50px;
        display: block;
        height: 50px;       
    }
    .time{
        font-size: small;
        font-weight: 600;
    }
    .right{
        display: block;
        width: 100%;
    }
    .right > img{
        display: none;
    }
    .right > div{
        max-width: 45%;
        display: block;
        
        color: white !important;
    }
    .right > div > div{
        background-color: #035099;
    }
    .right > div > div > .chat-name{
        display: none !important;
    }
    .right > div > .chat-text{
        margin: 0;
        width: fit-content;
        max-width: 90%;
    }
    .right{
        float: right;
    }
    .right > div{
        float: right;
    }
    .right .time{
        color: black;
        text-align: right;
    }
`;

class Chat extends React.Component{
    constructor(){
        super();
    }
    componentDidMount(){
        const element = document.getElementById('chat');
        element.scrollTop = element.scrollHeight;
    }
    render(){
        return(
                <Styles>
                    <section id="chat" className="container">
                       <div className="left chat-post mb-4">
                            <img src={require("../media/icons/profile.svg")}/>
                            <div className="ml-4">
                                <h5 className="chat-name">Tadeas Simandl</h5>
                                <p className="chat-text">us velit.</p>
                                <p className="time pt-3">1.2. | 20:00</p>
                            </div>   
                       </div>
                    <div className="right chat-post mb-4">
                        <img src={require("../media/icons/profile.svg")} />
                        <div>
                            <div className="p-3">
                                <h5 className="chat-name">Tadeas Simandl</h5>
                                <p className="chat-text">Ok. Vyřídím</p>
                            </div>
                            <p className="time pt-3">1.2. | 20:00</p>
                        </div>
                    </div>
                    <div className="left chat-post mb-4">
                        <img src={require("../media/icons/profile.svg")} />
                        <div className="ml-4">
                            <h5 className="chat-name">Tadeas Simandl</h5>
                            <p className="chat-text">us velit.</p>
                            <p className="time pt-3">1.2. | 20:00</p>
                        </div>
                    </div>
                    <div className="right chat-post mb-4">
                        <img src={require("../media/icons/profile.svg")} />
                        <div>
                            <div className="p-3">
                                <h5 className="chat-name">Tadeas Simandl</h5>
                                <p className="chat-text">Ok. Vyřídímssssssssssssssssssssssssssssssssssssssssssssssss</p>
                            </div>
                            <p className="time pt-3">1.2. | 20:00</p>
                        </div>
                    </div>
                       <div className="right chat-post mb-4">
                            <img src={require("../media/icons/profile.svg")}/>
                            <div>
                                <div className="p-3">
                                    <h5 className="chat-name">Tadeas Simandl</h5>
                                    <p className="chat-text">Ok.</p>
                                </div>
                                <p className="time pt-3">1.2. | 20:00</p>
                            </div>   
                       </div>
                    </section>
                <div className="chat-input">
                    <InputGroup>
                        <FormControl placeholder="Napište zprávu..." type="text" />
                        <InputGroup.Append>
                            <Button variant="primary">Odeslat</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                </Styles>
        )
    }
}
export default Chat;