import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

// class Wtf extends React.Component{
//     constructor(props){
//         super(props);

//         this.state = {
//             wtf: null,
//             tfw: null
//         }
//         this.change = this.change.bind(this);
//     }
//     componentDidMount(){
//         // this.setState({
//         //     wtf: this.props.test,
//         //     tfw: this.props.test
//         // })
//         this.setState((state, props) => (
//             {
//                 wtf: [...props.test]
//             }
//         ))
//         this.setState((state, props) => (
//             {
//                 tfw: props.test2
//             }
//         ))
//     }
//     change(){
//         const hello = this.state.tfw;
//         hello[1] = "TEST?";
//         this.setState({
//             tfw: hello
//         })
//     }
//     render(){
//         return(
          
//         )
//     }
// }

class Testt extends React.Component{
    constructor(){
        this.state = {
            show: false
        }

        this.onConfirm = this.onConfirm.bind(this);
        this.onCancle = this.onCancle.bind(this);
    }
    onConfirm(){
        this.setState({
            show: false
        })

        
    }
    onCancle(){
        this.setState({
            show: false
        })
    }
    
    render(){
        return(
            <React.Fragment>
                    <SweetAlert
                        show={this.state.show}
                        warning
                        showCancel
                        confirmBtnText="Yes, delete it!"
                        confirmBtnBsStyle="danger"
                        title="Are you sure?"
                        onConfirm={this.onConfirm}
                        onCancel={this.onCancle}
                        focusCancelBtn
                    >
                    You will not be able to recover this imaginary file!
                </SweetAlert>
            </React.Fragment>
        )
    }
}
export default Testt;