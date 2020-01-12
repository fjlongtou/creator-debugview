/**
 * @name 预制资源管理器
 * @author wangsheng 2020.01.12
 */
let PrefabManager = {
    loadPrefab: function (url, callback) {
        let self = this;
        let prefab = cc.loader.getRes(url);
        if (prefab) {
            // console.log("从缓存获取预制资源===",url);
            try{
                var prefabNode = cc.instantiate(prefab);
                if (callback) {
                    callback(prefabNode);
                }
            }catch (err){
                console.log("loadPrefab 回调失败",err);
            }
        }  else {
            //加载预制资源
            cc.loader.loadRes(url, function (errorMessage, loadedResource) {
                //检查资源加载
                if (errorMessage) {
                    console.log('载入预制资源失败, 原因:' + errorMessage);
                    return;
                }
                if (!(loadedResource instanceof cc.Prefab)) {
                    console.log('你载入的不是预制资源!');
                    return;
                }
                try{
                    //开始实例化预制资源
                    var prefabNode = cc.instantiate(loadedResource);
                    if (callback) {
                        callback(prefabNode);
                    }
                }catch (err){
                    console.log('实例化预制资源失败',err);
                }

            });
        }
    },
    //param 可以是节点 也可以是url值
    //parent 父节点
    addPrefabToNode: function (parent,param,callback, pos) {
        let self = this;
        var addToParent = function (node) {
            if (!node) return;
            if (parent) {
                if (pos) {
                    node.x = pos.x || 0;
                    node.y = pos.y || 0;
                }
                node.parent = parent;
                try{
                    if(callback){
                        callback(node);
                    }
                }catch (err){
                    console.log('添加预制资源到节点失败',err);
                }

            }
        }
        if (typeof (param) == "object") {
            var node = param;
            if (param instanceof cc.Prefab) {
                node = cc.instantiate(param);
            }
            addToParent(node);
        } else if (typeof (param) == "string") {
            self.loadPrefab(param, function (node) {
                addToParent(node);
            });
        } else {
            console.log("不支持的参数类型", typeof (param));
        }
    },
    //param 可以是节点 也可以是url值
    addPrefabToScene: function (param,callback, pos) {
        let self = this;
        var addToScene = function (node) {
            if (!node) return;
            if (pos) {
                node.x = pos.x || cc.winSize.width / 2;
                node.y = pos.y || cc.winSize.height / 2;
            } else {
                node.x = cc.winSize.width / 2;
                node.y = cc.winSize.height / 2;
            }
            var scene = cc.director.getScene();
            node.parent = scene;
            try{
                if(callback){
                    callback(node);
                }
            }catch (err){
                console.log('添加预制资源到场景失败',err);
            }
        }
        if (typeof (param) == "object") {
            var node = param;
            if (param instanceof cc.Prefab) {
                node = cc.instantiate(param);
            }
            addToScene(node);
        } else if (typeof (param) == "string") {
            self.loadPrefab(param, function (node) {
                addToScene(node);
            });
        } else {
            console.log("不支持的参数类型", typeof (param));
        }
    },
    //param 可以是节点 也可以是url值
    addPrefabToCanvas: function (param,callback, pos) {
        let self = this;
        var addToCanvas = function (node) {
            if (!node) return;
            if (pos) {
                node.x = pos.x || 0;
                node.y = pos.y || 0;
            }
            var canvas = cc.find("Canvas");
            node.parent = canvas;
            try{
                if(callback){
                    callback(node);
                }
            }catch (err){
                console.log('添加预制资源到Canvas失败',err);
            }
        }
        if (typeof (param) == "object") {
            var node = param;
            if (param instanceof cc.Prefab) {
                node = cc.instantiate(param);
            }
            addToCanvas(node);
        } else if (typeof (param) == "string") {
            self.loadPrefab(param, function (node) {
                addToCanvas(node);
            });
        } else {
            console.log("不支持的参数类型", typeof (param));
        }
    },
    addPrefabNodeToScene: function (node, pos) {
        if (!node) return;
        if (pos) {
            node.x = pos.x || cc.winSize.width / 2;
            node.y = pos.y || cc.winSize.height / 2;
        } else {
            node.x = cc.winSize.width / 2;
            node.y = cc.winSize.height / 2;
        }
        var scene = cc.director.getScene();
        node.parent = scene;
    },
}
window.PrefabManager = window.PrefabManager || PrefabManager;