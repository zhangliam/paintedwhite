const { BrowserWindow, ipcMain, app } = require('@electron/remote');
const url = require("url");
const path = require("path");

const DEFAULT_WIDTH = 370;
const DEFAULT_HEIGHT = 200;

const DEFAULT_KEYBIND_HEIGHT = options => (options.length * 50) + 130;

function electronPrompt(options, parentWindow) {
	return new Promise((resolve, reject) => {
		//id used to ensure unique listeners per window
		const id = `${Date.now()}-${Math.random()}`;

		//custom options override default
		const opts = Object.assign(
      {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        minWidth: DEFAULT_WIDTH,
        minHeight: DEFAULT_HEIGHT,
        resizable: false,
        title: 'Prompt',
        label: 'Please input a value:',
        buttonLabels: null,
        alwaysOnTop: false,
        value: null,
        type: 'input',
        selectOptions: null,
        icon: null,
        useHtmlLabel: false,
        customStylesheet: null,
        menuBarVisible: false,
				enableRemoteModule: false
      }, options || {}
    )

    if (opts.type === 'select' && (opts.selectOptions === null || typeof opts.selectOptions !== 'object')) {
      return reject(new Error('"selectOptions" must be an object'))
    }

		let promptWindow = new BrowserWindow({
      width: opts.width,
      height: opts.height,
      minWidth: opts.minWidth,
      minHeight: opts.minHeight,
      resizable: opts.resizable,
      parent: parentWindow,
      skipTaskbar: true,
      alwaysOnTop: opts.alwaysOnTop,
      useContentSize: opts.resizable,
      modal: Boolean(parentWindow),
      title: opts.title,
      icon: opts.icon,
      webPreferences: {
        nodeIntegration: true,
				contextIsolation: false,
				enableRemoteModule: opts.enableRemoteModule
      }
    })

    promptWindow.setMenu(null)
    promptWindow.setMenuBarVisibility(opts.menuBarVisible)

    const getOptionsListener = event => {
      event.returnValue = JSON.stringify(opts)
    }

		if (opts.enableRemoteModule) {
			require("@electron/remote/main").enable(promptWindow.webContents);
		}

    // 打开开发工具
    // if (process.env.NODE_ENV === "development") {
    //   promptWindow.webContents.openDevTools()
    // }

		const cleanup = () => {
      if (promptWindow) {
        promptWindow.close()
        promptWindow = null
      }
    }

    const postDataListener = (event, value) => {
      resolve(value)
      event.returnValue = null
      cleanup()
    }

    const unresponsiveListener = () => {
      reject(new Error('Window was unresponsive'))
      cleanup()
    }

    const errorListener = (event, message) => {
      reject(new Error(message))
      event.returnValue = null
      cleanup()
    }

    ipcMain.on('prompt-get-options:' + id, getOptionsListener)
    ipcMain.on('prompt-post-data:' + id, postDataListener)
    ipcMain.on('prompt-error:' + id, errorListener)
    promptWindow.on('unresponsive', unresponsiveListener)

    promptWindow.on('closed', () => {
      ipcMain.removeListener('prompt-get-options:' + id, getOptionsListener)
      ipcMain.removeListener('prompt-post-data:' + id, postDataListener)
      ipcMain.removeListener('prompt-error:' + id, postDataListener)
      resolve(null)
    })

		//should never happen
		promptWindow.webContents.once("did-fail-load", (
			_event,
			errorCode,
			errorDescription,
			validatedURL
		) => {
			const log = {
				error: "did-fail-load",
				errorCode,
				errorDescription,
				validatedURL
			};
			reject(new Error("prompt.html did-fail-load, log:\n" + log.toString()));
		});

    let pathname = path.join(app.getAppPath(), "prompt.html")
    if (process.env.NODE_ENV != 'development') {
      pathname = path.join(__dirname, "prompt.html")
    }

		const promptUrl = url.format({
			protocol: "file",
			slashes: true,
			pathname,
			hash: id
		});

    console.log(promptUrl)

		//Finally, load prompt
		promptWindow.loadURL(promptUrl);
	});
}

export default electronPrompt;