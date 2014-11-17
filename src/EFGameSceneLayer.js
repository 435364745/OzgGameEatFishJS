
var EFGameSceneLayer = EFBaseSceneLayer.extend({
	sprite:null,
	ctor:function () {		
		this._super();
		
		cc.spriteFrameCache.addSpriteFrames(res.Fishtales_plist);
		cc.spriteFrameCache.addSpriteFrames(res.Fishall_plist);
		cc.spriteFrameCache.addSpriteFrames(res.cump_plist);
		
		var winSize = cc.director.getWinSize();
		
		var bg = new cc.Sprite(res.bg2_png);
		bg.setPosition(winSize.width / 2, winSize.height / 2);
		this.addChild(bg);
		
		return true;
	}
});

var EFGameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new EFGameSceneLayer();
		this.addChild(layer);
	}
});
