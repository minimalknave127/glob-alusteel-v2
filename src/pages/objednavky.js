import React from 'react';
import { MyContext } from '../components/userdata';
import ShowProjects from '../components/showprojects';
import CreateProject from '../components/createprojects';



class Orders extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            user: {}
        }
    }
    componentDidMount(){
        this.setState({
            user: this.props.user
        })
    }
    static contextType = MyContext;
    render(){
        let userData = this.context;
        return(
                <div>
                    <h2>Domů</h2>
                    <section className="pt-5">                      
                        <CreateProject user={userData}/>
                        <ShowProjects user={userData} />
                    </section>
                </div>
        )
    }
}

export default Orders;