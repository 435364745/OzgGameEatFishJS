
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
		if(this.isMoving) {
			this.moveTimeElapsed += delta;
		}
		
	}

});
