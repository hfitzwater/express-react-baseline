import React, { Component } from 'react';
import Resizer from '../resizer/Resizer';

export default class Dashboard extends Component {
    leftPanel = null;
    rightPanel = null;

    render() {
        let content = (
            <div className="dashboard">
                <div className="fill-vertical">
                    { top(this.props.top) }
                    <div className="fill-horizontal">
                        { left(this.props.left) }
                        { main(this.props.main) }
                        { right(this.props.right) }
                    </div>
                    { bottom(this.props.bottom) }
                </div>
            </div>
        );

        return content;
    }
};

function top( content ) {
    if( !content ) return '';

    return (
        <div className="top">
            {content}
        </div>
    )
}

function left( content ) {
    if( !content) return '';

    return (
        <div className="left-panel full-height">
            {content}
            <Resizer inverse={true} storageKey={"left"}></Resizer>
        </div>
    )
}

function main( content ) {
    const innerStyle = {
        padding: '8px'
    };

    return (
        <div className="main-panel">
            <div style={innerStyle}>
                {content}
            </div>
        </div>
    );
}

function right( content ) {
    if( !content) return;

    return (
        <div className="right-panel">
            <Resizer storageKey="right"></Resizer>
            <div>
                {content}
            </div>
        </div>
    );
}

function bottom( content ) {
    if( !content ) return '';

    return (
        <div className="bottom-panel">
            {content}
        </div>
    )
}