import React from 'react';
import { MDBBtn, MDBInput } from 'mdbreact';
import styled from 'styled-components';

import axios from 'axios';

const Styles = styled.div`
    .pp{
        display: flex;
        align-items: center;
    }
    .pfp{
        width: 100px;
        height: 100px;
        background-color: #035099;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

    -webkit-box-shadow: 10px 26px 45px -26px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 26px 45px -26px rgba(0,0,0,0.75);
box-shadow: 10px 26px 45px -26px rgba(0,0,0,0.75);
    }
    .pfp > h4{
        color: white;
        font-weight: 700;
    }
`;

export default class UserProfile extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            formData: {
                name: '',
                email: '',
                role: '',
                verifyEmail: '',
                birthDate: '',
                degree: '',
                id: '',
                phone: '',
                password: ''
            },
            user: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(data) {
        console.log(data.id + ": " + data.value);
        const type = data.id;
        const value = data.value;

        this.setState((prevProps) => (
            {
                formData: {
                    ...prevProps.formData,
                    [type]: value
                }
            }
        ), () => {
            console.log(this.state.formData);
        })
    }
    handleSubmit(){
        const data = this.state.formData;
        const url = "http://localhost:80/react-backend/edit-user.php/";
        let formData = new FormData();
        formData.append('userId', this.props.location.state.user[0]);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('birthDate', data.birthDate);
        formData.append('degree', data.degree);
        formData.append('idNumber', data.id);
        formData.append('phone', data.phone);
        formData.append('role', data.role);
        formData.append('key', '156165106as51da16f1ds0f121df032s10f3s49a');
        
        axios.post(url, formData)
        .then(res => {
            console.log(res.data);

            if(res.data === "success"){
                let userData = this.state.user;
                userData[1] = this.state.formData.name;
                this.setState({
                    user: userData
                })
            }
        })
        .catch(err => {
            console.log("Error: " + err);
        })
    }
    componentDidMount() {
        const user = this.props.location.state.user;
        this.setState({
            user: this.props.location.state.user,
            formData: {
                name: user[1],
                email: user[2],
                role: '',
                verifyEmail: '',
                birthDate: user[5],
                degree: user[6],
                id: '',
                phone: user[8],
                password: ''
            }
        }, () => {
            console.log(this.state.user);
        })
    }
    render(){
        const user = this.props.location.state.user;
        const name = this.props.location.state.user[1];
        const matches = name.match(/\b(\w)/g);
        const iconName = matches.join('');
        return(
            <React.Fragment>
                <Styles>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }} className="mb-4">
                        <span><h4 className="mb-0 d-inline-block">Upravit profil</h4></span>
                        <span><MDBBtn className="rounded-pill" onClick={this.handleSubmit}>Uložit</MDBBtn></span>
                    </div>
                    <section className="myCard p-5">
                        <div className="wrapper">
                            <div className="pp mb-5">
                                <div className="pfp mr-3">
                                    <h4>{iconName}</h4>
                                </div>
                                <div>
                                    <h4>{this.state.user[1]}</h4>
                                    <p>Správce</p>
                                </div>
                            </div>
                            <form>
                                <div className="grey-text">
                                    <MDBInput label="Jméno a přijímení*" valueDefault={user[1]} icon="user" group type="text" validate error="wrong"
                                        success="right" id="name" onChange={(data) => this.handleChange(data.target)} />
                                    <MDBInput label="Email*" valueDefault={user[2]} icon="envelope" group type="email" validate error="wrong"
                                        success="right" id="email" onChange={(data) => this.handleChange(data.target)}/>
                                    <MDBInput style={{ color: 'rgb(73, 80, 87)'}} label="Datum narození" valueDefault={user[5]} icon="briefcase" group type="date" validate
                                        error="wrong" success="right" id="birthDate" onChange={(data) => this.handleChange(data.target)} />
                                    <MDBInput label="Titul" icon="briefcase" group type="text" validate
                                        error="wrong" success="right" valueDefault={user[6]} id="degree" onChange={(data) => this.handleChange(data.target)} />
                                    <MDBInput label="Číslo průkazu" icon="id-card" group type="number" validate
                                        error="wrong" success="right" id="id" onChange={(data) => this.handleChange(data.target)} />
                                    <MDBInput label="Tel. číslo" valueDefault={user[8]} icon="phone" group type="number" validate
                                        error="wrong" success="right" id="phone" onChange={(data) => this.handleChange(data.target)}  />

                                    <select defaultValue={user[4]} id="role" className="browser-default custom-select" onChange={(data) => this.handleChange(data.target)}>
                                        <option>Vyberte roli</option>
                                        <option value="admin">Administrátor</option>
                                        <option value="user">Uživatel</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </section>
                </Styles>
            </React.Fragment>
        )
    }
}