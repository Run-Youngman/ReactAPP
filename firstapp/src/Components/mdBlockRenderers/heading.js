import React, { Component } from 'react';
import styles from './h.css'
export default class extends Component {
    render() {
        // console.log(this.props);
        return (
            getHeadTag(this.props.level, this.props.children)
        )
    }
}
const getHeadTag = (level, text) => {
    switch (level) {
        case 1:
            return (<h1 style = {{fontSize:'2.4em'}}>{text}</h1>)
        case 2:
            return (<h2 style = {{fontSize:'2.1em'}}>{text}</h2>)
        case 3:
            return (<h3 style = {{fontSize:'1.7em'}}>{text}</h3>)
        case 4:
            return (<h4 style = {{fontSize:'1.4em'}}>{text}</h4>)
        case 5:
            return (<h5 style = {{fontSize:'1.2em'}}>{text}</h5>)
        case 6:
            return (<h6 style = {{fontSize:'1.0em'}}>{text}</h6>)
        default:
        return (<h1 style = {{fontSize:'2.4em'}}>{text}</h1>)
    }
}