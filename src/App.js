import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './components/navbar';
import UserData from './components/userdata';
import { MDBContainer } from 'mdbreact';

/* Import pages */

import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Users from './pages/users';
import NotFound from './pages/notfound';
import Orders from './pages/objednavky';
import Project from './pages/project';
import Test from './pages/test';
import Dashboard from './pages/dashboard';
import Chat from './pages/chat';
import Testt from './pages/sweettest';

class App extends React.Component{
  constructor(){
    super();

    this.state = {
      user: {
        name: 'Tester',
        email: 'test',
        id: 1,
        premissions: 'user'
      },
      loggedIn: false
    }
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentDidMount(){
    if(localStorage.getItem('userData')){
      const userData = localStorage.getItem('userData');
      this.setState({
        user: JSON.parse(userData),
        loggedIn: true
      })
    }
  }
  handleLogin(data){
    this.setState({
      user:{
        name: data[2],
        email: data[3],
        id: data[1],
        premissions: data[4]
      },
      loggedIn: true
    }, () => {
      console.log("-------------");
      console.log(this.state.user);
      console.log("-------------");
    })
  }
  render(){
    return(
      <React.Fragment>
        {this.state.loggedIn ? 
            <UserData user={this.state.user}>
              <Router>
                <Navigation>
                <div className="mt-5 pt-5">
                  <MDBContainer>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route path="/sweet" component={Testt}/>
                      <Route exact path="/prehled" component={Dashboard} />
                      <Route exact path="/projekt/test" component={Test} />
                      <Route path="/objednavky" component={Orders} />
                      <Route path="/zpravy" component={Orders} />
                      <Route path="/about" component={About} />
                      <Route path="/users" render={(props) => <Users {...props} user={this.state.user} />} />
                      <Route path="/projekt" component={Project} />
                      <Route path="/test" component={Test} />
                      <Route path="/chat" component={Chat} />
                      <Route component={NotFound} />
                    </Switch>
                  </MDBContainer>
                </div>
              </Navigation>
              </Router>
            </UserData>
        :
        <Login handleLogin={(data) => this.handleLogin(data)} />
        }
    </React.Fragment>
    )
  }
}

export default App;
