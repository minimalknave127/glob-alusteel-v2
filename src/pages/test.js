import React from 'react';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class Wtf extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            wtf: null,
            tfw: null
        }
        this.change = this.change.bind(this);
    }
    componentDidMount(){
        // this.setState({
        //     wtf: this.props.test,
        //     tfw: this.props.test
        // })
        this.setState((state, props) => (
            {
                wtf: [...props.test]
            }
        ))
        this.setState((state, props) => (
            {
                tfw: props.test2
            }
        ))
    }
    change(){
        const hello = this.state.tfw;
        hello[1] = "TEST?";
        this.setState({
            tfw: hello
        })
    }
    render(){
        return(
            <div>
                {/* <h1>Test props: {this.state.wtf[0]}</h1> */}
                <button onClick={() => { console.log(this.state.wtf) }}>Test</button>
                <button onClick={this.change}>Change state</button>
            </div>
        )
    }
}

class Test extends React.Component{
    constructor(){
        super();
        this.state = {
            wtf: ["ss", "hh"]
        }
        this.stopInterval = this.stopInterval.bind(this);
    }
    componentDidMount(){
        this.testFunction = () => {
            console.log("hello world!");
        }
    }
    stopInterval(){
        // clearInterval(this.testInterval);
        this.testFunction();
    }
    render(){
        return(
            <React.Fragment>
                <Wtf test={this.state.wtf} test2={this.state.wtf}/>
                <button onClick={this.stopInterval}>Stop interval</button>

            </React.Fragment>
        )
    }
}
export default Test;