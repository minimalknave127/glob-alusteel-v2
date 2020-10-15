import React from 'react';
import axios from 'axios';
import { Button, Modal, Form, ListGroup } from 'react-bootstrap';
import { MDBListGroup, MDBListGroupItem} from "mdbreact";
import Share from '../components/share';
import styled from 'styled-components';

const Styles = styled.div`
    .file-input{
        display: none;
    }
    .file-input-label{
        cursor: pointer;
        color: #025099 !important;
        font-weight: bold;
    }
`;

class CreateProject extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            formData: {
                name: '',
                description: '',
                coUsers: [],
                dateTo: '',
                files: [],
                sharedUsers: []
            },
            modalShow: false
        }
        this.handleFiles = this.handleFiles.bind(this);
        this.handleDeleteFile = this.handleDeleteFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }
    handlePost(){
        const form = this.state.formData;
        const url = "http://localhost:80/react-backend/new-project.php";
        const key = '156165106as51da16f1ds0f121df032s10f3s49a';
        let formData = new FormData();
        formData.append('name', form.name);
        formData.append('description', form.description);
        formData.append('dateTo', form.dateTo);
        // formData.append('files', form.files[0]);
        form.files.map((file) => {
            return formData.append('files[]', file);
        });
        // formData.append('sharedUsers', form.sharedUsers);
        form.sharedUsers.map((user) => {
            return formData.append('sharedUsers[]', user.id);
        });
        form.sharedUsers.map((user) => {
            return formData.append('sharedUsersNames[]', user.name);
        })
        formData.append('owner', this.props.user.id);
        formData.append('ownerName', this.props.user.name);
        formData.append('key', key);
        axios.post(url, formData)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
    handleShare(data){
        this.setState((prevState) => (
            {
                formData:{
                    ...prevState.formData,
                    sharedUsers: data
                }
            }
        ), () => {
            console.log("====SHARED USERS====");
            console.log(this.state.formData.sharedUsers);
        })
    }
    handleFiles(data){
        let files = data.target.files;
        let fileLenght = data.target.files.length;
        let fileArray = this.state.formData.files;
        for(let x=0; x < fileLenght; x++){
            fileArray.push(files[x]);
        }
        console.log(fileArray);
        this.setState((prevState) => (
            {
                formData: {
                    ...prevState.formData,
                    files: fileArray
                }
            }
        ), () => {
            console.log(this.state.formData.files);
        })
        
    }
    handleDeleteFile(data){
        document.getElementById('file-input').value = "";
        const fileArray = this.state.formData.files;
        const fileArrayFiltered = fileArray.filter((file) => {
            return file.name !== data; 
        })
        this.setState((prevProps) => (
            {
                formData:{
                    ...prevProps.formData,
                    files: fileArrayFiltered
                }
            }
        ))
    }
    handleChange(data){
        const type = data.target.id;
        const value = data.target.value;
        this.setState((prevState) => (
            {
                formData: {
                    ...prevState.formData,
                    [type]: value
                }
            }
        ))
    }
    componentDidMount(){
        console.log(this.props.id);
    }
    wrap = false
    render(){
        return(
           <React.Fragment>
                <Button onClick={() => {this.wrap = true; this.forceUpdate();}}>Vytvořit objednávku</Button>
                <Modal
                    show={this.wrap}
                    onHide={() => {this.wrap = false; this.forceUpdate();}}
                    dialogClassName="modal-90w"
                    size="xl"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Vytvořte objednávku
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Zadejte název zakázky:</Form.Label>
                                <Form.Control onChange={(data) => this.handleChange(data)} type="text" placeholder="Např. Argentinská..." id="name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Popište zakázku:</Form.Label>
                                <Form.Control onChange={(data) => this.handleChange(data)} as="textarea" rows="4" id="description"/>
                            </Form.Group>
                            {/* <div className="input-group mb-3">
                                <div className="custom-file">
                                    <input value={undefined} onChange={(files) => this.handleFiles(files)} type="file" className="custom-file-input" id="inputGroupFile02" multiple/>
                                    <label className="custom-file-label" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Přidejte soubory</label>
                                </div>
                                <div className="input-group-append">
                                    <span className="input-group-text" id="inputGroupFileAddon02">Upload</span>
                                </div>
                            </div> */}
                           <Styles>
                                <div>
                                    <input value={undefined} onChange={(files) => this.handleFiles(files)} type="file" className="file-input" id="file-input" multiple />
                                    <label className="file-input-label" htmlFor="file-input">Přidat soubory</label>
                                </div>
                           </Styles>
                        </Form>
                        {(this.state.formData.files.length > 0) ? <section className="mt-5" id="files">
                            <p>Vybrané soubory</p>
                            <div className="card" style={{
                                width: '80%'
                            }}>
                                <ul className="list-group list-group-flush">
                                    {this.state.formData.files.map((file, index) => {
                                        return <li style={{
                                            width: '80%'
                                        }} key={index} className="list-group-item">
                                            <p className="d-inline-block">{file.name}</p>
                                            <Button style={{
                                                float: 'right'
                                            }} size="sm" variant="danger" className="d-inline-block ml-5" onClick={() => this.handleDeleteFile(file.name)}>odstranit</Button>
                                        </li>
                                    })}
                                </ul>
                            </div>
                        </section>
                        : 
                        null}
                        <section className="mt-5">
                            <Share handleShare={(data) => this.handleShare(data)}/>
                            {(this.state.formData.sharedUsers.length === 0)? null : 
                            <div>
                                    <h6 className="mt-5">Objednávku uvidí:</h6>
                                    <div className="mt-1 ml-4">

                                        <ListGroup horizontal>
                                            {this.state.formData.sharedUsers.map((user, index) => {
                                                // return <MDBListGroupItem key={index}>
                                                return <div>
                                                    <p key={index} className="mb-0 mr-2 d-block">{user.name},</p>
                                                    <br />
                                                </div>
                                                {/* </MDBListGroupItem> */ }
                                            })}
                                        </ListGroup>
                                    </div>
                            </div>
                            }
                        </section>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handlePost} variant="success">Odeslat</Button>
                    </Modal.Footer>
                </Modal>
           </React.Fragment>
        )
    }
}
export default CreateProject;