import React, { Component } from 'react';
import './App.scss';
import Login from './pages/Login';
import Home from './pages/Home';
import axios from 'axios';
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
            <BrowserRouter>
                <div className="App">
                    <Header User={this.state.user} />

                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    {
                        this.state.user &&
                        <button onClick={this.logout}>
                            Logout
                        </button>
                    }
                </div>
            </BrowserRouter>
        );
    }
}

function Header({ User }) {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {
        !User &&
        <li>
            <Link to="/login">Login</Link>
        </li>
      }
    </ul>
  );
}

export default App;
