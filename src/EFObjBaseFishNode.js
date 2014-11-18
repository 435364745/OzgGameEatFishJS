
//属性
//animSpriteList
//animKey
//orientation
//isMoving

var EFObjBaseFishNodeTag = {
		fish: 1,
		centerPoint: 2,
		cump: 3
};

var EFObjBaseFishNodeOrientation = {
		left: 1,
		right: 2
};

var EFObjBaseFishNode = cc.Node.extend({
	sprite:null,
	ctor:function () {		
		this._super();
		
		this.orientation = EFObjBaseFishNodeOrientation.left;
		
		return true;
	}
});

EFObjBaseFishNode.prototype.centerRect = function() {
	
	
};
