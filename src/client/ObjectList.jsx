import React from 'react';
import Login from './Login.js';
import DataGrid from './DataGrid.js'
import DispatchableComponent from '../base/DispatchableComponent.js';

class ObjectList extends DispatchableComponent {
  constructor(props) {
    super(props);

    this.state = {
      options : []
    };
    Login.conn.describeGlobal((a,b)=>{
      const options = b.sobjects.filter((o)=>{
        return o.queryable && o.layoutable && o.createable;
      }).sort((a,b)=>{
        if( a.label<b.label ) return -1;
        if( a.label>b.label ) return 1;
        return 0;
      }).map(o=>(<option value={o.name} key={o.name} onClick={e=>{props.changeSelectedObject(e.target.value, true)}}>{o.label + "（"+o.name+"）"}</option>));
        this.setState({ options: options });
      }
    );
  }

  render(){
    if (this.state.options) {
      return (<select className="form-control" size="10" value={this.props.selectedValue}>{this.state.options}</select>)
    } else {
      return (<select className="form-control" size="10"></select>);
    }
  }
}
export default ObjectList
