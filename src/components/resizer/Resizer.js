import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Resizer extends Component {
    constructor( props ) {
        super( props );

        this.dragState = {
            element: null,
            moving: false,
            xPos: null,
            storageKey: props.storageKey ? props.storageKey : null
        };

        this.resize = this.resizePanel.bind(this);
        this.up = this.mouseUp.bind(this);
    }

    loadInitialWidth( storageKey=null ) {
        if( !storageKey ) return null;

        let initialX = parseInt(localStorage.getItem( storageKey ));
        return initialX ? initialX : null;
    }

    saveInitialWidth( storageKey=null, value ) {
        if( !storageKey ) return;

        localStorage.setItem( storageKey, value );
    }

    componentDidMount() {
        this.dragState.element = ReactDOM.findDOMNode(this);
        const width = this.loadInitialWidth( this.dragState.storageKey );
        if( width ) {
            this.dragState.element.parentNode.style.width = width + 'px';
        }
    }

    mouseDown( evt ) {
        this.dragState.moving = true;
        this.dragState.xPos = evt.nativeEvent.x;

        document.addEventListener('mousemove', this.resize, false);
        document.addEventListener('mouseup', this.up, false);
    }

    mouseUp( evt ) {
        document.removeEventListener('mousemove', this.resize, false);

        this.resizePanel( evt );

        this.dragState.moving = false;
        this.dragState.xPos = null;
    }

    resizePanel( evt ) {
        if( !this.dragState.moving ) return;

        const parent = this.dragState.element.parentNode;
        const deltaX = (this.dragState.xPos - evt.x) * (this.props.inverse ? -1 : 1);
        const newWidth = (parseInt(getComputedStyle(parent, '').width) + deltaX);

        this.dragState.xPos = evt.x;
        this.saveInitialWidth( this.dragState.storageKey, newWidth );
        parent.style.width = newWidth + 'px';
    }

    render() {
        return (
            <div
                className="gutter"
                onMouseDown={(e) => this.mouseDown(e)}>
            </div>
        );
    }
}