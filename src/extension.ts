// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ElementProvider,SysChoiceProvider } from "./TreeViewProvider";
import {join,dirname,resolve} from 'path';
import {readFileSync, writeFile, writeFileSync} from 'fs';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
var forms = new Array();
var panel : vscode.WebviewPanel | undefined;
function renderBindFun(binding : any){

}
let cmds = new Array();
function renderWinContent(window : any,dic : any, title : any){
	var WinContent = 
"#!/usr/bin/python3\n\
import tkinter as tk\n\
import tkinter.ttk as ttk\n\
\n\
class Form():\n\
	def __init__(self):\n\
	#Properties of main window.\n\
		self.window = tk.Tk()\n\
		self.window.title(\""+window.text+"\")\n\
		self.size_str = str("+window.width+")+\"x\"+str("+window.height+")+\"+\"+str("+window.left+")+\"+\"+str("+window.top+")\n\
		self.window.geometry(self.size_str)\n\
		self.window.config(bg=\""+window.bgcolor+"\")\n\
		\n\
		self.style = ttk.Style()\n";
		let bdfuns = dic[window.eleid];
		for(var i=0;i<bdfuns.length;i++){
			if(bdfuns[i] === null){
				continue;
			}
			WinContent+=
"		self.window.bind('<"+bdfuns[i].event+">',"+bdfuns[i].callback+")\n";
		}
		WinContent += "\n";
		return WinContent;
}
function renderBtnContent(inputs:any, dic : any){
	
	var Content = "";
	for(var i=0;i<inputs.length;i++){
		let eleid = inputs[i].eleid;
		let cmd;
		if(inputs[i].command === undefined){
			cmd = "";
		}else{
			cmd = ", command="+inputs[i].command;
			cmds.push(inputs[i].command);
		};
		
		Content += 
"		self.var_text_"+inputs[i].name+" = tk.StringVar()\n\
		self.var_text_"+inputs[i].name+".set(\""+inputs[i].text+"\")\n\
		self.change_style(\"C"+i+".TButton\",\n\
							[(\"\",\""+inputs[i].fgcolor+"\")],\n\
							[(\"\",\""+inputs[i].bgcolor+"\")]\n\
							)\n\
		self."+inputs[i].name+" = ttk.Button(self."+inputs[i].master+", style=\"C"+i+".TButton\", textvariable=self.var_text_"+inputs[i].name+cmd+")\n\
		self."+inputs[i].name+".place(x="+inputs[i].left+",y="+inputs[i].top+",width="+inputs[i].width+", height="+inputs[i].height+")\n";
		let bdfuns = dic[eleid];
		for(var key in bdfuns){
			if(bdfuns[key] === null){
				continue;
			}
			Content+=
"		self."+inputs[i].name+".bind('<"+bdfuns[key].event+">',"+bdfuns[key].callback+")\n";
		}
		Content += "\n";
	}

	return Content;
}
function renderEtrContent(inputs:any, dic : any){
	var Content = "";
	for(var i=0;i<inputs.length;i++){
		let eleid = inputs[i].eleid;
		
		Content += 
"		self.var_text_"+inputs[i].name+" = tk.StringVar()\n\
		self.var_text_"+inputs[i].name+".set(\""+inputs[i].text+"\")\n\
		self.change_style(\"C"+i+".TEntry\",\n\
							[(\"\",\""+inputs[i].fgcolor+"\")],\n\
							[]\n\
							)\n\
		self."+inputs[i].name+" = ttk.Entry(self."+inputs[i].master+", style=\"C"+i+".TEntry\")\n\
		self."+inputs[i].name+".place(x="+inputs[i].left+",y="+inputs[i].top+",width="+inputs[i].width+", height="+inputs[i].height+")\n";
		let bdfuns = dic[eleid];
		for(var key in bdfuns){
			if(bdfuns[key] === null){
				continue;
			}
			Content+=
"		self."+inputs[i].name+".bind('<"+bdfuns[key].event+">',"+bdfuns[key].callback+")\n";
		}
		Content += "\n";
	}
	return Content;
}

function renderLabContent(inputs:any, dic : any){
	
	var Content = "";
	for(var i=0;i<inputs.length;i++){
		let eleid = inputs[i].eleid;
		Content += 
"		self.var_text_"+inputs[i].name+" = tk.StringVar()\n\
		self.var_text_"+inputs[i].name+".set(\""+inputs[i].text+"\")\n\
		self.change_style(\"C"+i+".TLabel\",\n\
							[(\"\",\""+inputs[i].fgcolor+"\")],\n\
							[(\"\",\""+inputs[i].bgcolor+"\")]\n\
							)\n\
		self."+inputs[i].name+" = ttk.Label(self."+inputs[i].master+", style=\"C"+i+".TLabel\", textvariable=self.var_text_"+inputs[i].name+",wraplength="+inputs[i].width+")\n\
		self."+inputs[i].name+".place(x="+inputs[i].left+",y="+inputs[i].top+",width="+inputs[i].width+", height="+inputs[i].height+")\n";
		let bdfuns = dic[eleid];
		for(var key in bdfuns){
			if(bdfuns[key] === null){
				continue;
			}
			Content+=
"		self."+inputs[i].name+".bind('<"+bdfuns[key].event+">',"+bdfuns[key].callback+")\n";
		}
		Content += "\n";
	}

	return Content;
}

function renderFrmContent(inputs:any, dic : any){
	
	var Content = "";
	for(var i=0;i<inputs.length;i++){
		let eleid = inputs[i].eleid;
		Content += 
"		self.change_style(\"C"+i+".TFrame\",\n\
							[],\n\
							[(\"\",\""+inputs[i].bgcolor+"\")]\n\
							)\n\
		self."+inputs[i].name+" = ttk.Frame(self."+inputs[i].master+", style=\"C"+i+".TFrame\")\n\
		self."+inputs[i].name+".place(x="+inputs[i].left+",y="+inputs[i].top+",width="+inputs[i].width+", height="+inputs[i].height+")\n";
		let bdfuns = dic[eleid];
		for(var key in bdfuns){
			if(bdfuns[key] === null){
				continue;
			}
			Content+=
"		self."+inputs[i].name+".bind('<"+bdfuns[key].event+">',"+bdfuns[key].callback+")\n";
		}
		Content += "\n";
	}

	return Content;
}

function renderCkbContent(inputs:any, dic : any){
	
	var Content = "";
	for(var i=0;i<inputs.length;i++){
		let eleid = inputs[i].eleid;
		
		Content += 
"		self.var_text_"+inputs[i].name+" = tk.StringVar()\n\
		self.var_text_"+inputs[i].name+".set(\""+inputs[i].text+"\")\n\
		self.change_style(\"C"+i+".TCheckbutton\",\n\
							[(\"\",\""+inputs[i].fgcolor+"\")],\n\
							[(\"\",\""+inputs[i].bgcolor+"\")]\n\
							)\n\
		self."+inputs[i].name+" = ttk.Checkbutton(self."+inputs[i].master+", style=\"C"+i+".TCheckbutton\", textvariable=self.var_text_"+inputs[i].name+")\n\
		self."+inputs[i].name+".place(x="+inputs[i].left+",y="+inputs[i].top+",width="+inputs[i].width+", height="+inputs[i].height+")\n";
		let bdfuns = dic[eleid];
		for(var key in bdfuns){
			if(bdfuns[key] === null){
				continue;
			}
			Content+=
"		self."+inputs[i].name+".bind('<"+bdfuns[key].event+">',"+bdfuns[key].callback+")\n";
		}
		Content += "\n";
	}

	return Content;
}

function renderRdbContent(inputs:any, dic : any){
	
	var Content = "";
	for(var i=0;i<inputs.length;i++){
		let eleid = inputs[i].eleid;
		
		Content += 
"		self.var_text_"+inputs[i].name+" = tk.StringVar()\n\
		self.var_text_"+inputs[i].name+".set(\""+inputs[i].text+"\")\n\
		self.change_style(\"C"+i+".TRadiobutton\",\n\
							[(\"\",\""+inputs[i].fgcolor+"\")],\n\
							[(\"\",\""+inputs[i].bgcolor+"\")]\n\
							)\n\
		self."+inputs[i].name+" = ttk.Radiobutton(self."+inputs[i].master+", style=\"C"+i+".TRadiobutton\", textvariable=self.var_text_"+inputs[i].name+")\n\
		self."+inputs[i].name+".place(x="+inputs[i].left+",y="+inputs[i].top+",width="+inputs[i].width+", height="+inputs[i].height+")\n";
		let bdfuns = dic[eleid];
		for(var key in bdfuns){
			if(bdfuns[key] === null){
				continue;
			}
			Content+=
"		self."+inputs[i].name+".bind('<"+bdfuns[key].event+">',"+bdfuns[key].callback+")\n";
		}
		Content += "\n";
	}

	return Content;
}

function renderPgbContent(inputs:any, dic : any){
	
	var Content = "";
	for(var i=0;i<inputs.length;i++){
		let eleid = inputs[i].eleid;
		
		Content += 
"		self."+inputs[i].name+" = ttk.Progressbar(self."+inputs[i].master+",value=50)\n\
		self."+inputs[i].name+".place(x="+inputs[i].left+",y="+inputs[i].top+",width="+inputs[i].width+", height="+inputs[i].height+")\n";
		let bdfuns = dic[eleid];
		for(var key in bdfuns){
			if(bdfuns[key] === null){
				continue;
			}
			Content+=
"		self."+inputs[i].name+".bind('<"+bdfuns[key].event+">',"+bdfuns[key].callback+")\n";
		}
		Content += "\n";
	}

	return Content;
}

function renderCgStyFun(){
	let content =
"	def change_style(self,style_name,foreground,background):\n\
		self.style.map(style_name,\n\
			foreground=foreground,\n\
			background=background\n\
			)\n";
	return content;
}

function renderCallbacks(dic : any){
	
	let content = "";
	let callbacks = new Array();
	for(var i=0;i<cmds.length;i++){
		if(cmds[i] === ""){
			continue;
		}
		if(callbacks.indexOf(cmds[i])===-1){
			callbacks.push(cmds[i]);
		}
	}
	
	for(var key1 in dic){
		console.log(key1);
		if(dic[key1] === null){
			continue;
		}
		for(var key2 in dic[key1]){
			console.log(key2);
			if(dic[key1][key2] === null){
				continue;
			}
			let callback = dic[key1][key2].callback;
			if(callback === ""){
				continue;
			}
			if(callbacks.indexOf(callback)===-1){
				callbacks.push(callback);
			}
		}
	}
	for(let j=0;j<callbacks.length;j++){
		content +=
"def "+callbacks[j]+"(event):\n\
	pass\n\
	\n";
	}
	return content;
}
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "pybuilder" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json	
	
	
	let itemClick = vscode.commands.registerCommand('itemClick',(label) => {
		if(label === "new form"){
			let title = 'Form'+(forms.length+1);
			panel = vscode.window.createWebviewPanel(
				'pybuilder',
				title,
				vscode.ViewColumn.One,
				{
					enableScripts: true, // 启用JS，默认禁用
					retainContextWhenHidden: true,
				}

			);
			panel.webview.html = getWebViewContent(context,"src/static/html/pybuilder.html");
			panel?.webview.postMessage({'txt':title});
			panel?.webview.onDidReceiveMessage(message => {
				console.log(message);
				if(message==="DelMainWin"){
					vscode.window.showWarningMessage("Main Window can't be deleted!");
					return;
				}else if(message==="RepName"){
					vscode.window.showWarningMessage("Names of Elements can't be repeated!");
					return;
				}else if(message==="FrmInFrm"){
					vscode.window.showWarningMessage("Frame can't be created in frame!");
					return;
				}
			});
			panel.onDidChangeViewState(
				e => {
				   panel = e.webviewPanel;
				}
				
			);

			forms.push(panel);
		}
		if(label === "submit"){
			vscode.window.showInformationMessage("Your code has been submitted!");
			
			panel?.webview.onDidReceiveMessage(message => {
				let filepath = context.extensionPath+"/pyout/"+message.title+".py";
	
				var WinContent = renderWinContent(message.window,message.dic,message.title);
	
				var BtnContent = renderBtnContent(message.button,message.dic);
				
				var EtrContent = renderEtrContent(message.entry,message.dic);

				var LabContent = renderLabContent(message.label,message.dic);

				var FrmContent = renderFrmContent(message.frame,message.dic);

				var CkbContent = renderCkbContent(message.checkbutton, message.dic);

				var RdbContent = renderRdbContent(message.radiobutton, message.dic);

				var PgbContent = renderPgbContent(message.progressbar, message.dic);

				var filecontent = WinContent +  FrmContent + BtnContent + EtrContent + LabContent  + CkbContent +RdbContent+PgbContent+renderCgStyFun() + renderCallbacks(message.dic);
	
				writeFileSync(filepath,filecontent);
	
				console.log("write successful!");
			},undefined, context.subscriptions);
		};
		
		panel?.webview.postMessage({'txt':label});
		
	});
	
	
	ElementProvider.initElementItem();
	SysChoiceProvider.initSysChoiceItem();
	context.subscriptions.push(itemClick);
	
	
}


/**
 * 从某个HTML文件读取能被Webview加载的HTML内容
 * @param {*} context 上下文
 * @param {*} templatePath 相对于插件根目录的html文件相对路径
 */
function getWebViewContent(context: any, templatePath: any) {
	const resourcePath = join(context.extensionPath, templatePath);
    const dirPath = dirname(resourcePath);
    let html = readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g, (m, $1, $2) => {
        return $1 + vscode.Uri.file(resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
	});

	const basePath = context.extensionPath+"/src/static/html/pyuilder.html";
	console.log(basePath);
	const staticPath = vscode.Uri.file(resolve(basePath)).with({ scheme: 'vscode-resource' }).toString() + '"';
	html = html.replace("const basePath = new URL(document.baseURI).pathname", "const basePath = "+"'"+staticPath+"'");
	return html;
}
export function deactivate() {}
