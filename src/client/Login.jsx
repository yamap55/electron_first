import React from 'React';
import jsforce from 'jsforce';
import DispatchableComponent from '../base/DispatchableComponent.js';

class Login extends DispatchableComponent {
  constructor(props, context) {
    super(props);
    this.state = {
      id : "",
      password : "",
      isBusy : false,
      isError : false
    };
  }

  propTypes : {
    setIsLogin : React.PropTypes.func.isRequired
  };

  statics : {
    conn : null
  };

  //salesforceへのログイン処理
  onLoginButtonClick(){
    this.setState({ isBusy: true });

    Login.conn = new jsforce.Connection()
    Login.conn.login(this.state.id,this.state.password, (err, res) => {
      if(err){
        this.setState({ isBusy: false, isError:true });
        return;
      }
      this.setState({ isBusy: false  });
        this.props.setIsLogin(true,this.state.id,this.state.password);
    });
  }

  render(){
    const {isLogin} = this.props;
    if (this.state.isBusy) {
      return (<div>{this.t("global.loading")}</div>);
    } else {
      // create Error Element.
      const error = this.state.isError
        ? (<div className="alert alert-danger" role="alert">
            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
            <span className="sr-only">Error:</span>
            {this.t("login.error")}
          </div>)
        : "";
      this.state.isError = false;

      return (
        <div>
          <div className="form-signin">
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
            {error}
          </div>
          <footer>
            <select id="language" value={this.props.language} onChange={(e)=>{this.props.setLanguage(e.target.value)}}>
              {["en","ja"].map((lng)=>(<option key={lng} value={lng}>{this.t("global.language."+lng)}</option>))}
            </select>
          </footer>
        </div>);
    }
  }
}

export default Login
