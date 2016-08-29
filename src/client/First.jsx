import React from 'React';
import DataGrid from './DataGrid.js'
 import DispatchableComponent from '../base/DispatchableComponent.js';

class First extends DispatchableComponent {
  constructor(props) {
    super(props);
  }

  render(){
    this.props.setBackButtonFunction(()=>{console.log("back");return true;});
    this.props.setNextButtonFunction(()=>{console.log("next");return true;});
    return (<div>test</div>);
  }
}

export default First
