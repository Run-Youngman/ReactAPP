import React, { Component } from 'react';
import styles from './list.css'
export default class extends Component {
    render() {
        // console.log(this.props);
        return (
            <div className={styles.mdList}>
                {
                    this.props.ordered ?
                        <ol className={styles.mdp}  >
                            {this.props.children}
                        </ol>
                        :
                        <ul className={styles.mdp}  >
                            {this.props.children}
                        </ul>
                }
            </div>
        )
    }
}