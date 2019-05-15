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


var shutters=[
    {
        "_id": "5cd9c2eb1ff70cf55f7fca7d",
        "shutter": {
            "material": "acél",
            "price": "12000",
            "parts": [
                {
                    "requiredPart": "vezetősín",
                    "additionalPart": "csavar",
                    "additionalPartPieces": "4"
                }
            ]
        }
    },
    {
        "_id": "5cd9c2f61ff70cf55f7fca7e",
        "shutter": {
            "material": "műanyag",
            "price": "10000",
            "parts": [
                {
                    "requiredPart": "heveder",
                    "additionalPart": "vastag csavar",
                    "additionalPartPieces": "6"
                }
            ]
        }
    },
    {
        "_id": "5cd9c3031ff70cf55f7fca7f",
        "shutter": {
            "material": "fa",
            "price": "8000",
            "parts": [
                {
                    "requiredPart": "redőnyléc",
                    "additionalPart": "anyacsavar",
                    "additionalPartPieces": "3"
                }
            ]
        }
    }

]


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
            <Route exact path="/" render={(props) => <SubmitOrder {...props} colors={colors} shutters={shutters}/>} />
            <Route exact path="/worker" render={(props) => <Worker {...props} shutters={shutters} />}/>
            <Route exact path="/manager" component={Manager} />
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
