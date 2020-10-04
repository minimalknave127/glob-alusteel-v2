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
`;

export default class Login extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            formData: {
                email: '',
                password: ''
            }
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                console.log(err);
            })


            // this.props.handleLogin(this.state.formData);
        }
    }
    render(){
        return(
            <Styles>
                <Container>
                    <section className="loginSection">
                        <Form>
                            <Form.Group>
                                <Form.Label>Zadejte email:</Form.Label>
                                <Form.Control onChange={(text) => this.handleChange(text)} type="email" id="email" placeholder="Váš email..." />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Vaše heslo:</Form.Label>
                                <Form.Control onChange={(text) => this.handleChange(text)} type="password" id="password" placeholder="Váš email..." />
                            </Form.Group>
                            <Button className="mt-5" variant="primary" onClick={this.handleLogin}>Potvrdit</Button>
                        </Form>
                    </section>
                </Container>
            </Styles>
        )
    }
}