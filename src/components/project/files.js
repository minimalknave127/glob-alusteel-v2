import React from 'react';
import axios from 'axios';
import File from '../file';
import { MDBBtn, MDBSpinner, toast, ToastContainer, MDBIcon } from 'mdbreact';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../css/list-animation.css';

export default class More extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderData: [],
            files: [],
            newFiles: [],
            empty: false
        }
        
        this.loadItems = this.loadItems.bind(this);
        this.handleNewFiles = this.handleNewFiles.bind(this);
        this.deleteNewFiles = this.deleteNewFiles.bind(this);
        this.sendNewFiles = this.sendNewFiles.bind(this);
    }
    handleNewFiles(files){
        const localFiles = files.target.files;
        let filesArray = this.state.newFiles;

        for(let x = 0; x < localFiles.length; x++){
            filesArray.unshift(localFiles[x]);
        }
        this.setState({
            newFiles: filesArray
        }, () => {
            console.log(this.state.newFiles);
        })
    }
    deleteNewFiles(data){
        document.getElementById('file-input').value = "";

        const filesArray = this.state.newFiles;
        const filteredArray = filesArray.filter((file) => {
            return file !== data;
        })
        this.setState({
            newFiles: filteredArray
        })
    }
    sendNewFiles(){
        const url = "http://localhost:80/react-backend/addfiles.php";
        let formData = new FormData();

        formData.append('orderid', this.state.orderData[0]);
        formData.append('key', '156165106as51da16f1ds0f121df032s10f3s49a');
        this.state.newFiles.map((file) => {
            return formData.append('files[]', file);
        })

        axios.post(url, formData)
        .then(res => {
            console.log(res.data);
            if (res.data == 'success'){
                this.setState({
                    newFiles: []
                }, () => {
                    toast.success(<span className="p-2"><MDBIcon className="mr-2" icon="info-circle" />Povedlo se!</span>);
                });
            }else if(res.data === "too big"){
                toast.error(<span className="p-2"><MDBIcon className="mr-2" icon="exclamation-triangle" />Jeden ze souborů je přilíš velký!</span>);
            } else if (res.data === "File format denied"){
                toast.error(<span className="p-2"><MDBIcon className="mr-2" icon="exclamation-triangle" />Jeden z typu souborů není povolený!</span>);
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
    loadItems(){
        const url = "http://localhost:80/react-backend/loadfiles.php";
        let formData = new FormData();
        formData.append("key", "156165106as51da16f1ds0f121df032s10f3s49a");
        formData.append("action", "load-files");
        formData.append("orderid", this.state.orderData[0]);

        axios.post(url, formData)
        .then(res => {
            console.log(res.data);
            let fileArray = this.state.files;
            if(res.data === "empty"){
                this.setState({
                    empty: true
                })
            }else{

                res.data.map((file) => {
                    if (fileArray.length > 0) {
                        let arrayContains = false;
                        for (let i = 0; i < fileArray.length; i++) {
                            // console.log("---");
                            // console.log(fileArray[i]);
                            // console.log(file[0]);
                            // console.log("---");

                            if (file[0] === fileArray[i]) {
                                arrayContains = true;
                            }
                        }
                        // console.log("contains: " + arrayContains);
                        // console.log("---");
                        if (!arrayContains) {
                            fileArray.unshift(file[0]);
                        }
                    } else {
                        fileArray.unshift(file[0]);
                    }
                    return null;
                })
            }
            
            this.setState({
                files: fileArray
            })
        })
        .catch(err => {
            console.log(err);
        })
    }
    componentDidMount(){
        this.setState({
            orderData: this.props.orderData
        }, () => {
            this.loadItems();
            this.filesInterval = setInterval(this.loadItems, 2000);
        })
    }
    componentWillUnmount(){
        clearInterval(this.filesInterval);
    }
    render(){
        return(
            <React.Fragment>
                <ToastContainer
                    hideProgressBar
                />
                <h4>Soubory</h4>
                <input style={{ display: 'none' }} value={undefined} onChange={(files) => this.handleNewFiles(files)} type="file" className="file-input mt-3" id="file-input" multiple/>
                <label style={{ cursor: 'pointer', color: '#025099', fontWeight: '700' }} htmlFor="file-input">Přidat soubory</label>
                
                    <section id="localfiles">
                            <TransitionGroup>{
                                this.state.newFiles.map((file, index) => {
                                    return <CSSTransition key={index} timeout={500} classNames="file">
                                        <File name={file.name} onCancle={() => this.deleteNewFiles(file)} add />
                                    </CSSTransition>
                                })
                            }</TransitionGroup>
                        {this.state.newFiles.length > 0 ?
                            <MDBBtn size='sm' onClick={this.sendNewFiles}>Potvrdit</MDBBtn>
                            :
                            null
                        }
                    </section>
                
               
                    <section id="files" style={{
                        display: 'flex',
                        flexWrap: 'wrap'
                }}> {this.state.empty === true || this.state.files.length > 0 ? 
                        this.state.empty === true ? <h5 className="m-5 grey-text">Zatím žádné soubory nebyly přidány.</h5>:
                        <TransitionGroup style={{
                            display: 'flex',
                            flexWrap: 'wrap'
                        }}>
                            {
                                this.state.files.map((file, index) => {
                                    return <CSSTransition key={index} timeout={500} classNames="item">
                                        <File name={file} />
                                    </CSSTransition>
                                })
                            }
                        </TransitionGroup>:
                        <div className="mt-5">
                            <MDBSpinner small />
                        </div>
                        }
                    </section>
                
            </React.Fragment>
        )
    }
}