import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

class MyAsk extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            showError: false
        }

        this.onConfirm = this.onConfirm.bind(this);
        this.onCancle = this.onCancel.bind(this);
    }
    onConfirm(){
        this.props.onConfirm();
        // this.setState({
        //     show: true
        // })


    }
    onCancel(){
        alert("hi");
    }
    componentDidUpdate(prevProps){
        if(prevProps.success !== this.props.success){
            if(this.props.success === true){
                this.setState({
                    show: true
                })
            }else if(this.props.success === false){
                this.setState({
                    showError: true
                })
            }
        }
    }
    
    render(){
        return(
            <React.Fragment>
                    <SweetAlert
                    // closeAnim={{ name: 'hideSweetAlert', duration: 100 }}
                        allowEscape
                        show={this.props.show}
                        warning
                        showCancel
                        cancelBtnText="Zrušit"
                        confirmBtnText="Provést"
                        confirmBtnBsStyle="danger"
                        title="Opravdu chcete provést akci?"
                        onConfirm={this.onConfirm}
                        onCancel={this.props.onCancel}
                        focusCancelBtn
                    >
                </SweetAlert>
                <SweetAlert success title="Hotovo!" show={this.state.show} onConfirm={() => this.setState({ show: false })} onCancel={this.props.onCancel}>
                    Povedlo se!
                </SweetAlert>
                <SweetAlert danger title="Něco se pokazilo!" show={this.state.showError} onConfirm={() => this.setState({ showError: false })} onCancel={this.onCancel}>
                    Kontaktujte prosím správce IT.
                </SweetAlert>
            </React.Fragment>
        )
    }
}
export default MyAsk;