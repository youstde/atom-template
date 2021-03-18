// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
	console.log('Congratulations, your extension "react-template" is now active!');

	// 注册一个名为createFunctionalComponent的命令
	const fc = vscode.commands.registerCommand('extension.createFunctionalComponent', function (param) {
			// 文件夹绝对路径
			const folderPath = param.fsPath;

			const options = {
					prompt: "请输入组件名: ",
					placeHolder: "组件名"
			}
			
			// 调出系统输入框获取组件名
			vscode.window.showInputBox(options).then(value => {
					if (!value) return;

					const componentName = value;
					const fullPath = `${folderPath}/${componentName}`;

					// 生成模板代码，不是本文的重点，先忽略
					// generateComponent(componentName, fullPath, ComponentType.FUNCTIONAL_COMP);
			});
	});
	
	context.subscriptions.push(pc);
}

// this method is called when your extension is deactivated
export function deactivate() {}
