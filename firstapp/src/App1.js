import React, { Component } from 'react';
import logo from './logo.svg';
import styles from './App.css';
import {Input} from 'antd';
import {observer} from 'mobx-react'

@observer
class App extends Component {
  onBthClick(){
    console.log('sadasd');
    this.props.store.generate1()
  }
  onBthClick2(){
    // console.log('dasd',);
  }
  // componentDidMount(){
  //   setInterval(()=>{
  //     this.forceUpdate()
  //   },1000);
  // }
  render() {
    console.log('123',this.props.store.index)
    return (
      <div className="App">
        <Input value={this.props.store.generate} />

        <button onClick={this.onBthClick.bind(this)}>  123</button>

        <button onClick={this.onBthClick2.bind(this)}>  123</button>
      </div>
    );
  }
}

export default App;
