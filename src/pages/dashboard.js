import React from 'react';
import axios from 'axios';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCol, MDBRow, MDBProgress, MDBTable, MDBTableBody, MDBTableHead, MDBListGroup, MDBListGroupItem } from 'mdbreact';

import { OrderChart } from '../components/charts/ordersChart';

export default class Dashboard extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <React.Fragment>
                <MDBRow>
                    <MDBCol>
                        <MDBCard style={{ width: "100%" }}>
                            <MDBCardBody>
                                <MDBCardTitle>Objednávek v průběhu</MDBCardTitle>
                                <MDBCardText>
                                    <h1>20</h1>
                            </MDBCardText>
                                <MDBBtn href="#">Přejít na objednávky</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard style={{ width: "100%" }}>
                            <MDBCardBody>
                                <MDBCardTitle>Dokončených objednávek</MDBCardTitle>
                                <MDBCardText>
                                    <h1>10 z 40</h1>
                                    
                                    <MDBProgress value={(10 / 40) * 100} />
                                    {(10 / 40) * 100}%
                                    
                            </MDBCardText>
                                {/* <MDBBtn href="#">MDBBtn</MDBBtn> */}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol>
                        <MDBCard style={{ width: "100%" }}>
                            <MDBCardBody>
                                <MDBCardTitle>Card title</MDBCardTitle>
                                <MDBCardText>
                                    Some quick example text to build on the card title and make
                                    up the bulk of the card&apos;s content.
                            </MDBCardText>
                                <MDBBtn href="#">MDBBtn</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <section className="mt-5">
                    <MDBRow>
                        <MDBCol>
                            <MDBCard style={{ width: "100%", height: 400 }}>
                                <MDBCardBody>
                                    <MDBCardTitle>Uživatelé</MDBCardTitle>
                                    <MDBCardText>
                                        Seznam uživatelů v databázi
                                    </MDBCardText>
                                    <MDBTable>
                                        <MDBTableHead color="primary-color" textWhite>
                                            <tr>
                                                <th>#</th>
                                                <th>Jméno</th>
                                                <th>Přijímení</th>
                                                <th>práva</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            <tr>
                                                <td>1</td>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td>@fat</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Larry</td>
                                                <td>the Bird</td>
                                                <td>@twitter</td>
                                            </tr>
                                        </MDBTableBody>
                                    </MDBTable>
                                    {/* <MDBBtn href="#">MDBBtn</MDBBtn> */}
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                        <MDBCol size="6">
                            <MDBCard style={{ width: "100%"}}>
                                <MDBCardBody>
                                    <MDBCardTitle>Log</MDBCardTitle>
                                    <MDBCardText>
                                        Globální log objednávek
                                    </MDBCardText>
                                    <MDBListGroup style={{ width: "22rem" }}>
                                        
                                        <div style={{
                                            overflowY: 'scroll',
                                            maxHeight: 400
                                        }}>
                                            <MDBListGroupItem href="#">
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">Nová objednávka</h5>
                                                    <small>před 3 dny</small>
                                                </div>
                                                <p className="mb-1">Uživatel <b>Tadeáš Simandl</b> vytvořil <a>objednávku</a></p>
                                                {/* <small>Tadeáš Simandl</small> */}
                                            </MDBListGroupItem>
                                            <MDBListGroupItem href="#">
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h5 className="mb-1">Objednat materiál</h5>
                                                    <small>před 3 dny</small>
                                                </div>
                                                <p className="mb-1">Objednat materiál na objednávku Kočkova.</p>
                                                <small>Tadeáš Simandl</small>
                                            </MDBListGroupItem>
                                        </div>
                                    </MDBListGroup>
                                    
                                    {/* <MDBBtn href="#">MDBBtn</MDBBtn> */}
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </section>
                {/* <section className="mt-5">
                    <MDBRow>
                        <MDBCol>
                            <MDBCard style={{ width: "100%" }}>
                                <MDBCardBody>
                                    <MDBCardTitle>Statistiky</MDBCardTitle>
                                    <MDBCardText>
                                        Globální statistiky systému.
                                    </MDBCardText>
                                    <OrderChart />
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </section> */}
            </React.Fragment>
        )
    }
}