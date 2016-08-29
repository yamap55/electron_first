import React from 'react';
import jsforce from 'jsforce';
import Griddle from 'griddle-react';
import DataGrid from './DataGrid.js';
import Login from './Login.js';
import Main from './Main.js';
import Provider from '../base/Provider.js';

class Root extends Provider {
  constructor(props) {
    super(props);

    this.state = {
      isLogin : false,
      id : '',
      password : '',
      language : this.i18next.options.lng
    };
  }

  setIsLogin(isLogin,id,password){
    this.setState({isLogin:isLogin,id:id,password:password});
  }

  setLanguage(lng){
    this.i18next.changeLanguage(lng);
    this.setState({language:lng});
  }

  render(){
    return (<div>
      {this.state.isLogin
          ? (<Main id={this.state.id} password={this.state.password} />)
          : (<Login language={this.state.language} setLanguage={(lng)=>{this.setLanguage(lng)}} setIsLogin={(isLogin,id,password)=>{this.setIsLogin(isLogin,id,password)}}/>)}
      </div>);
  }
}

export default Root
