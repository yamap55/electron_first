import React from 'react';
import Griddle from 'griddle-react';
import Login from './Login.jsx';
import ObjectList from './ObjectList.jsx'
//const electron = require('electron');
const {BrowserWindow} = require('electron').remote
//const BrowserWindow = electron.BrowserWindow;

class DataGrid extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            isBusy:false,
            soqlText:"SELECT Id, Name,Industry,AnnualRevenue FROM Account",
            records:null,
            id:props.id,
            password:props.password
        };
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

    render(){
        return this.state.isBusy
            ? <div>Loading...</div>
            : (<div><input type="button" value="CLICK ME" onClick={()=>{this.hoge(this.state.id,this.state.password)}}/>
                <div><ObjectList /></div>
                <textarea
                    value={this.state.soqlText}
                    onChange={e=>{this.setState({soqlText:e.target.value})}}
                /><br/>
                <input
                    type="button"
                    value="Exec SOQL"
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
