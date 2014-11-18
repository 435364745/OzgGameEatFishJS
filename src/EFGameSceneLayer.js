
var gameSceneTag = {
		bg: 1,
		blisterLeft: 2,
		blisterRight: 3
};

var EFGameSceneLayer = EFBaseSceneLayer.extend({
	sprite:null,
	ctor:function () {		
		this._super();
		
		cc.spriteFrameCache.addSpriteFrames(res.Fishtales_plist);
		cc.spriteFrameCache.addSpriteFrames(res.Fishall_plist);
		cc.spriteFrameCache.addSpriteFrames(res.cump_plist);
		
		var winSize = cc.director.getWinSize();
		
		//背景
		var bgList = [ res.bg1_png, res.bg2_png, res.bg3_png ];
		var i = rangeRandom(0, bgList.length - 1);
				
		var bg = new cc.Sprite(bgList[i]);
		bg.setPosition(winSize.width / 2, winSize.height / 2);
		bg.setTag(gameSceneTag.bg);
		this.addChild(bg);
		
		//水泡
		var blisterLeft = new cc.ParticleSystem(res.particle_sys_blister_plist);
		blisterLeft.setPosition(winSize.width / 2 - 300, 120);
		blisterLeft.setTag(gameSceneTag.blisterLeft);
		this.addChild(blisterLeft);
		
		var blisterRight = new cc.ParticleSystem(res.particle_sys_blister_plist);
		blisterRight.setPosition(winSize.width / 2 + 300, 120);
		blisterRight.setTag(gameSceneTag.blisterRight);
		this.addChild(blisterRight);
		
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
