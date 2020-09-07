import React from 'react';
import axios from 'axios';
import { Button, Table } from 'react-bootstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';
import { MyContext } from '../components/userdata';
import { Redirect } from 'react-router-dom';
import { GetStatus } from './functions';
import { GetDate } from './functions';

class ShowProjects extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            loadedItems: [],
            redirect:{
                redirectMe: false,
                redirectData: undefined
            }
        }

        this.handleLoad = this.handleLoad.bind(this);
        this.redirectControl = this.redirectControl.bind(this);
    }
    static contextType = MyContext;
    handleLoad(){
        let formData = new FormData();
        formData.append('userId', this.props.id);
        const url = 'htpp://localhost:80/react-backend/loaditems.php';
        axios.get(url, formData)
        .then(res => {
            // console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
    componentDidMount(){
        this.loadItems = () => {
            let formData = new FormData();
            formData.append('userId', this.context.id);
            formData.append('key', '156165106as51da16f1ds0f121df032s10f3s49a');
            formData.append('action', 'loaditems');
            const url = 'http://localhost:80/react-backend/loaditems.php';
            axios.post(url, formData)
            .then((res) => {
                console.log(res.data);
                let itemsArray = this.state.loadedItems;
                res.data.map((item) => {
                    console.log("++++++++++++++0");
                    console.log(res.data)
                    console.log("++++++++++++++0");
                    if(itemsArray.length > 0){
                        let arrayContains = false;
                        for(let x = 0; x < itemsArray.length; x++){
                            if(itemsArray[x][0] === item[0]){
                                arrayContains = true;
                            }                       
                        }
                        if(!arrayContains){
                            itemsArray.push(item);
                        }
                        console.log(itemsArray[0][0]);
                    }else{
                        alert("ss");
                        itemsArray.push(item);
                    }
                    return null;
                });
                // console.log(itemsArray);
                this.setState({
                    loadedItems: itemsArray
                });
            })
            .catch(err => {
                console.log(err);
            })
        }
        this.loadItems();
    }
    redirectControl(event){
        this.setState((prevState) => (
            {
                redirect: {
                    ...prevState.redirect,
                    redirectData: event,
                    redirectMe: true
                }
            }
        ), () => {
            // console.log(this.state.redirect);
        })
    }
    componentDidUpdate(prevProps){
        if(prevProps.user !== this.props.user){
            this.loadItems();
            this.itemsInterval = setInterval(this.loadItems, 2000);
        }
    }
    componentWillUnmount(){
        clearInterval(this.itemsInterval);
    }
    render(){
        // const redirect = this.state.redirect.redirectMe;
        if(this.state.redirect.redirectMe){
                return(
                    <Redirect to={{
                        pathname: '/projekt',
                        state:{
                            orderData: this.state.redirect.redirectData
                        }
                    }}/>
                )
        }
        return(
            <React.Fragment>
                <section className="mt-5">
                    {(this.state.loadedItems.length > 0 ?
                    <MDBTable>
                        <MDBTableHead color="primary-color" textWhite>
                            <tr>
                                <th>
                                    Název objednávky
                                </th>
                                
                                <th>
                                    Stav
                                </th>
                                <th>
                                    Vlastník
                                </th>
                                <th>
                                    Požadované datum dokončení
                                </th>
                                <th></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {this.state.loadedItems.map((item, index) => (
                                <tr key={item[0]}>
                                    <td>{item[1]}</td>
                                    <td><GetStatus status={item[6]} /></td>
                                    <td>{item[4]}</td>
                                    <td><GetDate dateInput={item[5]} /></td>
                                    <td><Button item-data={item} onClick={() => this.redirectControl(item)} >Zjistit více</Button></td>
                                </tr>
                            ))}
                            </MDBTableBody>
                    </MDBTable>

                    
                    :
                    <p>Nemáte žádné objednávky</p>
                    )}
                </section>
            </React.Fragment>
        )
    }
}

export default ShowProjects;