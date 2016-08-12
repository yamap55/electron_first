'use strict';

const electron = require('electron');
const app = electron.app;
const Menu = electron.Menu;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

app.on('window-all-colosed', function() {
  if(process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function(){
    mainWindow = null;
  });
});

// アプリケーションメニュー
var applicationMenu = Menu.buildFromTemplate([
  {
    label: 'File',
    submenu: [
      {label: 'New File', click:()=>console.log('click!')},
      {type: 'separator'},
      {label: 'Save'},
      {label: 'Save As...'},
      {type: 'separator'},
      {label: 'Exit', click: ()=>app.quit()}
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {label: 'Copy', accelerator: 'CmdOrCtrl+C'},
      {label: 'Paste', accelerator: 'CmdOrCtrl+V'},
    ]
  },
  {
    label: 'DevTool',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click: ()=> mainWindow.toggleDevTools()
      }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {label: 'About'}
    ]
  },
]);
Menu.setApplicationMenu(applicationMenu);
