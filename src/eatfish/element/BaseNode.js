//属性
//animSpriteList
//animKey
//isMoving

eatfish.element.BaseNodeTag = {
		mainObj: 1,
		centerPoint: 2
};

eatfish.element.Name = {
	player: 1,
	jellyFish: 2,
	enemtyFish1: 3,
	enemtyFish2: 4,
	enemtyFish3: 5,
	enemtyFish4: 6,
	enemtyFish5: 7,
	enemtyFish6: 8,
	itemGold: 9
};

eatfish.element.BaseNode = cc.Node.extend({
	sprite:null,
	ctor:function () {		
		this._super();
		
		return true;
	}
});

eatfish.element.BaseNode.prototype.centerRect = function() {

	var center = this.getChildByTag(eatfish.element.BaseNodeTag.centerPoint);
	if(!center)
		return cc.rect(0, 0, 0, 0);
	var point = cc.p(center.getBoundingBox().x, center.getBoundingBox().y);
	point = this.convertToWorldSpace(point);
	return cc.rect(point.x, point.y, center.getContentSize().width, center.getContentSize().height);	
};

eatfish.element.BaseNode.prototype.pause = function() {
	if(this.getChildByTag(eatfish.element.BaseNodeTag.mainObj))
		this.getChildByTag(eatfish.element.BaseNodeTag.mainObj).pause();

	cc.Node.prototype.pause.call(this);
};

eatfish.element.BaseNode.prototype.resume = function() {
	if(this.getChildByTag(eatfish.element.BaseNodeTag.mainObj))
		this.getChildByTag(eatfish.element.BaseNodeTag.mainObj).resume();

	cc.Node.prototype.resume.call(this);
};

eatfish.element.BaseNode.prototype.playAnim = function(frameDelay) {
	
	if(!frameDelay)
		frameDelay = 0.1
	
	var anim = cc.animationCache.getAnimation(this.animKey);
	var mainObj = this.getChildByTag(eatfish.element.BaseNodeTag.mainObj);
	if(!anim) {
		var frames = new Array();

		for(var i = 0; i < this.animSpriteList.length; i++) {
			frames.push(cc.spriteFrameCache.getSpriteFrame(this.animSpriteList[i]));
		}

		anim = new cc.Animation(frames);
		anim.setDelayPerUnit(frameDelay);
		anim.setRestoreOriginalFrame(false);
		cc.animationCache.addAnimation(anim, this.animKey);
		this.setContentSize(frames[0].getOriginalSize());
	}
	mainObj.stopAllActions();
	var animate = cc.repeatForever(cc.animate(anim));
	mainObj.runAction(animate);
};
