/**
 * @name log展示界面
 * @author wangsheng 2020.01.12
 */
cc.Class({
    extends: cc.Component,

    properties: {
        _min : 0,
        _max : 0,
        _perLoad : 20,
        scroll_log : cc.ScrollView,
        input_js : cc.EditBox,
    },
    onLoad () {
        this.scroll_log.node.on('scroll-to-top', this.scrollToTop, this);
        this.scroll_log.node.on('scroll-to-bottom', this.scrollToBottom, this);
        this.initLogs();
        this.initEvents();
    },
    onDestroy(){
        cc.game.off("add-debug-info",this.addDebugInfo,this);
    },
    addDebugInfo : function (data) {
        this._max++;
        this.addLog(data,this._max);
    },
    initEvents : function () {
        let self = this;
        cc.game.on("add-debug-info",this.addDebugInfo,this);
    },
    scrollToTop(scrollView){
        this.addPreLogs();
    },
    scrollToBottom(scrollView){
        this.addNextLogs();
    },
    addPreLogs(){
        if(this._min==1)return;
        let max = this._min
        this._min = this._min-this._perLoad>1?this._min-this._perLoad:1;
        for(let idx=this._min;idx<=max;idx++){
            let data = RichDebug.logs[idx-1];
            this.addLog(data,idx);
        }
    },
    addNextLogs(){

    },
    initLogs(){
        this._max = RichDebug.logs.length;
        this._min = RichDebug.logs.length-this._perLoad>1?RichDebug.logs.length-this._perLoad:1;
        for(let idx=this._min;idx<=this._max;idx++){
            let data = RichDebug.logs[idx-1];
            this.addLog(data,idx);
        }
    },
    addLog(data,zindex){
        if(!data)return;
        let node = new cc.Node();
        node.anchorX = 0;
        node.zIndex = zindex;
        node.width = this.scroll_log.content.width;
        switch (data.type){
            case "log":
            case "debug":
                node.color = cc.color(255,255,255,255);
                break;
            case "warn":
                node.color = cc.color(255,255,0,255);
                break;
            case "error":
                node.color = cc.color(255,0,0,255);
                break;
        }
        let label = node.addComponent(cc.Label);
        label.string = data.value;
        label.fontSize = 20;
        label.lineHeight = 22;
        label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
        node.parent = this.scroll_log.content;
        if(zindex<this._max){
            this.scroll_log.content.sortAllChildren();
        }
    },
    press_evaljs(){
        try{
            eval(this.input_js.string);
        }catch(err){
            console.error("执行js报错",err);
        }
        this.input_js.string = "";
    },
    press_close(){
        this.node.destroy();
    },
    check_frame(toggle){
        if(toggle.isChecked){
            cc.debug.setDisplayStats(false);
        }else{
            cc.debug.setDisplayStats(true);
        }
    },

});
