import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MyContext } from '../components/userdata';

// css  //
import '../css/navbar.css';

const Styles = styled.div`
    .nav-text{
        color: black;
    }
    a{
        text-decoration: none;
        color: black;
    }
    a:active{
        color: white;
    }
`;

const Navigation = (props) => {

    const myContext = useContext(MyContext);
    return(
    <Styles>
        <div className="inline-layout">
            <div>
                    <nav className="navbar-vertical z-depth-2">
                        <div id="nav-wrapper">
                            <div className="brand-logo">
                                <img src={require("../media/logo.svg")} alt="logo" />
                            </div>
                            <div className=" ml-5 items-wrapper">
                                <div className="mb-3 nav-item nav-item-active">
                                    <img className="mr-3" src={require("../media/ui/021-news.svg")} alt="" />
                                    <h5 className="font-weight-normal"><Link className="nav-a" to="/prehled">Přehled</Link></h5>
                                </div>
                                <div className="mb-3 nav-item nav-item-active">
                                    <img className="mr-3" src={require("../media/ui/021-news.svg")} alt="" />
                                    <h5 className="font-weight-normal"><Link className="nav-a" to="/">Moje objednávky</Link></h5>
                                </div>
                                <hr />
                                <div className="mb-3 nav-item">
                                    <img className="mr-3" src={require("../media/ui/001-account.svg")} alt="" />
                                    <h5 className="font-weight-normal"><Link className="nav-a" to="/users">Uživatelé</Link></h5>
                                </div>
                                <hr />
                                <div className="mb-3 nav-item">
                                    <img className="mr-3" src={require("../media/ui/030-settings.svg")} alt="" />
                                    <h5 className="font-weight-normal"><Link className="nav-a" to="/settings">Nastavení</Link></h5>
                                </div>
                            </div>
                        </div>
                    </nav>
            </div>
            <div>
                    <nav className="navbarr z-depth-1">
                        <div className="navbar-container p-4 pr-5">
                            <Link to="/chat">
                                <div>
                                    <img style={{
                                        width: 30
                                    }} src={require("../media/ui/004-chat.svg")} alt="chat icon" />
                                </div></Link>
                           <div id="nav-name">
                                <h5 className="font-weight-bold">{myContext.name}</h5>
                                <h6>{(myContext.premissions === "user") ? "Uživatel" : "Administrátor"}</h6>
                           </div>
                           
                        </div>
                    </nav>
                <div id="content" className="ml-3">
                    {props.children}
                </div>
            </div>
        </div>
    </Styles>
    )
}
export default Navigation;