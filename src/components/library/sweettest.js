import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

class MyAsk extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            show: false,
            showError: false,
            showCancel: false
        }

        this.onConfirm = this.onConfirm.bind(this);
        this.onCancle = this.onCancel.bind(this);
        this.action = this.action.bind(this);
        this.next = this.next.bind(this);
        this.cancelConfirm = this.cancelConfirm.bind(this);
    }
    action(){
        this.actionState = this.props.action;
    }
    onConfirm(){
        this.props.onConfirm();
        // this.setState({
        //     show: true
        // })
        console.log(this.actionState);


    }
    next(data){
        this.props.onCancel();
        this.setState({ showCancel: true });
    }
    cancelConfirm(response){
        this.setState({ showCancel: false });
        this.props.onConfirm(response);
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
                <SweetAlert success title="Hotovo!" show={this.state.show} onConfirm={() => this.setState({ show: false })} onCancel={this.props.onCancel}>
                    Povedlo se!
                </SweetAlert>
                <SweetAlert danger title="Něco se pokazilo!" show={this.state.showError} onConfirm={() => this.setState({ showError: false })} onCancel={this.onCancel}>
                    Kontaktujte prosím správce IT.
                </SweetAlert>
                {this.props.action === "ask" ? <div>
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
                    
                </div>
                :
                this.props.action === "cancel" ?
                <div>
                            <SweetAlert
                                show={this.props.show}
                                warning
                                showCancel
                                cancelBtnText="Zrušit"
                                confirmBtnText="Provést"
                                confirmBtnBsStyle="warning"
                                title="Pozor!"
                                placeHolder="Opravdu chcete objednávku stornovat?"
                                onConfirm={this.next}
                                onCancel={this.props.onCancel}
                            >
                                Opravdu chcete objednávku stornovat?
                        </SweetAlert>
                            <SweetAlert
                                show={this.state.showCancel}
                                input
                                showCancel
                                cancelBtnText="Zrušit"
                                confirmBtnText="Provést"
                                confirmBtnBsStyle="warning"
                                title="Zadejte důvod"
                                placeHolder="Důvod"
                                onConfirm={(response) => this.cancelConfirm(response)}
                                onCancel={() => this.setState({ showCancel: false })}
                            >
                                Zadejte důvod zrušení objednávky
                        </SweetAlert>
                </div>
                        :
                        null
                        }
            </React.Fragment>
        )
    }
}
export default MyAsk;