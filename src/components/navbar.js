import React, { useContext, useRef } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { MyContext } from '../components/userdata';

// css  //
import '../css/navbar.css';
// import { NavLink } from 'react-bootstrap';

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
    console.log(props.location.pathname);
    let location = props.location.pathname;

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
                            <div className="items-wrapper">
                                <div className={"mb-2 nav-item-main" + (location == "/prehled" ? " nav-item-main-active" : " ")}>
                                    <img className="mb-3" src={require("../media/ui/021-news.svg")} alt="" />
                                    <h6 className="font-weight-normal"><a className="nav-a">Přehled</a></h6>
                                    <Link className="link-wrap" to="/prehled" ></Link>
                                </div>
                                <div className={"mb-2 nav-item-main" + (location == "/objednavky" ? " nav-item-main-active" : " ")}>
                                    <img className="mb-3" src={require("../media/ui/021-news.svg")} alt="" />
                                    <h6 className="font-weight-normal"><a className="nav-a">Moje objednávky</a></h6>
                                    <Link className="link-wrap" to="/objednavky" ></Link>
                                </div>
                                <div className={"mb-2 nav-item-main" + (location == "/users" ? " nav-item-main-active" : " ")}>
                                    <img className="mb-3" src={require("../media/ui/001-account.svg")} alt="" />
                                    <h6 className="font-weight-normal"><a className="nav-a" to="/users">Uživatelé</a></h6>
                                    <Link className="link-wrap" to="/users" ></Link>
                                </div>
                                <div className={"mb-2 nav-item-main" + (location == "/settings" ? " nav-item-main-active" : " ")}>
                                    <img className="mb-3" src={require("../media/ui/030-settings.svg")} alt="" />
                                    <h6 className="font-weight-normal"><a className="nav-a">Nastavení</a></h6>
                                    <Link className="link-wrap" to="/settings" ></Link>
                                </div>
                            </div>
                        </div>
                    </nav>
            </div>
            <div>
                    <nav className="navbarr z-depth-1">
                        <div className="navbar-container p-3 pr-5">
                            <Link to="/chat">
                                <div>
                                    <img style={{
                                        width: 30
                                    }} src={require("../media/ui/004-chat.svg")} alt="chat icon" />
                                </div></Link>
                           <div id="nav-name">
                                <p className="font-weight-bold m-0">{myContext.name}</p>
                                {/* <p>{(myContext.premissions === "user") ? "Uživatel" : "Administrátor"}</p> */}
                                
                           </div>
                           <p style={{cursor: 'pointer'}} className="ml-5 mb-0" onClick={() => {localStorage.clear(); window.location.reload(false);}}>Odhlásit se</p>
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
export default withRouter(Navigation);