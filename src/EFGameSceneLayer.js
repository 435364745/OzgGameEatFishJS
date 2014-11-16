
var EFGameSceneLayer = EFBaseSceneLayer.extend({
	sprite:null,
	ctor:function () {		
		this._super();

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
