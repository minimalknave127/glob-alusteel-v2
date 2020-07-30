import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FormControl } from 'react-bootstrap';
import { MySend } from '../components/myComponents';
import { MyContext } from '../components/userdata';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import '../test.css';

const Styles = styled.div`
    #chat{
        -webkit-box-shadow: 0px 0px 34px 12px rgba(0,0,0,0.19);
        -moz-box-shadow: 0px 0px 34px 12px rgba(0,0,0,0.19);
        box-shadow: 0px 0px 34px 12px rgba(0,0,0,0.19);
        border-radius: 1rem;
    }
    .chat-info{
        width: 100%;
        height: 60px;
        display: flex;
        flex-directon: row;
        justify-content: space-between;
        align-items: center;
    }
    #scroll-control{
        max-height: 50vh;
        overflow-y: scroll;
        padding: 20px;
        transform: all 0.3s;
    }
    .chat-wrapper-right{
        display: flex;
        justify-content: flex-end;
    }
    .chat-div{
        background-color: #CCCCCC;
        max-width: 90%;
        width: fit-content;
        padding: 20px;
        border-radius: 1rem;
        transform: all 0.3s;
    }
    .chat-top-text{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .chat-top-text > *{
        font-size: 13px;
    }
    .chat-text > p{
        word-break: break-all;
    }
    .right{
        background-color: rgb(3,80,153) !important;
    }
    .right > *{
        color: white !important;
    }
    #chat-input{
        margin: 0 auto;
    }
    #chat-input > *{
        display: inline-block !important;
        vertical-align: bottom;
    }
    .chat-textarea{
        width: 70%;
        overflow: auto;
        resize: none;
        height: 100px;
    }
`;

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderInfo: [],
            userMessage: "",
            messages: []
        }
        this.handleLoad = this.handleLoad.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    static contextType = MyContext;

    handleChange(data){
        this.setState({
            userMessage: data.target.value
        })
    }

    handlePost(){
        const context = this.context;
        const url = "http://localhost:80/react-backend/handlemessages.php";
        let formData = new FormData();

        formData.append('action', 'create');
        formData.append('orderId', this.state.orderInfo[0]);
        formData.append('userId', context.id);
        formData.append('authorName', context.name);
        formData.append('messageText', this.state.userMessage);
        formData.append("key", "156165106as51da16f1ds0f121df032s10f3s49a");
        axios.post(url, formData)
        .then(res => {
            this.setState({
                userMessage: ""
            })
            this.handleLoad();
            this.scrollUpdate();
        })
        .catch(err => {
            console.log(err);
        })
    }
    handleLoad(){
        console.log(this.state.orderInfo[0]);
        const url = "http://localhost:80/react-backend/handlemessages.php";
        let formData = new FormData();

        formData.append('action', 'load');
        formData.append('orderId', this.state.orderInfo[0]);
        formData.append("key", "156165106as51da16f1ds0f121df032s10f3s49a");

        axios.post(url, formData)
        .then(res => {
                let changed = false;
                let messagesArray = this.state.messages;
                res.data.map((item) => {
                    if(messagesArray.length > 0){
                        let arrayContains = false;
                        for(let x = 0; x < messagesArray.length; x++){
                            if(messagesArray[x][0] === item[0]){
                                arrayContains = true;
                            }
                        }
                        if(!arrayContains){
                            messagesArray.push(item);
                            changed = true;
                        }
                    }else{
                        messagesArray.push(item);
                    }
                    return null;
                })
                this.setState({
                    messages: messagesArray
                },() => {
                    if(changed){
                        this.scrollUpdate();
                    }
                })
        })
        .catch(err => {
            console.log(err);
            console.log("errrrr");
        })
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.orderInfo !== this.state.orderInfo){
            this.setState({
                orderInfo: this.props.orderInfo
            }, () => {
                this.handleLoad();
            })
        }else if(prevState.messages !== this.state.messages){
            this.scrollUpdate();
        }
    }
    componentDidMount(){
        this.scrollUpdate = () => {
            setTimeout(() => {
                const scroll = document.getElementById('scroll-control');
                scroll.scrollTop = scroll.scrollHeight;
                // $("html, body").animate({ scrollTop: document.body.scrollHeight }, "slow");
            }, 50);
        }
        this.messageCheck = setInterval(this.handleLoad, 2000);
        this.handleLoad();
        this.scrollUpdate();
    }
    componentWillUnmount(){
        clearInterval(this.messageCheck);
    }
    render(){
        const context = this.context;
        return(
                <Styles>
                    <section id="chat" className="container">
                        <div className="chat-info px-3">
                            <h5>Chat</h5>
                            <h6>Objednávka <b>{this.state.orderInfo[1]}</b></h6>
                        </div>
                        <div id="scroll-control">
                            {/* //..............// */}


                                <TransitionGroup className="todo-list">
                                    {this.state.messages.map((message, index) => {
                                        let name = "Vy";
                                        let direction = "right";
                                        if (message[2] !== context.id) {
                                            name = message[3];
                                            direction = "left";
                                        }
                                        return <CSSTransition key={index} timeout={500} classNames="item">
                                            <div className={"chat-wrapper-" + direction} key={index}>
                                                <div className={"chat-div mb-3 " + direction}>
                                                    <div className="chat-top-text mb-3">
                                                        <h6>{name}</h6>
                                                        <h6>1.2 | 12:00</h6>
                                                    </div>
                                                    <div className="chat-text">
                                                        <p>{message[4]}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </CSSTransition>
                                    })}
                                </TransitionGroup>
                           

                            {/* //............// */}
                            {/* <div className="chat-div mb-3">
                                <div className="chat-top-text mb-3">
                                    <h6>Tadeáš Simandl</h6>
                                    <h6>1.2 | 12:00</h6>
                                </div>
                                <div className="chat-text">
                                    <p>Dobrý den, dasadsakfsjda  jksdflj dsfaf asdfafafasdadasdasdasdasddsdalskf lskafjlskdf</p>
                                </div>
                            </div>
                            <div className="chat-wrapper-right">
                                <div className="chat-div right mb-3">
                                    <div className="chat-top-text mb-3">
                                        <h6>Vy</h6>
                                        <h6>1.2 | 12:00</h6>
                                    </div>
                                    <div className="chat-text">
                                        <p>Dobrý den, dasadsakfsjda  jksdflj dsfaf asdfafafasdadasdasdasdasddsdalskf lskafjlskdf</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="chat-div mb-3">
                                    <div className="chat-top-text mb-3">
                                        <h6>Tadeáš Simandl</h6>
                                        <h6>1.2 | 12:00</h6>
                                    </div>
                                    <div className="chat-text">
                                        <p>Dobrý den, dasadsakfsjda  jksdflj dsfaf asdfafafasdadasdasdasdasddsdalskf lskafjlskdf</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="chat-div mb-3">
                                    <div className="chat-top-text mb-3">
                                        <h6>Tadeáš Simandl</h6>
                                        <h6>1.2 | 12:00</h6>
                                    </div>
                                    <div className="chat-text">
                                        <p>Dobrý den, dasadsakfsjda  jksdflj dsfaf asdfafafasdadasdasdasdasddsdalskf lskafjlskdf</p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="p-3" id="chat-input">
                            <FormControl value={this.state.userMessage} onChange={(text) => this.handleChange(text)} className="chat-textarea mr-3" as="textarea"/>
                            <MySend onClick={this.handlePost} variant="primary">Odeslat</MySend>
                        </div>
                    </section>
                </Styles>
        )
    }
}
export default Chat;