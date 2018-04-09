import React, { Component } from 'react';
import styles from './bq.css';
export default class extends Component {
    render() {
        console.log(this.props);
        return (
            <div className = {styles.bq} >
            {
                this.props.children
            }    
            </div>
        )
    }
}