import React from 'react';
import Calendar from 'react-calendar';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { Container, Alert, Button, Form } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

class AdminSettings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            accepted: false,
            order: ["Načítání", "Načítání..."],
            orderOld: [],
            changed: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    handleChange(data){
        const type = data.target.id;
        const value = data.target.value;

        let orderArray = this.state.order;
        switch(type){
            case "name":
                orderArray[1] = value;
            break;
        }
        this.setState({
            order: orderArray
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
                if(res.data == "Success"){
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
        if(this.props.status != "0"){
            this.setState({
                accepted: true
            });
        }
        const wtf = this.props.orderData;
        // this.setState({
        //     order: this.props.order,
        //     fuckyou: this.props.order
        // })
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
                <h4>Nastavení objednávky</h4>
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
                            <Button variant="outline-success">Přijmout</Button>
                        </div>
                    </Alert>

             }
                <section className="order-settings">
                    <div>
                        <Form>
                            <Form.Label>Název objednávky</Form.Label>
                            <Form.Control id="name" type="text" value={this.state.order[1]} onChange={(data) => this.handleChange(data)} placeholder={this.state.order[1]} />
                            <Button className="mt-5 float-right" variant="primary" onClick={this.handleSave}>Uložit nastavení</Button>
                        </Form>
                    </div>
                </section>

            </Container>
        )
    }
}
export default AdminSettings;