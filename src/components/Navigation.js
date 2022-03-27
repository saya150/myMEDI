import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import {
    Link
} from "react-router-dom";
import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Wallet from './Wallet'


const Navigation = (account) => {
    return (
        <Navbar expand="lg" bg="secondary" variant="dark">
            <Container>
                

                <p>&nbsp;</p> <h3>myMEDI</h3>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/createRecord">Create Record</Nav.Link>
                        <Nav.Link as={Link} to="/view">View Records</Nav.Link>
                       
                    </Nav>
                    <br/>
                    <Nav>
                        <Wallet/>
                    </Nav>

                
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Navigation;