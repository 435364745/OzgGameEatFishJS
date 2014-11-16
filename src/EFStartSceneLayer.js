
var startSceneTag = {
		title: 1
		
};

var EFStartSceneLayer = EFBaseSceneLayer.extend({
	sprite:null,
	ctor:function () {		
		this._super();
		
		var winSize = cc.director.getWinSize();
				
		var bg = new cc.Sprite(res.bg1_png);
		bg.setPosition(winSize.width / 2, winSize.height / 2)
		this.addChild(bg);
		
		var title = new cc.Sprite(res.scene_start_title_png);
		title.setPosition(winSize.width / 2, 510);
		title.setTag(startSceneTag.title);
		this.addChild(title);
		
		return true;
	}
});

var EFStartScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new EFStartSceneLayer();
		this.addChild(layer);
	}
});
