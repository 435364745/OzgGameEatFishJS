
eatfish.scene.StartLayerTag = {
	title: 1,
	btnStart: 2,
	btnHelp: 3,
	help: 4,
	helpTitle: 5,
	helpLab1: 6,
	helpLab2: 7,
	helpLab3: 8,
	helpBtnBack: 9
};

eatfish.scene.StartLayer = eatfish.scene.BaseLayer.extend({
	sprite:null,
	ctor:function () {		
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
		btnStart.addTouchEventListener(this.onButton, this);
		btnStart.setTag(eatfish.scene.StartLayerTag.btnStart);
		btnStart.setTitleFontName(cfg.globalFontName01);
		btnStart.setTitleFontSize(32.0);
		btnStart.setTitleText(strings.startSceneBtnStart);
		this.addChild(btnStart);
		
		var btnHelp = new ccui.Button();
		btnHelp.loadTextureNormal(res.btn1_up_png);
		btnHelp.loadTexturePressed(res.btn1_dw_png);
		btnHelp.setPosition(winSize.width / 2, 130);
		btnHelp.addTouchEventListener(this.onButton, this);
		btnHelp.setTag(eatfish.scene.StartLayerTag.btnHelp);
		btnHelp.setTitleFontName(cfg.globalFontName01);
		btnHelp.setTitleFontSize(32.0);
		btnHelp.setTitleText(strings.startSceneBtnHelp);
		this.addChild(btnHelp);
		
		return true;
	}
});

eatfish.scene.StartLayer.prototype.onButton = function(sender, eventType) {
	
	switch(eventType) {
		
		case ccui.Widget.TOUCH_BEGAN:
			
			break;
		case ccui.Widget.TOUCH_MOVED:
	
			break;
		case ccui.Widget.TOUCH_ENDED:
			{
				switch(sender.getTag()) {					
					case eatfish.scene.StartLayerTag.btnStart:
						{
							//开始游戏
							var s = new eatfish.scene.GameScene();
							var t = cc.TransitionFade(cfg.transition, s);
							cc.director.pushScene(t);
						}
						break;
					case eatfish.scene.StartLayerTag.btnHelp:
						//点击了帮助按钮
						
						cc.audioEngine.playEffect(res.audios_btn_wav);
						this.mainVisible(false);
						this.helpVisible(true);
						
						break;
					case eatfish.scene.StartLayerTag.helpBtnBack:
						//在帮助界面点击了后退按钮
						
						cc.audioEngine.playEffect(res.audios_btn_wav);
						this.mainVisible(true);
						this.helpVisible(false);
						
						break;
				}
			}
			break;
	}
		
};

eatfish.scene.StartLayer.prototype.mainVisible = function(visible) {
	var title = this.getChildByTag(eatfish.scene.StartLayerTag.title);
	var btnStart = this.getChildByTag(eatfish.scene.StartLayerTag.btnStart);
	var btnHelp = this.getChildByTag(eatfish.scene.StartLayerTag.btnHelp);
	title.setVisible(visible);
	btnStart.setVisible(visible);
	btnHelp.setVisible(visible);
};

eatfish.scene.StartLayer.prototype.helpVisible = function(visible) {
	
	var help = this.getChildByTag(eatfish.scene.StartLayerTag.help);
	var helpTitle = this.getChildByTag(eatfish.scene.StartLayerTag.helpTitle);
	var helpLab1 = this.getChildByTag(eatfish.scene.StartLayerTag.helpLab1);
	var helpLab2 = this.getChildByTag(eatfish.scene.StartLayerTag.helpLab2);
	var helpLab3 = this.getChildByTag(eatfish.scene.StartLayerTag.helpLab3);	
	var helpBtnBack = this.getChildByTag(eatfish.scene.StartLayerTag.helpBtnBack);	
	
	if(visible) {
		cc.spriteFrameCache.addSpriteFrames(res.Fishtales_plist);
		if(!help) {
			var winSize = cc.director.getWinSize();
			help = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("howtoplay.png"));
			help.setPosition(winSize.width / 2, winSize.height / 2);
			help.setTag(eatfish.scene.StartLayerTag.help);
			this.addChild(help);
		}
		//title
		if(!helpTitle) {
			helpTitle = new ccui.TextField();
			helpTitle.setString(strings.helpTitle);
			helpTitle.setFontName(cfg.globalFontName02);
			helpTitle.setFontSize(36);
			helpTitle.setTag(eatfish.scene.StartLayerTag.helpTitle);
			helpTitle.setPosition(480, 535);
			helpTitle.setTextColor(cc.color(255, 255, 0, 255));
			this.addChild(helpTitle);
		}
		//lab1
		if(!helpLab1) {
			helpLab1 = new ccui.TextField();
			helpLab1.setString(strings.helpLab1);
			helpLab1.setFontName(cfg.globalFontName01);
			helpLab1.setFontSize(24);
			helpLab1.setTag(eatfish.scene.StartLayerTag.helpLab1);
			helpLab1.setPosition(480, 385);
			helpLab1.setTextColor(cc.color(255, 255, 255, 255));
			this.addChild(helpLab1);

		}
		//lab2
		if(!helpLab2) {
			helpLab2 = new ccui.TextField();
			helpLab2.setString(strings.helpLab2);
			helpLab2.setFontName(cfg.globalFontName01);
			helpLab2.setFontSize(24);
			helpLab2.setTag(eatfish.scene.StartLayerTag.helpLab2);
			helpLab2.setPosition(480, 245);
			helpLab2.setTextColor(cc.color(255, 255, 255, 255));
			this.addChild(helpLab2);

		}
		//lab3
		if(!helpLab3) {
			helpLab3 = new ccui.TextField();
			helpLab3.setString(strings.helpLab3);
			helpLab3.setFontName(cfg.globalFontName01);
			helpLab3.setFontSize(24);
			helpLab3.setTag(eatfish.scene.StartLayerTag.helpLab3);
			helpLab3.setPosition(480, 105);
			helpLab3.setTextColor(cc.color(255, 255, 255, 255));
			this.addChild(helpLab3);
			
		}
		if(!helpBtnBack) {
			helpBtnBack = new ccui.Button();
			helpBtnBack.loadTextureNormal(res.btn1_up_png);
			helpBtnBack.loadTexturePressed(res.btn1_dw_png);
			helpBtnBack.setPosition(830, 60);
			helpBtnBack.addTouchEventListener(this.onButton, this);
			helpBtnBack.setTag(eatfish.scene.StartLayerTag.helpBtnBack);
			helpBtnBack.setTitleFontName(cfg.globalFontName01);
			helpBtnBack.setTitleFontSize(32.0);
			helpBtnBack.setTitleText(strings.startSceneBtnBack);
			this.addChild(helpBtnBack);
			
		}
	}
	else {		
		if(help)
			help.removeFromParent(true);
		if(helpTitle)
			helpTitle.removeFromParent(true);
		if(helpLab1)
			helpLab1.removeFromParent(true);
		if(helpLab2)
			helpLab2.removeFromParent(true);
		if(helpLab3)
			helpLab3.removeFromParent(true);
		if(helpBtnBack)
			helpBtnBack.removeFromParent(true);
		cc.spriteFrameCache.removeSpriteFramesFromFile(res.Fishtales_plist);
		cc.textureCache.removeTextureForKey("Fishtales.png");		
	}
	
};

eatfish.scene.StartScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new eatfish.scene.StartLayer();
		this.addChild(layer);
	}
});
