const fs = require('fs');

const conf = ['css', 'tsx'];

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
  });
}



export const writeFile = (path:string) => {
  fs.writeFile(path, '你好nodejs 覆盖', 'utf8', function (error:any) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('写入成功');
  })
}