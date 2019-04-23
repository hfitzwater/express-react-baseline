import React, { Component } from 'react';
import signInImg from '../google_signin.png';

export default class Login extends Component {
    render() {
        return (
            <div className="login full-width center">
                <a href="/auth/google">
                    <img height="40px" src={signInImg} alt="Sign In"></img>
                </a>
            </div>
        );
    }
}