import React from 'react';
import jsforce from 'jsforce';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            password: "",
            isBusy:false
        };
    }

    propTypes:{
        setIsLogin:React.PropTypes.func.isRequired
    };

    statics: {
        conn:null
    };

    //salesforceへのログイン処理
    onLoginButtonClick(){
        this.setState({ isBusy: true  });

        Login.conn = new jsforce.Connection()
        Login.conn.login(this.state.id,this.state.password , (err, res) => {
            if(err){
                this.setState({ isBusy: false  });
                return;
            }

            this.setState({ isBusy: false  });
            this.props.setIsLogin(true,this.state.id,this.state.password);
        });
    }

    render(){
        const {isLogin} = this.props;
        return this.state.isBusy
        ? (<div>Loading...</div>)
        : (<div>
                <label>Id:</label><input className="block" value={this.state.id} onChange={e=>{this.setState({id:e.target.value})}}/><br/>
                <label>Password + token:</label><input type="password" value={this.state.password} onChange={e=>{this.setState({password:e.target.value})}}/><br/>
                <input type="button" value="Login" onClick={()=>{this.onLoginButtonClick(this.state.id,this.state.password)}}/>
            </div>);
    }
}

export default Login
