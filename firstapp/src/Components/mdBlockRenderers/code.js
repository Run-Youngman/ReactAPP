import React, { Component } from 'react';
import { highlight, languages } from 'prismjs';
import ReactHtmlParser from 'react-html-parser';
import 'prismjs/themes/prism.css';

export default class extends Component {
    componentDidMount(){        
        const html = highlight(this.props.value, languages[this.props.language]);
        // document.getElementById('codeContaioner').innerHTML = html;
        this.ins.innerHTML = html;
    }
    render() {
        const cls = `language-${this.props.language}`;
        return (
            <pre className={cls}>
                <code className={cls} ref = {(ins)=>{this.ins = ins}}>
                </code>
            </pre>
        );
    }
}