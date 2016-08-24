import electron, {remote} from 'electron';
const Menu = remote.Menu;

const menu = Menu.buildFromTemplate([
  {label : 'すべて選択'},
  {type : 'separator'},
  {label : 'Copy', accelerator : 'CmdOrCtrl+C'},
  {label : 'Paste', accelerator : 'CmdOrCtrl+V'}
]);

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  menu.popup(remote.getCurrentWindow());
}, false);
