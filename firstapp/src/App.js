import React, { Component } from 'react';
import stylesLess from './App2.less';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import  {Button, Menu } from 'antd';
import Nav from './Components/Nav';
// import Article from './Containers/Article';
// import ArticleList from './Containers/ArticleList';
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
                onChangeTag={this.changeTag} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
