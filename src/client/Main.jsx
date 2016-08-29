import React from 'React';
import DataGrid from './DataGrid.js'
import First from './First.js'
 import DispatchableComponent from '../base/DispatchableComponent.js';

class Main extends DispatchableComponent {
  constructor(props) {
    super(props);

    this.state = {
      id : props.id,
      password : props.password,
      page : 0,
      backFunction : ()=>{return true},
      nextFunction : ()=>{return true}
    };
  }

  render(){
    console.log("page : " + this.state.page);

    let nextPage;
    switch(this.state.page) {
      case 0 :
        nextPage = (<DataGrid id={this.state.id} password={this.state.password}/>);
        break;
      case 1 :
        nextPage = (<First setBackButtonFunction={(func)=>{this.state.backFunction = func}} setNextButtonFunction={(func)=>{this.state.nextFunction = func}} />);
        break;
    }

    return (<div>
              {nextPage}
              <div>
                <input type="button" className={this.state.page <= 0 ? "btn pull-left disabled" : "btn pull-left"} value="BACK" onClick={e=>{this.state.backFunction() ? this.setState({page:--this.state.page}):""}} disabled={this.state.page <= 0} />
                <input type="button" className="btn pull-right" value="NEXT" onClick={e=>{this.state.nextFunction() ? this.setState({page:++this.state.page}):""}}/>
              </div>
            </div>);
  }
}

export default Main
