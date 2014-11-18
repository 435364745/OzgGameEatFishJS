
//属性
//moveTime
//moveStartPoint
//moveEndPoint
//moveTimeElapsed

var EFObjBaseEnemyFishNode = EFObjBaseFishNode.extend({
	sprite:null,
	ctor:function () {		
		this._super();
		
		this.moveTime = 0;
		this.moveStartPoint = cc.p(0, 0);
		this.moveEndPoint = cc.p(0, 0);
		this.moveTimeElapsed = 0;
				
		return true;
	}
});

EFObjBaseEnemyFishNode.prototype.paralysis = function() {
	EFObjBaseFishNode.prototype.pause.call(this);
	this.unscheduleUpdate();
};

EFObjBaseEnemyFishNode.prototype.update = function(delta) {
	this.moveTimeElapsed += delta;
};

EFObjBaseEnemyFishNode.prototype.paralysisEnd = function(sender) {
	EFObjBaseFishNode.prototype.paralysisEnd.call(this, sender);
	
	//继续移动
	this.scheduleUpdate();
	
	var gameSceneLayer = this.getParent().getParent();
//	this.runAction(cc.Sequence.create(cc.MoveTo.create(this.moveTime - this.moveTimeElapsed, this.moveEndPoint), cc.CallFunc.create(gameSceneLayer.enemyFishMoveEnd, gameSceneLayer, this)));

};
