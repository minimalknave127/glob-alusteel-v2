import React from 'react';
import { MDBBtn } from 'mdbreact';

export default class Settings extends React.Component{
    constructor(){
        super();
    }
    
    render(){
        return(
            <React.Fragment>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }} className="mb-4">
                    <span><h4 className="mb-0 d-inline-block">Upravit profil</h4></span>
                    <span><MDBBtn className="rounded-pill" onClick={this.handleSubmit}>Uložit</MDBBtn></span>
                </div>
                <section className="myCard p-5">
                    <div>
                        <h5 className="mb-3">Obecná nastavení</h5>

                        <div className='custom-control custom-switch'>
                            <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customSwitches'
                                readOnly
                            />
                            <label className='custom-control-label' htmlFor='customSwitches'>
                                Dark mode
                            </label>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}