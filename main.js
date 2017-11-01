'use strict'
require('electron-reload')(__dirname);

console.log('main process working');

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;
const dialog = electron.dialog


let winOne;

function createWindow(){
    winOne = new BrowserWindow({height: 150, width:500});
    winOne.loadURL(url.format({
            pathname: path.join(__dirname, 'index.html'),
            protocol: 'file',
            slashes: true,
        }));

    winOne.on('closed', () => {
        winOne = null;
    });

}

ipc.on('sync-message', function(event){
    event.returnValue = 'sync-reply';
});

ipc.on('async-message', function(event){
    event.sender.send('async-reply', 'Main process opened error dialog');
});

app.on('ready', createWindow);

app.on('windows-all-closed', () => {
    if (process.platform !== 'darwin'){
        app.quit();
    }
})
