import React, { Component } from 'react';
import styles from './table.css';

export default class extends Component {
    render() {
        // console.log(this.props);
        return (
            <div className={styles.mdtable}>
                <table class={styles.mdtable}>
                    {
                        this.props.children
                    }
                </table>
            </div>
        )
    }
}