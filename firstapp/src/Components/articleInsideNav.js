import React, { Component } from 'react';
import { debounceIntervalDecorator ,SimpleAutoBind} from '../utils/Decorator';
import styles from './articleInsideNav.css';

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            headings:[]
        }
    }
    componentDidMount(){
        let ele = this.props.getElement();
        //ele md的父元素 children[0]代表的是md文件 的html 表达  children 是md的内容
        debugger
        let tags = ele.children[0].children;
        let Hs = [];
        // App.js文件中的div元素，这里是dom元素的操作
        this.articleBody = document.getElementById('articleMain')
        setTimeout(() => {
            for(let node of tags){
                if(node.tagName[0] === 'H' && node.tagName.length === 2){
                    Hs.push(node);
                }
            }
            this.setState({headings:Hs})
            this.timmer = setInterval(() => {
               //确定当前章节
               let i = 0;
               let currentIndex = null;
               for (ele of this.state.headings) {
                   if (this.isNodeInClient(ele).in) {
                       currentIndex = i;
                       break;
                   }
                   i++;
               }
               if (!currentIndex) {
                   for (let n = this.state.headings.length - 1; n > -1; n--) {
                       if (this.isNodeInClient(this.state.headings[n]).direction === 'top') {
                           currentIndex = n;
                           break
                       }
                   }
               }
               this.setState({ currentNode: currentIndex });
            },100)
        },1000)
    }

    @SimpleAutoBind
    @debounceIntervalDecorator(1000/40)
    clkHLink(getTimmer, h) {
        console.log('intervaling',h.tagName);
        let timmer = getTimmer();
        let rect = h.getBoundingClientRect();
        let speed = rect.top / 5;
        if (rect.top > -5 && rect.top < 5) {
            clearInterval(timmer);
        }
        if (Math.abs(this.articleBody.scrollTop + this.articleBody.clientHeight - this.articleBody.scrollHeight) <= 5 && speed > 0) {
            clearInterval(timmer);
        }
        this.articleBody.scrollBy(0, speed);
    }

    isNodeInClient(node) {
        let rect = node.getBoundingClientRect();  //返回一个DomRect对象的css边框集合，有left,right,bottom,top属性。
        let clientHeight = document.documentElement.clientHeight;   //当前页面可见区域的高度
        if (rect.bottom < clientHeight + rect.height / 2 && rect.top > 0 - rect.height / 2) {
            return {
                in: true
            }
        } else {
            return {
                in: false,
                direction: rect.bottom >= clientHeight + rect.height / 2 ? 'down' : 'top'
            }
        }
    }

    compomentWillUnmount(){
        clearInterval(this.timer)
    }

    render(){
        return (
            <div className = {styles.navBody}>
                {
                    this.state.headings.map((h,index) => (
                        <p
                         className={styles.paragraph}
                         onClick={()=>{this.clkHLink(h)}}
                         key={index}
                         style={{color: this.state.currentNode === index ? 'green' : 'black' ,marginBottom:5,paddingLeft:getPadding(h.tagName)}}>
                            {h.innerText}
                        </p>
                    ))
                }
            </div>
        )
    }
}
const getPadding = (level)=>{
    switch(level.toLowerCase()){
        case 'h1':
        return 0
        case 'h2':
        return 10
        case 'h3':
        return 20
        case 'h4':
        return 30
        case 'h5':
        return 40
        case 'h6':
        return 50
    }
}