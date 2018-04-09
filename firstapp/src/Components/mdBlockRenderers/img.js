import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
@withRouter
export default class extends Component {

    render() {
        //本地图片
        let theImg = null;
        if (/\\src\\articles/.test(this.props.src)) {
            let path = (this.props.src.split('\\src\\')[1]);
            path = path.split('\\');
            path.shift();
            path = path.join('/').split('?')[0];
            path = path.split('/');
            path = path[path.length -1];
            theImg = require(`../../articles/${this.props.match.params.tag}/${this.props.match.params.name}/imgs/${path}`);
            // console.log(this.props);
        }else{
            //网络图片
            theImg = this.props.src;
        }
        return (
            <img alt = '暂无图片' src = {theImg} style = {{display:'block',margin:'0 auto'}} />
        )
    }
}