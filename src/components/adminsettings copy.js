import React from 'react';
import { Container, Alert, Button, Form } from 'react-bootstrap';
import { MDBBtn, MDBBtnGroup, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';


class AdminSettings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            accepted: false,
            order: ["Načítání", "Načítání..."],
            orderOld: [],
            changed: false,
            ask: {
                show: false,
                question: "",
                onConfirm: undefined,
                title: '',
                state: ''
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleState = this.handleState.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
    }

    handleQuestion(state){
        this.setState({
            ask:{
                show: true,
                state: state
            }
        })
    }

    handleChange(data){
        const type = data.target.id;
        const value = data.target.value;

        let orderArray = this.state.order;
        // switch(type){
        //     case "name":
        //         orderArray[1] = value;
        //     break;
        // }
        if(type === "name"){
            orderArray[1] = value;
        }
        this.setState({
            order: orderArray
        })
    }
    handleState(state){
        let currentState;
        if(state == "accept"){
            currentState = 1;
        }
        const url = "http://localhost:80/react-backend/changesettings.php";
        let formData = new FormData();
        formData.append("orderid", this.state.orderOld[0]);
        formData.append("key", '156165106as51da16f1ds0f121df032s10f3s49a');
        formData.append("action", "state");
        formData.append("state", currentState);
        axios.post(url, formData)
            .then(res => {
                if(currentState == 1 && res.data == "UPDATED"){
                    let orderData = this.state.order;
                    orderData[6] = "1";
                    console.log(res.data);
                    this.setState({
                        accepted: true,
                        ask: {
                            show: false
                        },
                        order: orderData
                    }, () => {
                        this.props.handleSettingsChange(this.state.order);
                    })
                }
            })
            .catch(err => {
                console.log(err);
                alert("Vyskytla se chyba při provádění akce. Kontaktujte správce IT. Detaily o chybě naleznete v konzoli.");
            })
    }
    handleSave(){
        const orderDataOld = this.props.orderData;
        const orderDataNew = this.state.order;
        if(orderDataNew === orderDataOld){
            alert("equals");
        }else{
            let formData = new FormData();
            const url = "http://localhost:80/react-backend/changesettings.php";
            const key = '156165106as51da16f1ds0f121df032s10f3s49a';
            formData.append("name", this.state.order[1]);
            formData.append("orderid", this.state.orderOld[0]);
            formData.append("key", key);
            axios.post(url, formData)
            .then(res => {
                if(res.data === "Success"){
                    this.props.handleSettingsChange(this.state.order);
                }
            })
            .catch(err => {
                console.log(err);
            })


            // this.props.handleSettingsChange(this.state.order);
        }
    }
    componentDidMount(){
        if(this.props.status !== "0"){
            this.setState({
                accepted: true
            });
        }
        this.setState((state, props) => (
            {
                order: [...props.orderData],
                orderOld: props.orderData
            }
        ))
    }
    render(){
        return(
            <Container>
                {/* <Calendar 
                // value={}
                selectRange={true}
                onChange={(value) => console.log(value)}
               /> */}
                {this.state.accepted ? 
                null
                :
                    <Alert className="mt-4" show={true} variant="warning">
                        <Alert.Heading>Objednávka nebyla přijata.</Alert.Heading>
                        <p>Objednávku musíte nejprve přijmout, než bude možné dělat úpravy.</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => this.handleQuestion("accept")} variant="outline-success">Přijmout</Button>
                        </div>
                    </Alert>

             }
                {/* <SweetAlert
                    success
                    title="Opravdu chcete provést tuto akci?"
                    onConfirm={() => this.handleState(this.state.ask.state)}
                    show={this.state.ask.show}
                >
                    Hotovo!
                </SweetAlert> */}
                <SweetAlert
                    show={this.state.ask.show}
                    warning
                    showCancel
                    cancelBtnText="Zrušit"
                    confirmBtnText="Ano"
                    confirmBtnBsStyle="danger"
                    title="Opravdu chcete provést akci?"
                    onConfirm={() => this.handleState(this.state.ask.state)}
                    onCancel={() => {this.setState({
                        ask: {
                            show: false
                        }
                    })}}
                    focusCancelBtn
                >
                    
                </SweetAlert>
                <section className="order-settings">
                    <div className="mb-4">
                        <h4>Stav objednávky</h4>
                        <MDBBtnGroup>
                            <MDBBtn color="success" size="lg" >Dokončit</MDBBtn>
                            <MDBBtn color="warning" size="lg">Podržet</MDBBtn>
                            <MDBBtn color="danger" size="lg">Zamítnout</MDBBtn>
                        </MDBBtnGroup>
                    </div>
                    <h4>Nastavení objednávky</h4>
                    <div>
                        <Form>
                            <Form.Label>Název objednávky</Form.Label>
                            <Form.Control id="name" type="text" value={this.state.order[1]} onChange={(data) => this.handleChange(data)} placeholder={this.state.order[1]} />
                        </Form>
                    </div>
                    <Button className="mt-5 float-right" variant="primary" onClick={this.handleSave}>Uložit nastavení</Button>
                </section>

            </Container>
        )
    }
}
export default AdminSettings;