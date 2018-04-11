import React, { Component } from 'react';
import stylesLess from './App.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  {Button, Menu } from 'antd';
import Nav from './Components/Nav';
import Article from './Containers/Article';
import ArticleList from './Containers/ArticleList';
import { observer } from 'mobx-react';
// import Timeline from './Containers/TimeLine';
import { SimpleAutoBind,waitingForDecorator,testDesc} from './utils/Decorator';

const SubMenu = Menu.SubMenu;
@observer
class App extends Component {
    constructor(props){
        super(props);
    }

    @SimpleAutoBind
    changeTag(tag){
        this.props.store.changeTag(tag);
    }

    @waitingForDecorator
	testClk(fin){
		let promise = new Promise((resolve)=>{
			console.log('promise start')
			setTimeout(()=>{resolve('asdadsads')},2000);
		});
		promise.then(rst=>{
			fin();
			console.log('promise Fin',rst);
		})
	}
    
  render() {
    const {store} = this.props;
    return (
      <BrowserRouter>
        <div className={stylesLess.body}>
        {/* 这个route是监控浏览器url变化的，比如直接输入url也可以实现跳转，但是Nav的跳转，必须点击才可以触发。 */}
            <Route 
                path='/:tag/:name' 
                render = {(props) => {
                    if(store.currentTag !== props.match.params.tag){
                        store.changeTag(props.match.params.tag);
                    }
                    return null;
                }}
            />
            <Nav fileMap={store.FileMapCount}
                displayMode={store.displayMode}
                tag={store.currentTag}
                onChangeTag={this.changeTag} 
                />
            <div id = 'articleMain' style={{ height: '100%', width: 'auto', overflow: 'scroll', background: '#fff', overflowX: 'hidden' }}>
                <Switch>
                    {/* 文章显示区 */}
                    <Route path='/:tag/:name' component={Article} />
                    <Route path= '/' render={(props) => {
                        return (<ArticleList fileMap={this.props.store.FileMap} tag={this.props.store.currentTag} />)
                    }} />
                </Switch>
            </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
