import React, { Component } from 'react';
import { Card, Tag } from 'antd';
import styles from './ArticleList.css';
import { Link } from 'react-router-dom';
const { Meta } = Card;

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            articleData:[]
        }
    }

    componentDidMount(){
        if(this.props.tag){
            this.getArticles(this.props);
        }
    }
    componentWillReceiveProps(p1){
        if(p1.tag){
            this.getArticles(p1)
        }
    }
    getArticles(props){
        let articleData = [];
        Object.keys(this.props.fileMap[props.tag]).map(articleName => {
            let helper = require('../articles/'+ props.tag + '/' + articleName);
            let basicInfo = helper.getBasicInfo();
            let time = new Date(basicInfo.time);
            basicInfo.menTime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日' + ' '+time.getHours()+'时' + time.getMinutes()+'分' ;
            articleData.push({
                basicInfo: basicInfo,
                overviewPic: helper.getOverviewPic(),
                title: articleName,
                tag: props.tag
            })
            this.setState({articleData})
        })
    }
    render(){
        return (
            <div>
                {
                    this.state.articleData.map(data => {
                        return (
                            <div key = {data.menTime+data.title} className={styles.al+ ' ' + styles.articleBox} style={{ width: 350, height: '250px', padding: 5, float: 'left' ,margin:10}} >
                                <Card
                                    // hoverable={true}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <div style={{ width: '100%', height: 150 }}>
                                        <img style={{ height: '100%', width: '100%' }} alt="暂无图片" src={data.overviewPic} />
                                    </div>
                                    <Tag style={{ margin: '10px 0 10px' }} color="blue">{'发布时间：' + data.basicInfo.menTime}</Tag>
                                    <br />
                                    <Tag color="#444"><Link to={`/${data.tag}/${data.title}`}>{'标题：' + data.title}</Link></Tag>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}