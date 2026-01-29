const {app, BrowserWindow} = require('electron');
function createWindow() {
const win = new BrowserWindow({
  width: 550,
  height: 650,
  frame: false,         
  transparent: true, 
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false
  }
})

  win.loadFile('index.html')
}
app.whenReady().then(createWindow);
app.on("window-all-closed",()=>{
  if(process.platform !== "darwin") app.quit();
});