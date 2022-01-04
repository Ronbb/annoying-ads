import { app, BrowserWindow, dialog } from "electron";
import { join } from "path";

let messageParent: BrowserWindow | null = null;

const createVideoWindow = () => {
  const mainWindow = new BrowserWindow();

  if (app.isPackaged) {
    mainWindow.loadFile(join(__dirname, "..", "renderer", "index.html"));
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
      messageParent = new BrowserWindow({
        height: 200,
        width: 200,
        show: false,
        transparent: true,
        paintWhenInitiallyHidden: false,
      });
      messageParent.focus();
    }
    const result = await dialog.showMessageBox(messageParent, {
      message: "Click Me!",
      type: "error",
      buttons: ["Cancel", "Ok"],
      cancelId: 0,
    });
    if (result.response) {
      return;
    }
  }
};

app.whenReady().then(() => {
  createMessageWindow()
    .then(createVideoWindow)
    .then(() => {
      app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createVideoWindow();
        }
      });
    });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
