/**
 * Created by Licamla on 2015/6/18.
 */

var HelpLayer = cc.Layer.extend({
    _className : "HelpLayer",
    ctor : function(){
        this._super();

        cc.spriteFrameCache.addSpriteFrames(res.Fishtales_plist);

        winSize = cc.director.getWinSize();
        help = new cc.Sprite("#howtoplay.png");
        help.setPosition(winSize.width / 2, winSize.height / 2);
        //help.setTag(eatfish.scene.StartLayerTag.help);
        this.addChild(help);

        //title
        helpTitle = new ccui.TextField();
        helpTitle.setString(strings.helpTitle);
        helpTitle.setFontName(cfg.globalFontName02);
        helpTitle.setFontSize(36);
        //helpTitle.setTag(eatfish.scene.StartLayerTag.helpTitle);
        helpTitle.setPosition(480, 535);
        helpTitle.setTextColor(cc.color(255, 255, 0, 255));
        this.addChild(helpTitle);

        //lab1
        helpLab1 = new ccui.TextField();
        helpLab1.setString(strings.helpLab1);
        helpLab1.setFontName(cfg.globalFontName01);
        helpLab1.setFontSize(24);
        //helpLab1.setTag(eatfish.scene.StartLayerTag.helpLab1);
        helpLab1.setPosition(480, 385);
        helpLab1.setTextColor(cc.color(255, 255, 255, 255));
        this.addChild(helpLab1);

        //lab2
        helpLab2 = new ccui.TextField();
        helpLab2.setString(strings.helpLab2);
        helpLab2.setFontName(cfg.globalFontName01);
        helpLab2.setFontSize(24);
        //helpLab2.setTag(eatfish.scene.StartLayerTag.helpLab2);
        helpLab2.setPosition(480, 245);
        helpLab2.setTextColor(cc.color(255, 255, 255, 255));
        this.addChild(helpLab2);

        //lab3
        helpLab3 = new ccui.TextField();
        helpLab3.setString(strings.helpLab3);
        helpLab3.setFontName(cfg.globalFontName01);
        helpLab3.setFontSize(24);
        //helpLab3.setTag(eatfish.scene.StartLayerTag.helpLab3);
        helpLab3.setPosition(480, 105);
        helpLab3.setTextColor(cc.color(255, 255, 255, 255));
        this.addChild(helpLab3);

        helpBtnBack = new ccui.Button();
        helpBtnBack.loadTextureNormal(res.btn1_up_png);
        helpBtnBack.loadTexturePressed(res.btn1_dw_png);
        helpBtnBack.setPosition(830, 60);
        helpBtnBack.addTouchEventListener(this.onBack, this);
        //helpBtnBack.setTag(eatfish.scene.StartLayerTag.helpBtnBack);
        helpBtnBack.setTitleFontName(cfg.globalFontName01);
        helpBtnBack.setTitleFontSize(32.0);
        helpBtnBack.setTitleText(strings.startSceneBtnBack);
        this.addChild(helpBtnBack);
    },

    onBack : function(){
        var s = new StartScene();
        var t = new cc.TransitionFade(cfg.transition, s);
        cc.director.runScene(t);
    }
});

var HelpScene = cc.Scene.extend({
   _className : "HelpScene",
    onEnter:function () {
        this._super();
        var layer = new HelpLayer();
        this.addChild(layer);
    }
});