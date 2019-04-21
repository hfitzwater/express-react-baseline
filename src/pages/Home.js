import React, { Component } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';

export default class Home extends Component {    
    hello = () => {
        return axios.get('/api/v1/hello')
            .then( resp => {
                alert( resp.data.message );
            })
            .catch( err => {
                console.error( err );
            });
    }

    render () {
        return (
            <UserContext.Consumer>
                {
                    (user) => (
                        <div>
                            <div>
                                {
                                    user && 
                                    <h2>
                                        {'Welcome, ' + user.firstName}
                                    </h2>
                                }
                            </div>
                            {
                                <span>
                                    { !user && 'Please Sign in to ' }
                                </span>
                            }
                            <button onClick={this.hello}>
                                Say Hello
                            </button>
                        </div>
                    )
                }
            </UserContext.Consumer>
        );
    }
}