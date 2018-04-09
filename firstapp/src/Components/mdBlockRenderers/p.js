import React, { Component } from 'react';
import styles from './p.css'
export default class extends Component {
    render() {
        // console.log(this.props);
        return (
            <p className = {styles.mdp}  >
                {
                    this.props.children
                }
            </p>
        )
    }
} 