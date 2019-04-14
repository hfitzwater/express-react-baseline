import React, { Component } from 'react';
import axios from 'axios';

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
            <p>
                {"Home"}
                {
                    <button onClick={this.hello}>
                        Say Hello
                    </button>
                }
            </p>
        )
    }
}