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
                isToggled: false,
                isReady: false
            }
        }
        this.toggleTheme = this.toggleTheme.bind(this);
    }
    toggleTheme(name){
        this.setState((prevProps) => (
            {
               user: {
                   ...prevProps.user,
                   name: name
               }
            }
        ))
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
            <MyContext.Provider value={{ ...this.state.user, toggleTheme: (name) => this.toggleTheme(name)}}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}
export default UserData;