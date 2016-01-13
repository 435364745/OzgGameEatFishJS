
eatfish.scene.InitLayer = eatfish.scene.BaseLayer.extend({
	sprite:null,
	ctor:function () {		
		this._super();

		cc.audioEngine.stopMusic(false);
		
		var logo = new cc.Sprite(res.Default_png);
		logo.setPosition(cc.p(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2));
		logo.setRotation(-90);
		this.addChild(logo);
		this.scheduleOnce(this.goToStartLayer, 3.0);
		
		return true;
	},	
	goToStartLayer: function(delay) {
		var s = new eatfish.scene.StartScene();
		var t = new cc.TransitionFade(cfg.transition, s);
		cc.director.pushScene(t);
	}
});

eatfish.scene.InitScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new eatfish.scene.InitLayer();
		this.addChild(layer);
	}
});
