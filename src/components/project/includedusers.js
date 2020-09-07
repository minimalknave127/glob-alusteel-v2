import React from 'react';
import axios from 'axios';

export default class Includedusers extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            includedUsers: []
        }

        this.loadUsers = this.loadUsers.bind(this);
    }

    loadUsers(){
        console.log(this.props.order);
        const url = "http://localhost:80/react-backend/changesettings.php";
        const key = '156165106as51da16f1ds0f121df032s10f3s49a';

        let formData = new FormData();
        formData.append('key', key);
        formData.append('action', 'loadusersinorder');
        formData.append('orderid', this.props.order[0]);

        axios.post(url, formData)
            .then((res) => {
                console.log(res.data);
                // console.log(res.data);
                let itemsArray = this.state.includedUsers;
                res.data.map((item) => {
                    if (itemsArray.length > 0) {
                        let arrayContains = false;
                        for (let x = 0; x < itemsArray.length; x++) {

                            if (itemsArray[x][0] === item[0]) {
                                arrayContains = true;
                            }
                        }
                        if (!arrayContains) {
                            itemsArray.unshift(item);
                        }
                    } else {
                        itemsArray.unshift(item);
                    }
                    return null;
                });
                // console.log(itemsArray);
                this.setState({
                    includedUsers: itemsArray
                });
            })
        .catch(err => {
            console.log(err);
        })
    }

    
    componentDidUpdate(prevProps){
        if(prevProps.order !== this.props.order){
            this.loadUsersInterval = setInterval(this.loadUsers, 2000);
            this.loadUsers();
        }
    }
    componentWillUnmount(){
        clearInterval(this.loadUsersInterval);
    }
    render(){
        return(
            <h1>Hi</h1>
        )
    }
}