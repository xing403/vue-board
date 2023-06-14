import path from 'node:path'
import { BrowserWindow, app } from 'electron'

function createWindow() {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })
  if (process.env.NODE_ENV !== 'development')
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  else
    win.loadURL(`${process.env.VITE_DEV_SERVER_URL}`)
}
app.whenReady().then(createWindow)
