import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Worker from './components/Worker';
import Manager from './components/Manager'
import Statistics from './components/Statistics'
import * as serviceWorker from './serviceWorker';
import "../node_modules/bootstrap/scss/bootstrap.scss"
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import SubmitOrder from "./components/SubmitOrder";
import Navbar from 'react-bootstrap/Navbar'
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";

const colors=[
    "fekete",
    "szürke",
    "barna",
    "narancssárga"
]

const routing = (
    <Router>
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Válasszon menüpontot</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/worker">Worker</Nav.Link>
                        <NavDropdown title="Manager Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/manager">Manager</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/managerStatistics">Manager Statistics</NavDropdown.Item>

                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" render={(props) => <SubmitOrder {...props} colors={colors} />} />
            <Route path="/worker" component={Worker} />
            <Route path="/manager" component={Manager} />
            <Route path="/managerStatistics" component={Statistics} />
        </div>
    </Router>
)

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
