import React from 'react';
import Login from './Login.jsx';

class ObjectList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            objectList:[]
        };
        Login.conn.describeGlobal((a,b)=>{
                const objectList = b.sobjects.filter((o)=>{
                    return o.queryable && o.layoutable && o.createable;
                }).map(x=>({name:x.name,label:x.label})).sort((a,b)=>{
                    if( a.label<b.label ) return -1;
                    if( a.label>b.label ) return 1;
                    return 0;
                });
                this.setState({ objectList: objectList });
            }
        );
    }

    render(){
        if (this.state.objectList) {
            const options = this.state.objectList.map(
                o=>(<option value={o.name} key={o.name}>{o.label + "（"+o.name+"）"}</option>));
            return (<select size="10">{options}</select>)
        } else {
            return (<select size="10"></select>);
        }
    }
}
export default ObjectList
