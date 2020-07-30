import React from 'react';
import { Redirect } from 'react-router-dom';
import { MyContext } from '../components/userdata';


class Home extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: {}
        }
    }
    componentDidMount(){
        this.setState({
            user: this.props.user
        })
    }
    static contextType = MyContext;
    render(){
        let userData = this.context;
        return(
                <React.Fragment>
                    {
                        (userData.premissions === "user") ? <Redirect to="/objednavky"/> : null
                    }
                </React.Fragment>
        )
    }
}

export default Home;