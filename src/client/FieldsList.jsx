import React from 'react';
import Login from './Login.js';
import L from 'lodash';

class FieldsList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            fields:null,
            objectId:props.objectId,
            isBusy:false
        };
    }

    getObjectFields(objectId) {
        if(objectId) {
            this.state.isBusy = true;
            Login.conn.describe(objectId, (err, meta) => {
                if (err) { return console.error(err); }
                const fields = meta.fields.filter(
                    (field)=>{return field.name.toLowerCase() == "id" || field.createable || field.updateable}
                ).sort((a,b)=>{
                    if( a.label<b.label ) return -1;
                    if( a.label>b.label ) return 1;
                    return 0;
                }).map((field)=>({name:field.name, label:field.label}));
                this.state.isBusy = false;
                this.state.changed = true;
                this.setState({ fields: fields});
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
      return !(this.state.objectId === nextState.objectId &&
               this.props.objectId === nextProps.objectId &&
               L.isEqual(this.state.fields,nextState.fields)
           );
    }

    render(){
        if (this.state.isBusy || !this.props.objectId) {
            // Updating or First Access.
            return (<div><select className="form-control"></select><div className="fieldsArea"></div></div>);
        } else if(this.state.changed) {
            // Fields update.
            const options = this.state.fields.map((field)=>(<option value={field.name} key={field.name}>{field.label + "（"+field.name+"）"}</option>));
            const checkboxs = this.state.fields.map((field)=>(
                <div className="checkbox" key={field.name}><label><input type="checkbox" value={field.name}/>{field.label}</label></div>
            ));
            this.state.changed = false;
            return (<div><select className="form-control">{options}</select><div className="fieldsArea">{checkboxs}</div></div>);
        } else {
            // Search ObjectId changeed.
            this.getObjectFields(this.props.objectId);
            return (<div><select className="form-control"></select><div className="fieldsArea"></div></div>);
        }
    }
}
export default FieldsList
