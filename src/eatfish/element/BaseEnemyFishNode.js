
//属性
//moveTime
//moveStartPoint
//moveEndPoint
//moveTimeElapsed

eatfish.element.BaseEnemyFishNode = eatfish.element.BaseFishNode.extend({
	sprite:null,
	ctor:function () {		
		this._super();
		
		this.moveTime = 0;
		this.moveStartPoint = cc.p(0, 0);
		this.moveEndPoint = cc.p(0, 0);
		this.moveTimeElapsed = 0;
				
		return true;
	},
	paralysis: function() {
		this._super();
		this.unscheduleUpdate();
	},

	update: function(delta) {
		this.moveTimeElapsed += delta;
	}

	//paralysisEnd: function(sender) {
	//	this._super(sender);
	//
	//	//继续移动
	//	this.scheduleUpdate();
	//	
	//	var gameSceneLayer = this.getParent().getParent();
	////	this.runAction(cc.Sequence.create(cc.MoveTo.create(this.moveTime - this.moveTimeElapsed, this.moveEndPoint), cc.CallFunc.create(gameSceneLayer.enemyFishMoveEnd, gameSceneLayer, this)));
	//
	//}
});
