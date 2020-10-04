import React from 'react';
import { MyContext } from '../components/userdata';
import ShowProjects from '../components/showprojects';
import CreateProject from '../components/createprojects';
import { Title } from '../style-components/style-components';



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
                    <Title title='Objednávky'/>
                    <h4 className="mb-4">Objednávky</h4>
                    <section className="p-5 myCard">                      
                        <CreateProject user={userData}/>
                        <ShowProjects user={userData} />
                    </section>
                </div>
        )
    }
}

export default Orders;