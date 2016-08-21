import React from 'react';
import jsforce from 'jsforce';
import Griddle from 'griddle-react';
import DataGrid from './DataGrid.js';
import Login from './Login.js';
import Provider from '../base/Provider.js';

class Root extends Provider {
    constructor(props) {
        super(props);

        this.state = {
            isLogin:false,
            id:'',
            password:''
        };
    }

    setIsLogin(isLogin,id,password){
        this.setState({isLogin:isLogin,id:id,password:password});
    }

    render(){
        return (<div>
                {this.state.isLogin
                    ? (<DataGrid id={this.state.id} password={this.state.password}/>)
                    : (<Login setIsLogin={(isLogin,id,password)=>{this.setIsLogin(isLogin,id,password)}}/>)}
            </div>);
    }
}

export default Root
