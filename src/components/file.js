import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from 'mdbreact';

export default class File extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        const name = this.props.name;
        const type = name.split('.').pop();
        const images = ["jpg", "jpeg", "png"];
        const path = "http://localhost:80/react-backend/files/";
        let icon;
        let buttons;
        if(images.includes(type)){
            icon = "file-image";
        }else if(type == "pdf"){
            icon = "file-pdf";
        }else if (type == "doc" || type == "docx") {
            icon = "file-word";
        }else{
            icon = "file-alt";
        }
        return(
               <React.Fragment>
                <MDBCard className="m-4" style={{width: 'fit-content'}}>
                    <MDBCardBody>
                        {/* <MDBCardTitle>HelloWorld.jpg</MDBCardTitle> */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: 'fit-content'
                        }}>
                        <MDBIcon size="lg" far icon={icon} className="mr-2"/>
                        <h6 style={{ margin: 0 }}>{name}</h6>
                            {this.props.add ? 
                            
                            <MDBIcon onClick={this.props.onCancle} style={{cursor: 'pointer'}} className="red-text ml-5" icon="minus"/>
                            
                            : 
                            
                            <a target="_blank" href={path + "/" + name} className="ml-5">Zobrazit</a>}
                        </div>
                    </MDBCardBody>
                </MDBCard>
                {/* <MDBCard >
                    <MDBCardBody>
                        <MDBCardTitle>Card title</MDBCardTitle>
                        <div style={{
                            display: 'flex'
                        }}>
                            <MDBCardText>
                                Some quick example text to build on the card title and make
                                up the bulk of the card&apos;s content.
                            </MDBCardText>
                            <MDBBtn href="#">MDBBtn</MDBBtn>
                        </div>
                    </MDBCardBody>
                </MDBCard> */}
               </React.Fragment>
        )
    }
}