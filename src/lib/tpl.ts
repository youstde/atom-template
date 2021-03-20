import * as vscode from 'vscode';
import { mkdir, writeFile, readDirFileSync, readFileSync, checkExist } from './fs';
const path = require('path');
import indexStr from '../template/react/index';
import tsxStr from '../template/react/template';

const conf = ['css', 'tsx'];
const tagRegx = /\$atom\$/g;
const tplRegx = /^template\./;

const firstUpperCase = function (str: string) {
  return str.replace(/\b(\w)(\w*)/g, function ($0: any, $1: any, $2: any) {
    return $1.toUpperCase() + $2.toLowerCase();
  });
}

const replaceTag = (tpl: string, componentName: string) => {
  return tpl.replace(tagRegx, firstUpperCase(componentName));
}

export const pourTplIntoProject = (tplArr: string[], rootPath: string, componentName: string, baseTplDirPath: string) => {
  tplArr.forEach((tplFile: string) => {
    let filePath = '';
    if (tplRegx.test(tplFile)) {
      filePath = `${rootPath}/${firstUpperCase(componentName)}.${tplFile.split('.')[1]}`;
    } else {
      filePath = `${rootPath}/${tplFile}`;
    }
    const res = readFileSync(path.resolve(baseTplDirPath, `${tplFile}.tpl`));
    const draftTpl = replaceTag(res, componentName);
    writeFile(filePath, draftTpl);
  });
}

function formatTplFile(tpls: string[]) {
  return tpls.map(it => {
    return it.replace(/\.tpl$/, '');
  });
}

const createDefauleFile = (value: string, filePath: string, componentName: string) => {
  const draftTpl = replaceTag(value, componentName);
  writeFile(filePath, draftTpl);
}

function pourDefaultTplIntoProject(rootPath: string, componentName: string) {
  const upToCaseName = firstUpperCase(componentName);
  createDefauleFile(indexStr, path.resolve(rootPath, `index.ts`), componentName);
  createDefauleFile(tsxStr, path.resolve(rootPath, `${upToCaseName}.tsx`), componentName);
  createDefauleFile('', path.resolve(rootPath, `${upToCaseName}.css`), componentName);
}

export function createFunCom(params: any) {
  // 文件夹绝对路径
  const folderPath = params.fsPath;
  const baseTplDirPath = path.resolve(__dirname, '../git/atom-tpls/tpl');

  const options = {
    prompt: "请输入组件名: ",
    placeHolder: "组件名"
  }

  // 调出系统输入框获取组件名
  vscode.window.showInputBox(options).then(value => {
    if (!value) return;
    const componentName = value;
    const rootPath = `${folderPath}/${componentName}`;
    if (checkExist(rootPath)) {
      vscode.window.showErrorMessage(`文件夹${componentName}已存在`);
      return;
    }

    mkdir(rootPath, function () {
      if (checkExist(baseTplDirPath)) {
        const tpls = readDirFileSync(baseTplDirPath);
        const formatedTplArr = formatTplFile(tpls);
        pourTplIntoProject(formatedTplArr, rootPath, componentName, baseTplDirPath);
      } else {
        // 如果用户没有初始化插件模板，则生成默认模板
        pourDefaultTplIntoProject(rootPath, componentName);
      }
    });
  });
}