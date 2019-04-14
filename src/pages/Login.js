import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return (
            <div className="LoginForm">
                <a href="/auth/google">
                    Login with Google
                </a>
            </div>
        );
    }
}