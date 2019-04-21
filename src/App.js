import React, { Component } from 'react';
import './App.scss';
import Login from './pages/Login';
import Home from './pages/Home';
import axios from 'axios';
import UserContext from './context/UserContext';
import { BrowserRouter, Route, Link } from "react-router-dom";

class App extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            user: null
        };

        this.getActiveUser()
            .then( user => {
                this.setState((state) => {
                    return {
                        user: user
                    };
                });
            });
    }

    logout = () => {
        axios.post('/auth/logout')
            .then(response => {
                if( response.status === 200 ) {
                    this.setState((state) => {
                        return {
                            user: null
                        };
                    });
                }
            });
    }

    getActiveUser() {
        return axios.get('/auth/user')
            .then( resp => {
                if( !!resp.data.user ) {
                    return resp.data.user;
                } else {
                    return null;
                }
            })
            .catch( err => {
                console.error( err );
                return null;
            });
    }

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                <BrowserRouter>
                    <div className="App">
                        <Header User={this.state.user} LogoutFunc={this.logout} />

                        <div className="container main">
                            <div className="columns">
                                <div className="column col-md-12">
                                    <Route exact path="/" component={Home} />
                                    <Route exact path="/login" component={Login} />
                                </div>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </UserContext.Provider>
        );
    }
}

function Header({ User, LogoutFunc }) {
    return (
        <div className="navbar">
            <section className="navbar-section">
                <Link to="/">Home</Link>
            </section>
            <section className="navbar-center">
                <div className="app-name">
                    { 'express-react-baseline' }
                </div>
            </section>
            <section className="navbar-section">
                {
                    !User &&
                    <Link to="/login">Sign In</Link>
                }
                {
                    User &&
                    <a href="#" onClick={LogoutFunc}>
                        Logout
                    </a>
                }
            </section>
        </div>
    );
}

export default App;