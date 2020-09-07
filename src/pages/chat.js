import React from 'react';
import '../css/chat.css';
import { MDBCol, MDBIcon, MDBInput, MDBBtn } from 'mdbreact';
import Axios from 'axios';
import { MyContext } from '../components/userdata';

export default class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            input: ''
        }

        this.send = this.send.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    static contextType = MyContext;
    handleInputChange(data){
        this.setState({
            input: data
        },
        () => {
            console.log(this.state.input);
        })
    }
    send(){
        const context = this.context;
        const key = "156165106as51da16f1ds0f121df032s10f3s49a";
        const url = "http://localhost:80/react-backend/handlemessages.php";
        let formData = new FormData();
        formData.append('action', 'privateMessage');
        formData.append('subAction', 'send');
        formData.append('text', this.state.input);
        formData.append('chatId', 10);
        formData.append('authorId', context.id);
        formData.append('authorName', context.name);
        formData.append('key', key);
        Axios.post(url, formData)
        .then(res => {
            console.log(res);
            this.setState({
                input: ''
            })
        })
        .catch(err => {
            console.log(err);
        })

    }

    render(){
        return(
            <React.Fragment>
                <h3 className="nadpis">Chat</h3>
                    <section className="chatApp">
                        <div id="chats-panel" className="p-4">
                            <form className="form-inline mt-4 mb-4">
                                <MDBIcon icon="search" />
                                <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Hledejte..." aria-label="Search" />
                            </form>
                            <div className="chat-card p-4">
                                <div className="chat-card-img">
                                    <h4>TS</h4>
                                </div>
                                <div className="chat-card-info pl-2">
                                    <h5>Tadeáš Simandl</h5>
                                    <p>před 5 min.</p>
                                </div>
                            </div>
                            <div className="chat-card-active p-4 z-depth-2">
                                <div className="chat-card-img">
                                    <h4>TS</h4>
                                </div>
                                <div className="chat-card-info pl-2">
                                    <h5>Tadeáš Simandl</h5>
                                    <p>před 5 min.</p>
                                </div>
                            </div>
                            <div className="chat-card p-4">
                                <div className="chat-card-img">
                                    <h4>TS</h4>
                                </div>
                                <div className="chat-card-info pl-2">
                                    <h5>Tadeáš Simandl</h5>
                                    <p>před 5 min.</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div id="app-chat">
                                <div id="bar" className="p-3">
                                    <h4>Tadeáš Simandl</h4>
                                </div>
                                <div id="chat-messages" className="p-3">
                                    <div className="chat-message-left mb-3">
                                        <div className="p-3">
                                            <p className="chat-message-name">Tadeáš Simandl</p>
                                            <p className="chat-message-text">asssssssssas dsddksad asdasad asd adasdsads asd asd asd asdasfdf sf jsk jsdk jkskdj </p>
                                        </div>
                                    </div>
                                    <div className="chat-message-left mb-3">
                                        <div className="p-3">
                                            <p className="chat-message-name">Tadeáš Simandl</p>
                                            <p className="chat-message-text">asssssssssas dsddksad asdasad asd adasdsads asd asd asd asdasfdf sf jsk jsdk jkskdj </p>
                                        </div>
                                    </div>
                                    <div className="chat-message-right mb-3">
                                        <div className="p-3">
                                            <p className="chat-message-name">Vy</p>
                                            <p className="chat-message-text">asssssssssas dsddksad asdasad asd adasdsads asd asd asd asdasfdf sf jsk jsdk jkskdj </p>
                                        </div>
                                    </div>
                                    <div className="chat-message-left mb-3">
                                        <div className="p-3">
                                            <p className="chat-message-name">Tadeáš Simandl</p>
                                            <p className="chat-message-text">asssssssssas dsddksad asdasad asd adasdsads asd asd asd asdasfdf sf jsk jsdk jkskdj </p>
                                        </div>
                                    </div>
                                <div className="chat-message-left mb-3">
                                    <div className="p-3">
                                        <p className="chat-message-name">Tadeáš Simandl</p>
                                        <p className="chat-message-text">asssssssssas dsddksad asdasad asd adasdsads asd asd asd asdasfdf sf jsk jsdk jkskdj </p>
                                    </div>
                                </div>
                                <div className="chat-message-left mb-3">
                                    <div className="p-3">
                                        <p className="chat-message-name">Tadeáš Simandl</p>
                                        <p className="chat-message-text">asssssssssas dsddksad asdasad asd adasdsads asd asd asd asdasfdf sf jsk jsdk jkskdj </p>
                                    </div>
                                </div>
                                </div>
                                
                            </div>
                        <div id="chat-bottom-panel" className="p-5">
                            <div>
                                {/* <MDBIcon icon="image" size="1x"/> */}
                                <input
                                    type="text"
                                    className="form-control"
                                    id="formGroupExampleInput"
                                    placeholder="Napište zprávu..."
                                    onChange={(text) => this.handleInputChange(text.target.value)}
                                    value={this.state.input}
                                />
                                <h6 style={{ float: "right", cursor: "pointer", fontWeight: 600 }} className="pt-2" id="chat-send" onClick={this.send}>Odeslat</h6>
                            </div>
                        </div>
                        </div>
                        {/* <div id="chat-info">
                            
                        </div> */}
                    </section>
            </React.Fragment>
        )
    }
}