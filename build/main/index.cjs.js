"use strict";
var electron = require("electron");
var path = require("path");
let messageParent = null;
const createVideoWindow = () => {
  const mainWindow = new electron.BrowserWindow();
  if (electron.app.isPackaged) {
    mainWindow.loadFile(path.join(__dirname, "..", "renderer", "index.html"));
  } else {
    mainWindow.loadURL("http://127.0.0.1:3000");
    mainWindow.webContents.openDevTools();
  }
  mainWindow.setFullScreen(true);
  if (messageParent) {
    messageParent.close();
  }
};
const createMessageWindow = async () => {
  while (true) {
    if (!messageParent) {
      messageParent = new electron.BrowserWindow({
        height: 200,
        width: 200,
        show: false,
        transparent: true,
        paintWhenInitiallyHidden: false
      });
      messageParent.focus();
    }
    const result = await electron.dialog.showMessageBox(messageParent, {
      message: "Click Me!",
      type: "error",
      buttons: ["Cancel", "Ok"],
      cancelId: 0
    });
    if (result.response) {
      return;
    }
  }
};
electron.app.whenReady().then(() => {
  createMessageWindow().then(createVideoWindow).then(() => {
    electron.app.on("activate", () => {
      if (electron.BrowserWindow.getAllWindows().length === 0) {
        createVideoWindow();
      }
    });
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
