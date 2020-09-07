import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import styled from 'styled-components';

const Styles = styled.div`
    section{
        width: 100%;
    }
    form{
        margin: 0 auto;
    }
    form > div:first-of-type{
        display: flex;
        flex-wrap: wrap;
    }
    form > div > .form-group{
        margin: 0 40px;
    }
    .cancel{
        cursor: pointer;
        font-weight: 700 !important;
    }
`;

export default class RegisterUser extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Styles>
                <section className="mt-5">
                    <MDBCard className="rounded" style={{ width: "100%" }}>
                        <MDBCardBody>
                            <MDBCardTitle className="">Vytvořte profil</MDBCardTitle>
                            <MDBContainer fluid>
                                <form>
                                    <p className="h5 text-center mb-4">Registrujte uživatele</p>
                                    <div className="grey-text">
                                        <MDBInput label="Jméno a přijímení" icon="user" group type="text" validate error="wrong"
                                            success="right" />
                                        <MDBInput label="Email" icon="envelope" group type="email" validate error="wrong"
                                            success="right" />
                                        <MDBInput label="Email znovu" icon="exclamation-triangle" group type="text" validate
                                            error="wrong" success="right" />
                                        <MDBInput label="Heslo (volitelné)" icon="lock" group type="password" validate />
                                    </div>
                                    <div>
                                        <MDBBtn color="primary">Registrovat</MDBBtn>
                                        <h6 className="cancel mt-4" onClick={this.props.done}>Zrušit</h6>
                                    </div>
                                </form>
                            </MDBContainer>
                        </MDBCardBody>
                    </MDBCard>
                </section>
            </Styles>
        )
    }
}