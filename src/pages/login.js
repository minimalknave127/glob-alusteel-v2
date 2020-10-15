import React from 'react';
import axios from 'axios';
import { Form, Container, Button } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
    .loginSection{
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .formWrapper{
        position: relative;
        background-color: white;
        width: 80%;
        height: 500px;
        display: grid;
        grid-template-columns: auto 60%;
        border-radius: 30px;
        box-shadow: 0px 0.4375rem 1.813rem 0px rgba(0, 0, 0, 0.246) !important;
        -moz-box-shadow: 0px 0.4375rem 1.813rem 0px rgba(0, 0, 0, 0.08);
        -webkit-box-shadow: 0px 0.4375rem 1.813rem 0px rgba(0, 0, 0, 0.08);
        -ms-box-shadow: 0px 0.4375rem 1.813rem 0px rgba(0, 0, 0, 0.08);
        -o-box-shadow: 0px 0.4375rem 1.813rem 0px rgba(0, 0, 0, 0.08);

        .loginImage{
            transition: all 0.3s;
            background-color: #11448F;
            height: 100%;
            width: 100%;
            border-radius: 30px;
            background-image: url(${require("../media/bg.jpg")});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
`;

export default class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            formData: {
                email: '',
                password: ''
            },
            loading: false,
            error: false
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKey = this.handleKey.bind(this);
    }
    handleChange(data){
        const type = data.target.id;
        const value = data.target.value;

       
        this.setState((prevState) => (
            {
                formData:{
                    ...prevState.formData,
                    [type] : value
                }
            }
        ))
        
    }
    handleLogin(){
        
        if(this.state.formData.email !== "" && this.state.formData.password !== ""){
            this.setState({
                loading: true
            })

            let formData = new FormData();
            formData.append('email', this.state.formData.email);
            formData.append('heslo', this.state.formData.password);
            const url = "http://localhost:80/react-backend/login.php/";
            axios.post(url, formData)
            .then(res => {
                if(res.data[0] === 'success'){
                    console.log(res.data[1]);
                    this.props.handleLogin(res.data);
                    const userObject = {
                        name: res.data[2],
                        email: res.data[3],
                        id: res.data[1],
                        premissions: res.data[4]
                    }
                    localStorage.setItem('userData', JSON.stringify(userObject));
                }else{
                    console.log(res.data);
                }
            })
            .catch(err => {
                if(err){
                    this.setState({
                        error: true,
                        loading: false
                    })
                }
            })


            // this.props.handleLogin(this.state.formData);
        }
    }
    handleKey(e){
        if(e.keyCode === 13){
            this.handleLogin();
        }
    }
    componentDidMount(){
        document.addEventListener('keydown', this.handleKey, false);
    }
    render(){
        return(
            <Styles>
                <Container>
                    <section className="loginSection">
                        <div className="formWrapper p-3">
                            <div className="mr-5 p-3">
                                <h3 className="mb-5" style={{
                                    fontWeight: 'bold'
                                }}>Přihlaste se</h3>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Zadejte email:</Form.Label>
                                        <Form.Control onChange={(text) => this.handleChange(text)} type="email" id="email" placeholder="Váš email..." />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Vaše heslo:</Form.Label>
                                        <Form.Control onChange={(text) => this.handleChange(text)} type="password" id="password" placeholder="Váš email..." />
                                    </Form.Group>
                                    <Button className="mt-5 mx-0" variant="primary" onClick={this.handleLogin}>Potvrdit</Button>
                                </Form>
                                {this.state.loading ? <p className="mt-4">Načítání...</p> : this.state.error ? <p className="mt-4 text-danger">Chyba při kontaktování serveru</p> : null}
                            </div>
                            <div className="loginImage">

                            </div>
                        </div>
                    </section>
                </Container>
            </Styles>
        )
    }
}