const fs = require('fs');

export function checkExist(path: string) {
  return fs.existsSync(path);
}

type ICb = () => void;
export function mkdir(path: string, cb: ICb) {
  fs.mkdir(path, function(error: any) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('创建目录成功');
    cb();
  })
}

export function writeFile(path: string, value: string, cb?: ICb) {
  fs.writeFile(path, value, 'utf8', function (error:any) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('写入成功');
    cb && cb();
  })
}

export function readDirFileSync(dirPath:string) {
  return fs.readdirSync(dirPath);
}

export function readFileSync(path:string) {
  return fs.readFileSync(path, {
    encoding: 'utf-8'
  });
}