'use strict';
let fs = require('fs');
let path = require('path');
let copy = require("./utils/copy")
module.exports = {
	load () {
	// 当 package 被正确加载的时候执行
		Editor.success("欢迎使用调试插件");
		Editor.success("请点击顶部菜单 调试插件 > 导入资源");
		Editor.success("这一操作会删除原来resources/debug目录下的资源");
        let dist = path.join(Editor.Project.path, './assets/resources/debug')
        if(!fs.existsSync(dist)){
            this.copyRes();
        }
	},

	unload () {
	// 当 package 被正确卸载的时候执行
	// Editor.log('package unloaded');
	},
	copyRes(){
		Editor.log("本插件基于 Cocos Creator2.2.1 开发")
		Editor.log('正在导入debug到 当前项目的 resources/debug 目录下');
		let resources = path.join(Editor.Project.path, './assets/resources')
		if(!fs.existsSync(resources)){
		fs.mkdirSync(resources)
		}
		Editor.success('sync-sdk success!');
		//准备同步项目 debug
		let src =  path.join(__dirname, './resources/debug');
		let dist = path.join(Editor.Project.path, './assets/resources/debug')
		let success = function(){
		  copy.copyDir(src,dist)
		  Editor.success("导入完成，请重启Cocos Creator")
		}
		if(!fs.existsSync(dist)){
		  success()
		}else{
		  Editor.log("删除旧版 resources/debug")
		  Editor.log("更新新版 resources/debug")
		  copy.delDir(dist)
		  success()
		}
	},
	messages: {
		'sync-sdk' () {
			this.copyRes();
		}
	},
};