/**
 * Created by licamla on 2015/6/18.
 */

var StartLayer = BaseLayer.extend({
    _className : "StartLayer",
    ctor : function(){
        this._super();

        var winSize = cc.director.getWinSize();

        var bg = new cc.Sprite(res.bg1_png);
        bg.setPosition(winSize.width / 2, winSize.height / 2);
        this.addChild(bg);

        var title = new cc.Sprite(res.scene_start_title_png);
        title.setPosition(winSize.width / 2, 510);
        title.setTag(eatfish.scene.StartLayerTag.title);
        this.addChild(title);

        var btnStart = new ccui.Button();
        btnStart.loadTextureNormal(res.btn1_up_png);
        btnStart.loadTexturePressed(res.btn1_dw_png);
        btnStart.setPosition(winSize.width / 2, 210);
        btnStart.addTouchEventListener(this.onStart, this);
        //btnStart.setTag(eatfish.scene.StartLayerTag.btnStart);
        btnStart.setTitleFontName(cfg.globalFontName01);
        btnStart.setTitleFontSize(32.0);
        btnStart.setTitleText(strings.startSceneBtnStart);
        this.addChild(btnStart);

        var btnHelp = new ccui.Button();
        btnHelp.loadTextureNormal(res.btn1_up_png);
        btnHelp.loadTexturePressed(res.btn1_dw_png);
        btnHelp.setPosition(winSize.width / 2, 130);
        btnHelp.addTouchEventListener(this.onHelp, this);
        //btnHelp.setTag(eatfish.scene.StartLayerTag.btnHelp);
        btnHelp.setTitleFontName(cfg.globalFontName01);
        btnHelp.setTitleFontSize(32.0);
        btnHelp.setTitleText(strings.startSceneBtnHelp);
        this.addChild(btnHelp);

        return true;
    },

    onStart : function(){
        if(cfg.audio.effect){
            cc.audioEngine.playEffect(res.audios_btn_wav);
        }
        var s = new eatfish.scene.GameScene();
        var t = new cc.TransitionFade(cfg.transition, s);
        cc.director.pushScene(t);
    },

    onHelp : function(){
        if(cfg.audio.effect){
            cc.audioEngine.playEffect(res.audios_btn_wav);
        }
        //this.mainVisible(false);
        //this.helpVisible(true);
    }
});

var StartScene = cc.Scene.extend({
    _className : "StartScene",
    onEnter:function () {
        this._super();
        var layer = new StartLayer();
        this.addChild(layer);
    }
});