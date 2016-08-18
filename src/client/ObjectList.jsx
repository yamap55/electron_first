import React from 'react';
import Login from './Login.js';
import DataGrid from './DataGrid.js'

class ObjectList extends React.Component{
    constructor(props) {
        super(props);
        this.func = props.func;

        this.state = {
            options:[]
        };
        Login.conn.describeGlobal((a,b)=>{
                const objectList = b.sobjects.filter((o)=>{
                    return o.queryable && o.layoutable && o.createable;
                }).map(x=>({name:x.name,label:x.label})).sort((a,b)=>{
                    if( a.label<b.label ) return -1;
                    if( a.label>b.label ) return 1;
                    return 0;
                });
                const options = objectList.map(
                    o=>(<option value={o.name} key={o.name} onClick={e=>{this.func(e.target.value, true)}}>{o.label + "（"+o.name+"）"}</option>));
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
