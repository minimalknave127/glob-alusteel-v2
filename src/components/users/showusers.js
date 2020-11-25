import React from 'react';
import styled from 'styled-components';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, toast, ToastContainer, MDBIcon } from 'mdbreact';
import axios from 'axios';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import { Link } from 'react-router-dom';

import RegisterUser from './createuser';

import '../../css/transform-users.css';

const Styles = styled.div`
    .wrapper-users{
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
    .tools > img, .tools > a > img{
        cursor: pointer;
        width: 20px;
        margin: 0 8px;
        filter: brightness(0%);
    }

`;

export default class ShowUsers extends React.Component{
    constructor(){
        super();
        this.state = {
            users: [],
            newUser: false
        }

        this.success = this.success.bind(this);
    }
    success(){
        this.setState({
            newUser: false
        }, () => {
            toast.success(<span className="p-2"><MDBIcon className="mr-2" icon="info-circle" />Povedlo se!</span>);
        })
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
                    <ToastContainer hideProgressBar />
                    <SwitchTransition mode="out-in">
                        <CSSTransition 
                            key={this.state.newUser} 
                            classNames='transform'
                            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}>
                           {this.state.newUser ? 
                           
                           <RegisterUser done={() => this.setState({ newUser: false })} success={this.success} />
                           :
                                <section className="mt-5 container-fluid myCard p-5">
                                    <div>
                                        <MDBBtn className="rounded-pill mb-5" color="primary" onClick={() => this.setState({ newUser: true })}>Přidat uživatele</MDBBtn>
                                    </div>
                                    <div className="wrapper-users">
                                        {(this.state.users.length > 0) ?
                                            this.state.users.map((user, index) => {
                                                const name = user[2];
                                                const matches = name.match(/\b(\w)/g);
                                                const iconName = matches.join('');
                                                return <MDBCard className="z-depth-0 p-4 m-3" key={index} style={{ width: "17rem" }}>
                                                    <div className="pfp">
                                                        <h4>{iconName}</h4>
                                                    </div>
                                                    <MDBCardBody>
                                                        <MDBCardTitle className="user-title">{name}</MDBCardTitle>
                                                        <MDBCardText className="user-text">
                                                            Admin
                                                    </MDBCardText>
                                                        <MDBCardText className="user-text tools">
                                                            <Link to={{
                                                                pathname: '/users/profile',
                                                                state: {
                                                                    user: user
                                                                }
                                                            }}>
                                                                <img src={require("../../media/ui/001-account.svg")} alt="edit icon" />
                                                            </Link>
                                                            <img src={require("../../media/ui/004-chat.svg")} alt="edit icon" />
                                                            <img src={require("../../media/ui/010-edit.svg")} alt="edit icon" />

                                                        </MDBCardText>
                                                    </MDBCardBody>
                                                </MDBCard>
                                            })
                                            :
                                            null}
                                    </div>
                                </section>
                            }
                        </CSSTransition>
                    </SwitchTransition>
                </Styles>
            </React.Fragment>
        )
    }
}