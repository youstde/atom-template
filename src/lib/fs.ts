const fs = require('fs');
import indexStr from '../template/react/index';
import tsxStr from '../template/react/template';

const conf = ['css', 'tsx'];
const tagRegx = /\$atom\$/g;
const fileMap:any = {
  'css': '',
  'tsx': tsxStr
};

const firstUpperCase = function(str:string){
  return str.replace(/\b(\w)(\w*)/g, function($0:any, $1:any, $2:any) {
      return $1.toUpperCase() + $2.toLowerCase();
  });
}

const replaceTag = (tpl:string, componentName:string) => {
  return tpl.replace(tagRegx, firstUpperCase(componentName));
}

export const mkdir = (path: string, componentName: string) => {
  fs.mkdir(path, function (error: any) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('创建目录成功');
    conf.forEach((key:string) => {
      const filePath = `${path}/${firstUpperCase(componentName)}.${key}`;
      const tplStr = fileMap[key];
      const draftTpl = replaceTag(tplStr, componentName);
      writeFile(filePath, draftTpl);
    });
    createIndexFile(`${path}/index.ts`, componentName);
  });
}

const createIndexFile = (path:string, componentName:string) => {
  const draftTpl = replaceTag(indexStr, componentName);
  writeFile(path, draftTpl);
}

export const writeFile = (path:string, text:string) => {
  fs.writeFile(path, text, 'utf8', function (error:any) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('写入成功');
  })
}