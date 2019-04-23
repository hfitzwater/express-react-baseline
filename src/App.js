import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import UserContext from './context/UserContext';
import { BrowserRouter, Route, Link, withRouter, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';

import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Home from './pages/Home';
import Notifications from './pages/Notifications';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Reports from './pages/Reports';

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

    logout = (history) => {
        axios.post('/auth/logout')
            .then(response => {
                if( response.status === 200 ) {
                    this.setState((state) => {
                        return {
                            user: null
                        };
                    });

                    history.push('/');
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
        const RoutableApp = withRouter(({ history }) => (
            <div className="App">
                <Dashboard
                    top={
                        <Header user={this.state.user} logoutFunc={() => this.logout(history)} />
                    }
                    left={
                        <ul className="nav left full-height full-width bg-gray no-margin">
                            <li className="nav-item">
                                <Link to="/">Home</Link>
                            </li>
                            <LoggedInMenu user={this.state.user} />
                        </ul>
                    }
                    main={
                        <div className="container p-2">
                            <div className="columns">
                                <div className="column col-md-12">
                                    <Switch>
                                        <Route exact path="/" component={Home} />
                                        <Route path="/login" component={Login} />
                                        { this.state.user && <Route path="/notifications" component={Notifications} /> }
                                        { this.state.user && <Route path="/orders" component={Orders} /> }
                                        { this.state.user && <Route path="/products" component={Products} /> }
                                        { this.state.user && <Route path="/reports" component={Reports} /> }
                                        <Route component={NoMatch} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                    }
                    bottom={
                        <Footer />
                    }
                />
            </div>
        ));

        return (
            <UserContext.Provider value={this.state.user}>
                <BrowserRouter>
                    <RoutableApp />
                </BrowserRouter>
            </UserContext.Provider>
        );
    }
}

function Header({ user, logoutFunc }) {
    return (
        <div className="navbar p-2">
            <section className="navbar-section">
                <div className="app-name">
                    { 'express-react-baseline' }
                </div>
            </section>
            <section className="navbar-section">
                {
                    !user &&
                    <Link to="/login">Sign In</Link>
                }
                {
                    user &&
                    <a href="#" onClick={logoutFunc}>
                        Logout
                    </a>
                }
            </section>
        </div>
    );
}

function LoggedInMenu({ user }) {
    if( !user ) return '';

    return [
        <li className="nav-item full-width" key="notifications">
            <Link to="/notifications">Notifications</Link>
            <span className="menu-badge">
                <label className="label label-primary">2</label>
            </span>
        </li>,
        <li className="nav-item" key="orders">
            <Link to="/orders">Orders</Link>
        </li>,
        <li className="nav-item" key="products">
            <Link to="/products">Products</Link>
        </li>,
        <li className="nav-item" key="reports">
            <Link to="/reports">Reports</Link>
        </li>
    ];
}

function Footer() {
    return (
        <div className="full-width center p-2">
            express-react-baseline © 2019
        </div>
    );
}

export default App;