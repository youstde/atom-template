// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { initFn } from './lib/init';
import { createFunCom } from './lib/tpl';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "react-template" is now active!');

	const init = vscode.commands.registerCommand('extension.initAtomTpl', initFn);

	// 注册一个名为createFunctionalComponent的命令
	const cfc = vscode.commands.registerCommand('extension.createTSFunComponent', createFunCom);
	
	context.subscriptions.push(init);
	context.subscriptions.push(cfc);
}

// this method is called when your extension is deactivated
export function deactivate() {}
