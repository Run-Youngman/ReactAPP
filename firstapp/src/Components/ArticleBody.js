import React, { Component } from 'react';
import RMD from 'react-markdown';
import Code from './mdBlockRenderers/code';
import P from './mdBlockRenderers/p';
import Head from './mdBlockRenderers/heading';
import List from './mdBlockRenderers/list';
import Table from './mdBlockRenderers/table';
import Img from './mdBlockRenderers/img';
// import HTML from './articleHtml';
import BQ from './mdBlockRenderers/blockquote';

export default (props) => {
    return (
        <RMD source = {props.source||'找不到该文章'}
        renderers = {{
            paragraph :P,
            code:Code,
            heading:Head,
            list:List,
            table:Table,
            image:Img,
            blockquote:BQ
            // root:HTML
        }}
        />
    )
}
