const electron = require('electron');
const remote = electron.remote;
//var app = electron.app;
const Menu = remote.Menu;

var menu = Menu.buildFromTemplate([
  {label: 'すべて選択'},
  {type: 'separator'},
  {label: 'Copy', accelerator: 'CmdOrCtrl+C'},
  {label: 'Paste', accelerator: 'CmdOrCtrl+V'}
]);

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);
