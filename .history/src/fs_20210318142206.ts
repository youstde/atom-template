const fs = require('fs');

export const mkdir = (path) => {
  fs.mkdir(path, function (error:any) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('创建目录成功');

  });
}