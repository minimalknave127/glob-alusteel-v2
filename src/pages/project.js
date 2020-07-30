import React from 'react';
import { Redirect } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import styled from 'styled-components';
import { GetDate, GetStatus } from '../components/functions';

import Chat from '../components/chat';
import AdminSettings from '../components/adminsettings';

import { MyContext } from '../components/userdata';

const Styles = styled.div`
    #arrow{
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        width: fit-content;
    }
    #arrow:hover > img{
        transform: translateX(-8px);    
    }
    #arrow > h6{
        margin: 0;
        font-weight: 700;
    }
    #arrow > img{
        width: 16px;
        transition: all 0.3s;
    }
    .desc{

    }
    .color{
        color: #313131da;
    }
    .nadpis{
        font-weight: 700;
    }
    .popis{
        font-weight: 500;
    }
    #chat-section{
        width: 90%;
        overflow: hidden;
    }
`;


class Project extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            orderData: [],
            goBack: false,
            loadedContent: "chat"
        }

        this.goBack = this.goBack.bind(this);
        this.loadPage = this.loadPage.bind(this);
        this.handleSettingsChange = this.handleSettingsChange.bind(this);
    }
    static contextType = MyContext;
    goBack(){
        this.setState({
            goBack: true
        })
    }
    handleSettingsChange(data){
        this.setState({
            orderData: data
        })
    }
    loadPage(selected){
        this.setState({
            loadedContent: selected
        }, () => {
            console.log(this.state.loadedContent);
        })
    }
    componentDidMount(){
        if(this.props.location.state !== undefined){
            const orderData = this.props.location.state.orderData;
        this.setState({
            orderData: orderData
        }, () => {
                console.log(this.state.orderData);
            })
        }
    }
    render(){
        if(this.props.location.state === undefined){
            return <Redirect to="/" />
        }else{
            // Do if order data passed

            if(this.state.goBack){
                return <Redirect to="/"/>
            }
        }
        return(
            <React.Fragment>
                <Styles>
                    <div onClick={this.goBack} id="arrow">
                        <img className="mr-2" src={require('../media/icons/arrow.svg')} alt="arrow" />
                        <h6>Jít zpět</h6>
                    </div>
                    <section className="order mt-5">
                        <h2>Objednávka <b>{this.state.orderData[1]}</b></h2>
                        <div className="desc container mt-5">
                            <div>
                                <h5 className="nadpis color">Id objednávky</h5>
                                <p className="popis">{this.state.orderData[0]}</p>
                            </div>
                            <div>
                                <h5 className="nadpis color">Stav</h5>
                                <GetStatus status={this.state.orderData[6]}/>
                            </div>
                            <div>
                                <h5 className="nadpis color">Datum vytvoření</h5>
                                <p className="popis">{<GetDate dateInput={this.state.orderData[3]} />}</p>
                            </div>
                            <div>
                                <h5 className="nadpis color">Objednávku vytvořil</h5>
                                <p className="popis">{this.state.orderData[4]}</p>
                            </div>
                        </div>
                    </section>
                    <Nav variant="pills" defaultActiveKey="chat" onSelect={(selected) => this.loadPage(selected)}>
                        <Nav.Item>
                            <Nav.Link eventKey="chat">Chat</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="settings">Správa</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {/* <section id="chat-section" className="mt-5 container">
                        <Chat orderInfo={this.state.orderData}/>
                    </section> */}
                    {(this.state.loadedContent === "chat") ?
                        <section id="chat-section" className="mt-5 container">
                            <Chat orderInfo={this.state.orderData} />
                        </section>
                        : (this.state.loadedContent === "settings") ?
                            <section id="chat-section" className="mt-5 container">
                                <AdminSettings handleSettingsChange={(data) => { this.handleSettingsChange(data)}} orderData={this.state.orderData} status={this.state.orderData[6]} />
                            </section>
                            :
                            null
                    }
                </Styles>
            </React.Fragment>
        )
    }
}
export default Project;