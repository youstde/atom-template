const fs = require('fs');

export const mkdir = () => {
  fs.mkdir('st', function (error:any) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('创建目录成功');

  });
}