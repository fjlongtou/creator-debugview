'use strict';
const fs = require('fs');
const path = require('path');
let copy = {

    /*
    * 复制目录、子目录，及其中的文件
    * @param src {String} 要复制的目录
    * @param dist {String} 复制到目标目录
    */
  copyDir(src,dist){
    console.log("dist = " + dist)
    var b = fs.existsSync(dist)
    if(!b){
      console.log("mk dist = ",dist)
      copy.mkdirsSync(dist);//创建目录
    }
    copy.copy(src,dist);
  },
  
  //递归创建目录 同步方法  
  mkdirsSync(dirname) {  
      if (fs.existsSync(dirname)) {  
        return true;
      } else {  
          if (this.mkdirsSync(path.dirname(dirname))) {  
              console.log("mkdirsSync = " + dirname);
              fs.mkdirSync(dirname);
              return true;
          }  
      }  
  },

  /**
   *
   * @desc 异步深度循环删除目录
   * @param {string} path 需要删除的目录
  */
  delDir(path){
    let files = [];
    if(fs.existsSync(path)){
        files = fs.readdirSync(path);
        files.forEach((file, index) => {
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()){
                copy.delDir(curPath); //递归删除文件夹
            } else {
                fs.unlinkSync(curPath); //删除文件
            }
        });
        fs.rmdirSync(path);
    }
  },
    
  copy(src, dist) {
    console.log("_copy start")
    var paths = fs.readdirSync(src)
    console.log("_copy paths",paths)
    paths.forEach(function(p) {
      var _src = src + '/' +p;
      var _dist = dist + '/' +p;
      var stat = fs.statSync(_src)
      if(stat.isFile()) {// 判断是文件还是目录
        fs.writeFileSync(_dist, fs.readFileSync(_src));
      } else if(stat.isDirectory()) {
        copy.copyDir(_src, _dist)// 当是目录是，递归复制
      }
    })
  },
    
   
}
module.exports = copy