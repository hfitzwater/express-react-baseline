import React, { Component } from 'react';

export default class NoMatch extends Component {
    render() {
        return (
            <div className="empty">
                <p className="empty-title h5">Sorry</p>
                <p className="empty-subtitle">I'm not sure what you are looking for.</p>
            </div>
        );
    }
}