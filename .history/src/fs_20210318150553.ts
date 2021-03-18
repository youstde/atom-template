const fs = require('fs');

const conf = ['css', 'tsx'];
import indexStr from './template/react/index';

export const mkdir = (path: string, componentName: string) => {
  fs.mkdir(path, function (error: any) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('创建目录成功');
    conf.forEach(it => {
      const filePath = `${path}/${componentName}.${it}`;
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