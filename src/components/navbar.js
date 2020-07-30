import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { MyContext } from '../components/userdata';

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

const Navigation = () => {

    const myContext = useContext(MyContext);
    return(
    <Styles>
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand><img src={require('../media/logo.svg')} alt="logo"/></Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="ml-auto">
                        <Nav.Item><Link className="nav-link nav-text" to="/">Moje objednávky</Link></Nav.Item>
                        <Nav.Item><Link className="nav-link nav-text" to="/about">O nás</Link></Nav.Item>
                        <NavDropdown title={myContext.name} className="nav-text" id="nav-dropdown">
                        <Link className="dropdown-item" to="/users">Správa uživatelů</Link>
                            <Link className="dropdown-item" to="/settings">Nastavení</Link>
                            <NavDropdown.Divider />
                            <NavDropdown.Item eventKey="4.4">Odhlásit se</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </Styles>
    )
}
export default Navigation;