import React, { Component } from 'react';
import Article from '../Components/ArticleBody';
import AINav from '../Components/articleInsideNav';
import {message} from 'antd'
import { SimpleAutoBind } from '../utils/Decorator'
const FileMap = require('../articlesHelper/fileMap.json');
const Gitment = require('gitment');
require('gitment/style/default.css');

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        let {match:{params}} = this.props;
        if(FileMap[params.tag] && FileMap[params.tag][params.name] === true){   //存在改文章路径
            import (`../articles/${params.tag}/${params.name}`).then(md => {
                this.setState({md:md.getArticle()})
            })
        }else{
            message.info('该路径不存在')
        }
    }
   
    render(){
        return (
            <div style={{padding:10}}>
                <div ref={(ins) => {
                    this.articleIns = ins
                }}
                style={{width:'95%',margin:'0 auto'}}>
                    <Article source = {this.state.md || null} />
                </div>
                {
                    this.articleIns && <AINav getElement = {()=>{return this.articleIns}} />
                }
            </div>
        )
    }
}