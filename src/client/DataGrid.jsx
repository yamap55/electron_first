import React from 'React';
import Griddle from 'griddle-react';
import Login from './Login.js';
import ObjectList from './ObjectList.js'
import FieldsList from './FieldsList.js'
import {remote} from 'electron';
import DispatchableComponent from '../base/DispatchableComponent.js';
const dialog = remote.dialog;
const BrowserWindow = remote.BrowserWindow

class DataGrid extends DispatchableComponent {

    constructor(props) {
        super(props);

        this.state = {
            isBusy:false,
            soqlText:"SELECT Id, Name,Industry,AnnualRevenue FROM Account",
            records:null,
            id:props.id,
            password:props.password,
            objectId:"",
            filePath: ""
        };
        this.objectId = "";
    }

    //SOQLを発行しデータを取得
    onGetButtonClick(){
        this.setState({ isBusy: true  });
        Login.conn.query(this.state.soqlText, (err, res) => {
            if (err) {
                this.setState({ records: null  });
                console.log(JSON.stringify(err));
                this.setState({ isBusy: false  });
                return
            }

            try{
                const result = res.records.map(x => { delete x.attributes; return x;});
                this.setState({ records: result  });
                this.setState({ isBusy: false  });
            } catch(err) {
                alert(err);
            }
        });
    }
    hoge(){
        const subWindow = new BrowserWindow({width: 800, height: 600});
        subWindow.loadURL('https://login.salesforce.com/');
        subWindow.webContents.executeJavaScript('document.getElementById("username").value = "' + this.state.id +'"');
        subWindow.webContents.executeJavaScript('document.getElementById("password").value = "' + this.state.password +'"');
        subWindow.webContents.executeJavaScript('document.getElementById("Login").click()');
    }

    changeObject(objectId){
        this.state.objectId = objectId;
    }

    getFile(){
      const focusedWindow = BrowserWindow.getFocusedWindow();
        dialog.showOpenDialog(focusedWindow, {
          properties: ['openFile'],
          filters: [{
          name: 'JSON File',
          extensions: ['json']
        }]},
        (files)=>{
          const path = files ? files[0] : "";
          this.setState({ filePath: path });
        }
      );
    }

    render(){
        DataGrid.objectId = this.state.objectId;
        return this.state.isBusy
            ? <div>Loading...</div>
            : (<div>
                <input type="button" name="fileselect" className="btn" onClick={()=>{this.getFile()}} value="Setting File"/>
                <input type="text" name="filepath" className="form-control" placeholder="Setting File Path" value={this.state.filePath} onClick={()=>{this.getFile()}} />
                <div><input type="button" value="CLICK ME" className="btn" onClick={()=>{this.hoge(this.state.id,this.state.password)}}/></div>
                <div><ObjectList changeSelectedObject={(objectId)=>this.setState({objectId:objectId})} selectedValue={this.state.objectId}/></div>
                <div><FieldsList objectId={this.state.objectId} /></div>
                <textarea
                    value={this.state.soqlText}
                    className="form-control"
                    onChange={e=>{this.setState({soqlText:e.target.value})}}
                /><br/>
                <input
                    type="button"
                    value="Exec SOQL"
                    className="btn"
                    onClick={()=>{this.onGetButtonClick()}}
                />
                {this.state.records
                    ?   <Griddle
                            results={this.state.records}
                            showFilter={true}
                            resultsPerPage={20}
                        />
                    :   <div/>}
                </div>);
    }
}

export default DataGrid
