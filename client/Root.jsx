import React from 'react';
import jsforce from 'jsforce';
import Griddle from 'griddle-react';
import DataGrid from './DataGrid.jsx';
import Login from './Login.jsx';

class Root extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            isLogin:false
        };
    }

    setIsLogin(isLogin){
        this.setState({isLogin:isLogin});
    }

    render(){
        return (<div>
                {this.state.isLogin
                    ? (<DataGrid/>)
                    : (<Login setIsLogin={(isLogin)=>{this.setIsLogin(isLogin)}}/>)}
            </div>);
    }
}

export default Root
