import React, { createContext } from 'react';

export const MyContext = createContext();

class UserData extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: {
                name: '',
                email: '',
                id: '',
                premissions: '',
            }
        }
    }
    componentDidMount(){
        console.log(">>>>>>>>>>>");
        console.log(this.props.user);
        console.log(">>>>>>>>>>>");
        this.setState({
            user: this.props.user
        }, () => {
            this.setState((prevProps) => (
                {
                    user: {
                        ...prevProps.user,
                        isReady: true
                    }
                }
            ))
        });
    }
    componentDidUpdate(prevProps){
        if(prevProps.user !== this.props.user){
            this.setState({
                user: this.props.user
            });
            console.log("updated!");
        }
    }
    render(){
        return(
            <MyContext.Provider value={this.state.user}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}
export default UserData;