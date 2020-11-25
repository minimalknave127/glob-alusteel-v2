import React, { createContext, Component } from 'react';

export const MyContext = createContext();

class UserData extends Component{
        state = {
            user: {
                name: '',
                email: '',
                id: '',
                premissions: '',
                isToggled: false
            }
        }
    toggleTheme = () => {
        this.setState({ isToggled: true }, () => {
            alert(this.state.user.isToggled);
        })
    }

    // componentDidMount(){
    //     console.log(">>>>>>>>>>>");
    //     console.log(this.props.user);
    //     console.log(">>>>>>>>>>>");
    //     this.setState({
    //         user: this.props.user
    //     }, () => {
    //         this.setState((prevProps) => (
    //             {
    //                 user: {
    //                     ...prevProps.user,
    //                     isReady: true
    //                 }
    //             }
    //         ))
    //     });
    // }
    // componentDidUpdate(prevProps){
    //     if(prevProps.user !== this.props.user){
    //         this.setState({
    //             user: this.props.user
    //         });
    //         console.log("updated!");
    //     }
    // }
    render(){
        return(
            <MyContext.Provider value={{ ...this.state.user, toggleTheme: this.toggleTheme}}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}
export default UserData;