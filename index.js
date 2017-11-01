const electron = require("electron");
const ipc = electron.ipcRenderer;

$('#syncBtn').click(()=>{
    console.log('sync msg 1');
    const reply = ipc.sendSync('sync-message');
    console.log(reply);
    console.log('sync msg 2');
});

$('#asyncBtn').click(()=>{
    console.log('async msg 1');
    ipc.send('async-message');
    console.log('async msg 2');
});

ipc.on('async-reply', function(event, arg){
    console.log(arg);
});

const BrowserWindow = electron.remote.BrowserWindow
let window
$('#remoteBtn').click(()=>{
window = new BrowserWindow();
window.loadURL('https://www.github.com/');
});