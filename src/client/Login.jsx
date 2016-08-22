import React from 'React';
import jsforce from 'jsforce';
import DispatchableComponent from '../base/DispatchableComponent.js';

class Login extends DispatchableComponent {

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
        ? (<div>{this.t("global.loading")}</div>)
        : (<div className="form-signin">
                <h2 className="form-signin-heading">{this.t("login.message")}</h2>
                <div className="form-group">
                    <label htmlFor="id">{this.t("login.username")}</label>
                    <input id="id" type="email" className="form-control" placeholder={this.t("login.username")} value={this.state.id} onChange={e=>{this.setState({id:e.target.value})}} />
                    <label htmlFor="password">{this.t("login.password")}</label>
                    <input id="password" type="password" className="form-control" placeholder={this.t("login.password")} value={this.state.password}  onChange={e=>{this.setState({password:e.target.value})}} />
                </div>
                <div className="form-group">
                    <input type="button" value={this.t("login.loginbuttontext")} className="btn btn-primary btn-block"  onClick={()=>{this.onLoginButtonClick(this.state.id,this.state.password)}} />
                </div>
            </div>);
    }
}

export default Login
