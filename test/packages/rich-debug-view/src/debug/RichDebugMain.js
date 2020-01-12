/**
 * @name debug主弹窗
 * @author wangsheng 2020.01.12
 */
cc.Class({
    extends: cc.Component,

    properties: {
        _frameCount : 0,
        _time : 0,
        lbt_error : cc.Label,
        lbt_fail : cc.Label,
        lbt_warn : cc.Label,
        lbt_fps : cc.Label,
    },
    onLoad () {
        this.node.opacity = 150;
        var posStart = this.node.position;
        this.node.on(cc.Node.EventType.TOUCH_START,(event)=>{
            this.node.opacity = 230;
            posStart = event.getLocation();
        },this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE,(event)=>{
            let posEnd = event.getLocation()
            //计算差异
            let pos = posEnd.sub(posStart)
            let posNode = this.node.position
            posNode = posNode.add(pos)
            if(posNode.x < this.node.width/2){
                posNode.x = this.node.width/2
            }
            if(posNode.x > cc.winSize.width - this.node.width/2){
                posNode.x = cc.winSize.width - this.node.width/2
            }
            if(posNode.y < this.node.height/2){
                posNode.y = this.node.height/2
            }
            if(posNode.y > cc.winSize.height - this.node.height/2){
                posNode.y = cc.winSize.height - this.node.height/2
            }
            this.node.position = posNode
            posStart = posEnd
        },this)
        this.node.on(cc.Node.EventType.TOUCH_END,(event)=>{
            this.node.opacity = 150
        },this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,(event)=>{
            this.node.opacity = 150
        },this)
    },
    update(dt){
        this._time += dt
        this._frameCount ++
        if(this._time >=1){
            this.lbt_fps.string = `${this._frameCount-1}`;
            this.lbt_error.string = RichDebug.debugInfo.errors;
            this.lbt_fail.string = RichDebug.debugInfo.errors;
            this.lbt_warn.string = RichDebug.debugInfo.warns;
            this._time = 0
            this._frameCount = 0
        }
    },
    press_debug(){
        PrefabManager.addPrefabToScene("debug/RichDebugPanel",function (node) {
            node.zIndex = 499;
        });
    }
});
