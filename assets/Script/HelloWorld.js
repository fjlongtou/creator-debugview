cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
        // SC.Init(function (complete, total) {
        //     //SDK初始化进度
        //     cc.log("SDK初始化进度 ： "+complete+"/"+total);
        // }, function () {
        //     //简创修改了 cc.sys.localStorage类 所以只能在sdk初始化完成之后再去加载本地数据
        //
        // });
    },

    // called every frame
    update: function (dt) {

    },
});
