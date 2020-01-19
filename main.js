const { app, BrowserWindow, Menu, shell, ipcMain, ipcRenderer, clipboard } = require('electron');

let win;

const isMac = process.platform === 'darwin'

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: __dirname + "/build/64x64.png"
  });
  win.loadFile('pages/home.html')
  win.maximize();
  win.on('closed', () => {
    win = null
  });
  
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "About " + app.name ,
          role: "about", 
        },
        {
          label: "Reload Application",
          accelerator: "CmdOrCtrl+R",
          click: () => { win.reload(); }
        },
        {
          label: "Settings",
          accelerator: "CmdOrCtrl+P",
          click: () => {
            win.webContents.send("toggle-settings");
          }
        },
        {
          label: "Quit",
          role: "quit",
          accelerator: "CmdOrCtrl+Q"
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
      ]
    },
    {
      label: "Go",
      submenu: [
        {
          label: "Toggle History",
          accelerator: "CmdOrCtrl+H",
          click: () => {
            win.webContents.send("toggle-history");
          }
        },
        {
          label: "Toggle Collection",
          accelerator: "CmdOrCtrl+T",
          click: () => {
            win.webContents.send("toggle-collection");
          }
        },
        {
          label: "Save Request",
          accelerator: "CmdOrCtrl+S",
          click: () => {
            win.webContents.send("save-request");
          }
        },
        {
          label: "Send Request",
          accelerator: "CmdOrCtrl+Return",
          click: () => {
            win.webContents.send("send-request");
          }
        }
      ]
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Documentation",
          click: () => { shell.openExternal("https://www.github.com/orcuntuna/guvercin") }
        },
        {
          label: "Open Developer Tool",
          accelerator: "CmdOrCtrl+Shift+i",
          click: () => { win.webContents.openDevTools() }
        }
      ]
    }
  ];
  
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu)
}


app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
});