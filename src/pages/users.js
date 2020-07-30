import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class Users extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            userData: {},
            formData: {
                name: '',
                email: '',
                password: '',
                premissions: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChange(data){
        const type = data.target.id;
        const value = data.target.value;
        this.setState((prevState) => (
            {
                formData:{
                    ...prevState.formData,
                    [type]: value
                }
            }
        ),() => {
            //do after formData is loaded...
        })
    }
    handleRegister(){
        let formData = new FormData();
        const form = this.state.formData;
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('password', form.password);
        formData.append('premi', form.premissions);
        const url = 'http://localhost:80/react-backend/registration.php';
        axios.post(url, formData)
        .then(res => {
            if(res.data === "success"){
                alert("success!");
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    render(){
        return(
            <React.Fragment>
                <section>
                    <h2>Registrační formulář</h2>
                    <Form >
                        <Form.Group>
                            <Form.Label>Zadejte jméno:</Form.Label>
                            <Form.Control onChange={(text) => this.handleChange(text)} type="name" id="name"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Zadejte email:</Form.Label>
                            <Form.Control onChange={(text) => this.handleChange(text)} type="email" id="email" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Zadejte heslo:</Form.Label>
                            <Form.Control onChange={(text) => this.handleChange(text)} type="password" id="password" />
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label>Vyberte práva:</Form.Label>
                            <Form.Control onChange={(text) => this.handleChange(text)} type="text" id="premissions" />
                        </Form.Group> */}
                        <Form.Group >
                            <Form.Label>Vyberte práva</Form.Label>
                            <Form.Control onChange={(text) => this.handleChange(text)} id="premissions" as="select">
                                <option>Administrátor</option>
                                <option>Uživatel</option>
                            </Form.Control>
                        </Form.Group>
                        <Button className="mt-3" onClick={this.handleRegister}>Registrovat uživatele</Button>
                    </Form>
                </section>
            </React.Fragment>
        )
    }
}
export default Users;