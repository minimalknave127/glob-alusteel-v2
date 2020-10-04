import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import styled from 'styled-components';
import axios from 'axios';

const Styles = styled.div`
    section{
        width: 100%;
    }
    form{
        margin: 0 auto;
    }
    //form > div:first-of-type{
        display: flex;
        flex-wrap: wrap;
    }
    form > div > .form-group{
        margin: 0 40px;
    }
    .cancel{
        cursor: pointer;
        font-weight: 700 !important;
    }
`;

export default class RegisterUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            formData: {
                name: '',
                email: '',
                verifyEmail: '',
                birthDate: '',
                degree: '',
                id: '',
                phone: '',
                password: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(data){
        console.log(data.id + ": " + data.value);
        const type = data.id;
        const value = data.value;

        this.setState((prevProps) => (
            {
                formData:{
                    ...prevProps.formData,
                    [type]: value
                }
            }
        ), () => {
            console.log(this.state.formData);
        })
    }
    handleSubmit(){
        const form= this.state.formData;
        if(form.email !== form.verifyEmail){
            alert("Email se neshoduje");
        }else{
            let formData = new FormData();
            const url = "http://localhost:80/react-backend/new-user.php";
            const key = '156165106as51da16f1ds0f121df032s10f3s49a';

            formData.append('name', form.name);
            formData.append('email', form.email);
            formData.append('birthDate', form.birthDate);
            formData.append('degree', form.degree);
            formData.append('idCard', form.id);
            formData.append('phone', form.phone);
            formData.append('password', form.password);
            formData.append('key', form.password);

            axios.post(url, formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    render(){
        return(
            <Styles>
                <section className="mt-5">
                    <MDBCard className="myCard p-5" style={{ width: "100%" }}>
                        <MDBCardBody>
                            <MDBCardTitle className="mb-5">Vytvořte profil</MDBCardTitle>
                            <MDBContainer fluid>
                                <form>
                                    <div className="grey-text">
                                        <MDBInput label="Jméno a přijímení*" icon="user" group type="text" validate error="wrong"
                                            success="right" id="name" onChange={(data) => this.handleChange(data.target)} />
                                        <MDBInput label="Email*" icon="envelope" group type="email" validate error="wrong"
                                            success="right" id="email" onChange={(data) => this.handleChange(data.target)}/>
                                        <MDBInput label="Email znovu*" icon="exclamation-triangle" group type="text" validate
                                            error="wrong" success="right" id="verifyEmail" onChange={(data) => this.handleChange(data.target)} />
                                        <MDBInput label="Datum narození" icon="briefcase" group type="date" validate
                                            error="wrong" success="right" id="birthDate" onChange={(data) => this.handleChange(data.target)} />
                                        <MDBInput label="Titul" icon="briefcase" group type="text" validate
                                            error="wrong" success="right" id="degree" onChange={(data) => this.handleChange(data.target)} />
                                        <MDBInput label="Číslo průkazu" icon="id-card" group type="text" validate
                                            error="wrong" success="right" id="id" onChange={(data) => this.handleChange(data.target)} />
                                        <MDBInput label="Tel. číslo" icon="phone" group type="text" validate
                                            error="wrong" success="right" id="phone" onChange={(data) => this.handleChange(data.target)}/>
                                        <MDBInput label="Heslo*" icon="lock" group type="password" validate id="password" onChange={(data) => this.handleChange(data.target)}/>
                                    </div>
                                    <div>
                                        <MDBBtn color="primary" onClick={this.handleSubmit}>Registrovat</MDBBtn>
                                        <h6 className="cancel mt-4" onClick={this.props.done}>Zrušit</h6>
                                    </div>
                                </form>
                            </MDBContainer>
                        </MDBCardBody>
                    </MDBCard>
                </section>
            </Styles>
        )
    }
}