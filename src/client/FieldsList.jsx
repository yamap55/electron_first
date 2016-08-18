import React from 'react';
import Login from './Login.js';
import L from 'lodash';

class FieldsList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            options:null,
            objectId:props.objectId,
            isBusy:false
        };
    }

    getObjectFields(objectId) {
        if(objectId) {
            this.state.isBusy = true;
            Login.conn.describe(objectId, (err, meta) => {
                if (err) { return console.error(err); }
                console.log(meta.fields);
                const fieldsList = meta.fields.filter(
                    (field)=>{return field.name.toLowerCase() == "id" || field.createable || field.updateable}
                ).map((field)=>({name:field.name, label:field.label})).sort(
                    (a,b)=>{
                        if( a.label<b.label ) return -1;
                        if( a.label>b.label ) return 1;
                        return 0;
                    });
                const options = fieldsList.map(
                    o=>(<option value={o.name} key={o.name}>{o.label + "（"+o.name+"）"}</option>));
                this.state.isBusy = false;
                this.setState({ options: options});
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
      return !(this.state.objectId === nextState.objectId &&
               this.props.objectId === nextProps.objectId &&
               L.isEqual(this.state.options,nextState.options)
           );
    }

    render(){
        if (this.state.isBusy || !this.props.objectId) {
            return (<select className="form-control" size="10"></select>);
        } else {
            this.getObjectFields(this.props.objectId);
            return (<select className="form-control" size="10">{this.state.options}</select>);

        }
    }
}
export default FieldsList
