import BrowserWindow from "sketch-module-web-view";
import { getWebview, sendToWebview } from "sketch-module-web-view/remote";
import { getSelectedDocument } from "sketch/dom";
import sketch from 'sketch'
// import * as Settings from "sketch/settings";
import MochaJSDelegate from "mocha-js-delegate";

const webviewIdentifier = "sketch-chat.webview";
const webviewWidth = 210

export default function(context) {
  const existingWebview = getWebview(webviewIdentifier);
  let window = NSApp.mainWindow()
  let rootView
  let size
  if (window) {
    rootView = window.contentView()
    if (rootView) {
      size = rootView.bounds().size
      console.log(size.width, size.height)
    }
  }
  if (!sketch.getSelectedDocument()) {
    return
  }
  if (existingWebview) {
    if (existingWebview.isVisible()) {
      existingWebview.hide();
    } else {
      existingWebview.show();
      existingWebview.setPosition(size.width - 240 - webviewWidth, 76)
      console.log(existingWebview.getPosition())
    }
  } else {
    const browserWindow = onStartup(context);
    // browserWindow.once("ready-to-show", () => {
    //   browserWindow.show();
    //   browserWindow.setPosition(size.width - 240 - webviewWidth, 76)
    //   console.log(browserWindow.getPosition())
    // });
  }
}

export function onOpenDocument() {
  setTimeout(() => {
    const doc = getSelectedDocument();
    if (
      !doc ||
      !doc.sketchObject.cloudShare ||
      !doc.sketchObject.cloudShare() ||
      !doc.sketchObject.cloudShare().shortID()
    ) {
      sendToWebview(webviewIdentifier, `onOpenDocument(undefined)`);
      return;
    }
    sendToWebview(
      webviewIdentifier,
      `onOpenDocument("${String(doc.sketchObject.cloudShare().shortID())}")`
    );
  }, 100);
}

export function onCloseDocument(context) {
  if (
    context.actionContext.document &&
    context.actionContext.document.cloudShare() &&
    context.actionContext.document.cloudShare().shortID()
  ) {
    sendToWebview(
      context.actionContext.document,
      `onCloseDocument("${String(
        context.actionContext.document.cloudShare().shortID()
      )}")`
    );
  }

  onOpenDocument();
}

export const onSelectionChanged = context => {
  const selection = [];
  for (let i = 0; i < context.actionContext.newSelection.length; i++) {
    selection.push(String(context.actionContext.newSelection[i].objectID()));
  }
  sendToWebview(
    webviewIdentifier,
    `onSelectionChanged(${JSON.stringify(selection)})`
  );
};

function cloudUser() {
  let user = undefined;
  if (MSCloudAction.userController().user()) {
    user = {
      name: String(
        MSCloudAction.userController()
          .user()
          .name()
      ),
      avatar: String(
        MSCloudAction.userController()
          .user()
          .avatar()
          .largeURL()
      )
    };
  }

  return user;
}

export function onStartup(context) {
  var o = context.actionContext && context.actionContext.document || context.document || MSDocument.currentDocument();
  var a = o.documentWindow().contentView().subviews().objectAtIndex(0),
  u = a.subviews();
  var col = u.find((function(e) {
    return "".concat(e.identifier()) === 'bar'
  }))
  console.log(col)
  if (col) {
    
    return
  }
  var l
  (l = NSStackView.stackViewWithViews([])).frame = NSMakeRect(0, 0, 40, 400),
  l.identifier = 'bar',
  l.orientation = 1,
  l.setSpacing(20),
  l.setFlipped(!0),
  l.setBackgroundColor(NSColor.windowBackgroundColor());
  var h = [],
  p = !1;
  a.subviews().forEach((function(e) {
      h.push(e),
      p || "view_canvas" !== "".concat(e.identifier()) || (h.push(l), p = !0)
  })),
  a.subviews = h,
  a.adjustSubviews()
  // var g = NSView.alloc().initWithFrame(NSMakeRect(0, 0, 100, 400));
  // g.identifier = 'test',
  // g.addSubview(l);
  // var m = {
  //     container: g,
  //     stack: l
  // },
  // S = NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("H:|-0-[stack]-0-|", 0, nil, m),
  // E = NSLayoutConstraint.constraintsWithVisualFormat_options_metrics_views("V:[stack]-0-|", 0, nil, m);
  // g.addConstraints(S),
  // g.addConstraints(E);
  // var M = true ? g.safeAreaLayoutGuide().topAnchor() : g.topAnchor();
  // console.log(M)
  // l.topAnchor().constraintEqualToAnchor(M).setActive(!0);
  // var A = NSViewController.alloc().init();
  // A.view = g;
  // var O = NSSplitViewItem.splitViewItemWithViewController(A);
  // O.holdingPriority = NSLayoutPriorityRequired,
  // O.maximumThickness = 100
  // o.splitViewController().insertSplitViewItem_atIndex(O, 2)
  // const options = {
  //   title: 'Ergate',
  //   parent: sketch.getSelectedDocument(),
  //   identifier: webviewIdentifier,
  //   hideTitleBar: true,
  //   shouldKeepAround: true,
  //   width: webviewWidth,
  //   // center: true,
  //   // fullscreen: true,
  //   fullscreenable: false,
  //   // transparent: true,
  //   closable: true,
  //   movable: false,
  //   minimizable: false,
  //   maximizable: false,
  //   resizable: false,
  //   hidesOnDeactivate: true,
  //   useContentSize: true,
  //   // acceptFirstMouse: true,
  //   remembersWindowFrame: false,
  //   hasShadow: false,
  //   show: false,
  //   frame: false,
  //   alwaysOnTop: true
  // };
  // const browserWindow = new BrowserWindow(options);

  // browserWindow.setAlwaysOnTop(true, "modal-panel");
  // browserWindow.on("close", event => {
  //   event.preventDefault();
  //   browserWindow.hide();
  // });

  // browserWindow.webContents.on("sign-in-sketch-cloud", () => {
  //   MSCloudAction.signIn();
  // });

  // browserWindow.webContents.on("close-window", () => {
  //   browserWindow.hide();
  // });

  // browserWindow.webContents.on("select-layers", layerIds => {
  //   const document = getSelectedDocument();
  //   const layers = layerIds
  //     .map(layerId => document.getLayerWithID(layerId))
  //     .filter(x => !!x);
  //   if (!layers.length) {
  //     return;
  //   }
  //   document.selectedPage = layers[0].getParentPage();
  //   document.selectedLayers.layers = layers;
  //   document.sketchObject
  //     .eventHandlerManager()
  //     .currentHandler()
  //     .zoomToSelection();
  // });

  // const closeButton = browserWindow._panel.standardWindowButton(NSWindowCloseButton);
  // closeButton.setCOSJSTargetFunction(() => {
  //   // 覆盖的方法
  //   browserWindow.hide();
  // })

  // const threadDic = NSThread.mainThread().threadDictionary();

  // const user = cloudUser();
  // browserWindow.webContents.insertJS(
  //   `window.CLOUD_USER = ${JSON.stringify(user)}`
  // );

  // const delegate = new MochaJSDelegate({
  //   "onCurrentDocumentChanged:": () => {
  //     const doc = getSelectedDocument();
  //     if (
  //       doc &&
  //       doc.sketchObject.cloudShare &&
  //       doc.sketchObject.cloudShare() &&
  //       doc.sketchObject.cloudShare().shortID()
  //     ) {
  //       browserWindow.webContents.executeJavaScript(
  //         `onCurrentDocumentChanged && onCurrentDocumentChanged("${String(
  //           doc.sketchObject.cloudShare().shortID()
  //         )}")`
  //       );
  //     }
  //   },
  //   "onCloudUserChanged:": () => {
  //     const user = cloudUser();
  //     browserWindow.webContents.insertJS(
  //       `window.CLOUD_USER = ${JSON.stringify(user)}`
  //     );
  //     browserWindow.webContents.executeJavaScript(
  //       `onCloudUserChanged && onCloudUserChanged(${JSON.stringify(user)})`
  //     );
  //   }
  // }).getClassInstance();

  // const onCloudUserChanged = NSSelectorFromString("onCloudUserChanged:");

  // NSNotificationCenter.defaultCenter().addObserver_selector_name_object(
  //   delegate,
  //   onCloudUserChanged,
  //   SCKUserController.userDidChangeNotification(),
  //   null
  // );
  // const onCurrentDocumentChanged = NSSelectorFromString(
  //   "onCurrentDocumentChanged:"
  // );

  // NSNotificationCenter.defaultCenter().addObserver_selector_name_object(
  //   delegate,
  //   onCurrentDocumentChanged,
  //   NSWindowDidBecomeKeyNotification,
  //   null
  // );

  // threadDic["sketch-chat.onCloudUserChanged"] = delegate;

  // browserWindow.loadURL(require("../resources/webview.html"))

  // // browserWindow.loadURL('http://127.0.0.1:8080')

  // const doc = getSelectedDocument();
  // if (
  //   doc &&
  //   doc.sketchObject.cloudShare &&
  //   doc.sketchObject.cloudShare() &&
  //   doc.sketchObject.cloudShare().shortID()
  // ) {
  //   browserWindow.webContents.executeJavaScript(
  //     `onOpenDocument && onOpenDocument("${String(
  //       doc.sketchObject.cloudShare().shortID()
  //     )}")`
  //   );
  // }

  // return browserWindow;
}

// When the plugin is shutdown by Sketch (for example when the user disable the plugin)
// we need to close the webview if it's open
export function onShutdown() {
  const existingWebview = getWebview(webviewIdentifier);
  console.log(111111111111)
  if (existingWebview) {
    existingWebview.hide();
  }

  const threadDic = NSThread.mainThread().threadDictionary();

  const delegate = threadDic["sketch-chat.onCloudUserChanged"];
  if (delegate) {
    NSNotificationCenter.defaultCenter().removeObserver(delegate);
    threadDic.removeObjectForKey("sketch-chat.onCloudUserChanged");
  }
}