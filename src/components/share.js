import React from 'react';
import { Button, Popover, OverlayTrigger, Form } from 'react-bootstrap';
import axios from 'axios';
import { MyContext } from '../components/userdata';
import styled from 'styled-components';

const Styles = styled.div`
    #popover {
        background-color: red;
    }
    #popover {
        max-width: 80%;
        min-width: 30%;
        background-color: red !important;
    }
`;

class Share extends React.Component{
    constructor(){
        super();

        this.state = {
            users: [],
            checkedUsers: []
        }
        this.handleCheck = this.handleCheck.bind(this);
        this.handleLoadUsers = this.handleLoadUsers.bind(this);
    }
    handleCheck(box){
        console.log(box.target.name);
        let checkedUsers = this.state.checkedUsers;
        if(box.target.checked){
            checkedUsers.push(box.target);
            this.setState({
                checkedUsers: checkedUsers
            }, () => {
                console.log(this.state.checkedUsers);
                this.props.handleShare(this.state.checkedUsers);
            })
        }else{
            const filteredUsers = checkedUsers.filter((user) => {
                return user.id !== box.target.id
            })
            this.setState({
                checkedUsers: filteredUsers
            }, () => {
                console.log(this.state.checkedUsers);
                this.props.handleShare(this.state.checkedUsers);
            })
        }
    }
    handleLoadUsers(){
        let key = new FormData();
        key.append('key', '156165106as51da16f1ds0f121df032s10f3s49a');
        const url = 'http://localhost:80/react-backend/loadusers.php';
        axios.post(url, key)
        .then(res => {
            console.log(res.data);
            this.setState({
                users: res.data
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    componentWillMount(){
        console.log("loading...");
    }
    componentDidMount(){
        console.log("loaded!");
    }
    static contextType = MyContext
    render(){
        let userData = this.context;
        return(
            <React.Fragment>
               <Styles>
                    <OverlayTrigger
                    trigger="click"
                    key={1}
                    placement="bottom"
                    overlay={
                        <Popover id="popover" style={{
                            // minWidth: '20%',
                            maxWidth: '80%',
                            minHeight: 200,
                            maxHeight: '40vh'
                        }}>
                        <Popover.Title as="h1">Vyberte kolegy, se kterými chcete akci sdílet</Popover.Title>
                        <Popover.Content>
                            {/* Content */}
                            {
                                this.state.users.map((user, index) => {
                                    if(user[0] !== userData.id.toString()){
                                        let checked = false;
                                        this.state.checkedUsers.map((arrayUser) => {
                                            if(arrayUser.name === user[1]){
                                                checked = true;
                                            }
                                            return null;
                                        })
                                        return <Form.Check 
                                    type='checkbox'
                                    id={index}
                                    key={index}
                                    label={user[1]}
                                    name={user[1]}
                                    onChange={(box) => this.handleCheck(box)}
                                    defaultChecked={checked}
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 'bold'
                                    }}
                                    />
                                    }
                                    return null;
                                })
                            }

                        </Popover.Content>
                        </Popover>
                    }
        >
                    <Button onClick={this.handleLoadUsers} variant="secondary">Sdílet</Button>
                </OverlayTrigger>
               </Styles>
            </React.Fragment>
        )
    }
}
export default Share;