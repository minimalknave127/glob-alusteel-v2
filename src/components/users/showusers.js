import React from 'react';
import styled from 'styled-components';
import { MDBBtn, MDBCard, MDBCardBody,MDBCardTitle, MDBCardText } from 'mdbreact';
import axios from 'axios';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import RegisterUser from './createuser';

import '../../css/transform-users.css';

const Styles = styled.div`
    section{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
    }
    .user-title{
        text-align: center;
        font-weight: 700 !important;
        font-size: 18px;
    }
    .pfp{
        width: 100px;
        height: 100px;
        background-color: #035099;
        margin: 0 auto;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pfp > h4{
        color: white;
        font-weight: 700;
    }
    .user-text{
        text-align: center;
    }
    .tools > img{
        cursor: pointer;
        width: 20px;
        margin: 0 8px;
        filter: brightness(0%);
    }
    .add-user{
       float: right;
        margin: 10px;
    }


`;

export default class ShowUsers extends React.Component{
    constructor(){
        super();
        this.state = {
            users: [],
            newUser: false
        }

    }
    componentDidMount(){
        let key = new FormData();
        key.append('key', '156165106as51da16f1ds0f121df032s10f3s49a');
        const url = 'http://localhost:80/react-backend/loadusers.php';
        axios.post(url, key)
            .then(res => {
                console.log(res.data);
                this.setState({
                    users: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    render(){
        return(
            <React.Fragment>
                <Styles>
                    <SwitchTransition mode="out-in">
                        <CSSTransition 
                            key={this.state.newUser} 
                            classNames='transform'
                            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}>
                           {this.state.newUser ? 
                           
                           <RegisterUser done={() => this.setState({ newUser: false })} />
                           :
                                <section className="mt-5 container-fluid myCard p-5">
                                    {(this.state.users.length > 0) ?
                                        this.state.users.map((user, index) => {
                                            const name = user[1];
                                            const matches = name.match(/\b(\w)/g);
                                            const iconName = matches.join('');
                                            return <MDBCard className="z-depth-0"  key={index} style={{ width: "17rem" }}>
                                                <div className="pfp">
                                                    <h4>{iconName}</h4>
                                                </div>
                                                <MDBCardBody>
                                                    <MDBCardTitle className="user-title">{user[1]}</MDBCardTitle>
                                                    <MDBCardText className="user-text">
                                                        Admin
                                                    </MDBCardText>
                                                    <MDBCardText className="user-text tools">
                                                        <img src={require("../../media/ui/001-account.svg")} alt="edit icon" />
                                                        <img src={require("../../media/ui/004-chat.svg")} alt="edit icon" />
                                                        <img src={require("../../media/ui/010-edit.svg")} alt="edit icon" />

                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        })
                                        :
                                        null}
                                        <MDBBtn className="add-user rounded-pill float-right" color="primary" onClick={() => this.setState({ newUser: true })}>Přidat uživatele</MDBBtn>
                                </section>
                            }
                        </CSSTransition>
                    </SwitchTransition>
                </Styles>
            </React.Fragment>
        )
    }
}