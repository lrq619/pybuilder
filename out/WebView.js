"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebView = void 0;
const vscode_1 = require("vscode");
const vscode = require("vscode");
const path_1 = require("path");
const fs_1 = require("fs");
let webviewPanel;
function createWebView(context, // 上面的代码刚介绍过，可忽略
viewColumn, // 窗口编辑器
label // 传递进来的一个 label 值，就是点击树视图项 showInformationMessage 的值
) {
    if (webviewPanel === undefined) {
        // 上面重点讲解了 createWebviewPanel 传递4个参数
        webviewPanel = vscode_1.window.createWebviewPanel('webView', // 标识，随意命名
        'pybuilder', // 面板标题
        viewColumn, // 展示在哪个面板上
        {
            retainContextWhenHidden: true,
            enableScripts: true // 下面的 html 页可以使用 Scripts
        });
        // 面板嵌入 html getIframeHtml() 方法在下面
        webviewPanel.webview.html = getWebViewContent(context, "src/static/html/pybuilder.html");
    }
    else {
        // 如果面板已经存在，重新设置标题
        webviewPanel.title = 'pybuilder';
        webviewPanel.reveal(); // Webview面板一次只能显示在一列中。如果它已经显示，则此方法将其移动到新列。
    }
    // onDidDispose: 如果关闭该面板，将 webviewPanel 置 undefined
    webviewPanel.onDidDispose(() => {
        webviewPanel = undefined;
    });
    return webviewPanel;
}
exports.createWebView = createWebView;
function getWebViewContent(context, templatePath) {
    const resourcePath = path_1.join(context.extensionPath, templatePath);
    const dirPath = path_1.dirname(resourcePath);
    let html = fs_1.readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return $1 + vscode.Uri.file(path_1.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
    });
    return html;
}
//# sourceMappingURL=WebView.js.map