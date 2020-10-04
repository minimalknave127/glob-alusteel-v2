import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import ShowUsers from '../components/users/showusers';
import { MDBContainer } from 'mdbreact';

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
                    <h4 className="mb-4">Uživatelé v databázi</h4>
                        <ShowUsers />
                </section>
            </React.Fragment>
        )
    }
}
export default Users;