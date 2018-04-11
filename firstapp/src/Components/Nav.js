import { Menu, Badge,Icon } from 'antd';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './nav.css';

@withRouter
export default class extends Component {
    render(){
        return (<div style={{ width: 200, height: '100%', float: 'left',background:'#fff',borderRight:'1px solid #e9e9e9',position:'relative'}}>
            <Menu
             selectedKeys={[this.props.tag]}
             mode='inline'>
             {
                Object.keys(this.props.fileMap || []).map(tag => {
                    return (
                        <Menu.Item key={tag}>
                            <div
                                onClick={() => {
                                    this.props.onChangeTag(tag);
                                    this.props.history.push('/');
                                }}>
                                <p style={{ display:'inline-block',fontSize:24,width:120 }} >{tag}</p>
                                <Badge count={this.props.fileMap[tag]} style={{ marginLeft: 10,marginBottom:5,backgroundColor: '#52c41a' }} />
                            </div>
                        </Menu.Item>)
                })
            }
            </Menu>
        </div>)
    }
}