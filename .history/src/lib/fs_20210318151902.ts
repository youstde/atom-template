const fs = require('fs');
import indexStr from '../template/react/index';
import tsxStr from '../template/react/template';

const conf = ['css', 'tsx'];
const tagRegx = /\$atom\$/;
const fileMap:any = {
  'css': indexStr,
  'tsx': tsxStr
};

const replaceTag = (tpl:string, componentName:string) => {
  tpl.replace(tagRegx, componentName);
}

export const mkdir = (path: string, componentName: string) => {
  fs.mkdir(path, function (error: any) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('创建目录成功');
    conf.forEach((key:string) => {
      const filePath = `${path}/${componentName}.${key}`;
      const tplStr = fileMap[key];
      const draftTpl = replaceTag(tplStr, componentName);
      writeFile(filePath);
    });
    createIndexFile(`${path}/index.ts`);
  });
}

const createIndexFile = (path:string) => {
  writeFile(path);
}

export const writeFile = (path:string) => {
  fs.writeFile(path, indexStr, 'utf8', function (error:any) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('写入成功');
  })
}