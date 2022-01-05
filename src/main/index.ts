import { app, BrowserWindow, dialog, Menu } from "electron";
import { join } from "path";

let messageParent: BrowserWindow | null = null;

const createVideoWindow = async () => {
  const mainWindow = new BrowserWindow({
    backgroundColor: "#000",
    fullscreen: true,
  });

  if (app.isPackaged) {
    await mainWindow.loadFile(join(__dirname, "..", "renderer", "index.html"));
  } else {
    await mainWindow.loadURL("http://127.0.0.1:3000");
    // mainWindow.webContents.openDevTools();
  }

  mainWindow.show();
  mainWindow.focus();

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

Menu.setApplicationMenu(null);

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
