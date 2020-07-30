import React from 'react';
import axios from 'axios';

class Login extends React.Component{
    constructor(){
      super();
  
      this.state={
        text: 'Hello world',
        succes: false,
        result: {}
      }
  
      this.handleChange = this.handleChange.bind();
      this.handleSubmit = this.handleSubmit.bind();
    }
    handleChange = async e => {
      await this.setState({
        text: e.target.value
      })
      console.log(this.state.text);
    }
    handleSubmit = e => {
      // e.preventDefault();
      console.log(this.state.text);
      let formData = new FormData();
      formData.append('text', this.state.text);
      const url = 'http://localhost:80/react-backend/';
      axios.post(url, formData)
      .then(res => {
        this.setState({
          succes: true,
          result: res.data
        })
        console.log(res.data[0]);
      })
      .catch(err => {
        console.log(err);
      })
    }
    render(){
      return(
        <div>
          <input id="text" onChange={this.handleChange}/>
          <button onClick={this.handleSubmit}>Click</button>
          {this.state.succes ? <h1>Your name is: {this.state.text}</h1> : null}
        </div>
      )
    }
  }
  
  export default Login;