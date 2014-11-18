
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

	var center = this.getChildByTag(EFObjBaseFishNodeTag.centerPoint);
	if(!center)
		return cc.rect(0, 0, 0, 0);
	var point = center.boundingBox().origin;
	point = this.convertToWorldSpace(point);
	return cc.rect(point.x, point.y, center.getContentSize().width, center.getContentSize().height);	
};

EFObjBaseFishNode.prototype.orientationLeft = function() {
	this.orientation = EFObjBaseFishNodeOrientation.left;
	var fish = this.getChildByTag(EFObjBaseFishNodeTag.fish);
	fish.setFlippedX(false);
};

EFObjBaseFishNode.prototype.orientationRight = function() {
	this.orientation = EFObjBaseFishNodeOrientation.right;
	var fish = this.getChildByTag(EFObjBaseFishNodeTag.fish);
	fish.setFlippedX(true);
};

EFObjBaseFishNode.prototype.cump = function() {
	var chumSprite = this.getChildByTag(EFObjBaseFishNodeTag.cump);
	if(chumSprite) {
		chumSprite.stopAllActions();
		chumSprite.removeFromParentAndCleanup(true);
	}
	
	//随机的cump精灵
	var cumpList = [ "cump1.png", "cump2.png", "cump3.png", "cump4.png", "cump5.png" ];
	var i = rangeRandom(0, cumpList.length - 1);
	
	chumSprite = cc.Sprite.createWithSpriteFrameName(cumpList[i]);
	
	//定义左边或右边的位置
	if(this.orientation == EFObjBaseFishNodeOrientation.left)
		chumSprite.setPosition(-chumSprite.getContentSize().width / 2, this.getContentSize().height / 2);
	else
		chumSprite.setPosition(this.getContentSize().width + (chumSprite.getContentSize().width / 2), this.getContentSize().height / 2);

	chumSprite.setTag(EFObjBaseFishNodeTag.cump);
	this.addChild(chumSprite);
	chumSprite.runAction(cc.Sequence.create(cc.DelayTime.create(0.2), cc.CallFunc.create(this.cumpAutoHide, this, chumSprite)));

};

EFObjBaseFishNode.prototype.paralysis = function() {
	if(!this.isMoving)
		return;
	this.isMoving = false;
	this.stopAllActions();
	var fish = this.getChildByTag(EFObjBaseFishNodeTag.fish);
	if(fish)
		fish.stopAllActions();
	var act1 = cc.MoveBy.create(0.01, cc.p(-3, 0));
	var act2 = cc.MoveBy.create(0.02, cc.p(6, 0));
	var act3 = act2.reverse();
	var act4 = cc.MoveBy.create(0.01, cc.p(3, 0));
	//麻痹5秒后恢复正常
	this.runAction(cc.Sequence.create(act1, act2, act3, act4, cc.DelayTime.create(5.0), cc.CallFunc.create(this.paralysisEnd, this, this)));
};

EFObjBaseFishNode.prototype.pause = function() {
	if(this.getChildByTag(EFObjBaseFishNodeTag.fish))
		this.getChildByTag(EFObjBaseFishNodeTag.fish).pause();
	if(this.getChildByTag(EFObjBaseFishNodeTag.cump))
		this.getChildByTag(EFObjBaseFishNodeTag.cump).pause();

	cc.Node.prototype.pause.call(this);
};

EFObjBaseFishNode.prototype.resume = function() {
	if(this.getChildByTag(EFObjBaseFishNodeTag.fish))
		this.getChildByTag(EFObjBaseFishNodeTag.fish).resume();
	if(this.getChildByTag(EFObjBaseFishNodeTag.cump))
		this.getChildByTag(EFObjBaseFishNodeTag.cump).resume();

	cc.Node.prototype.resume.call(this);
};

EFObjBaseFishNode.prototype.cumpAutoHide = function(sender) {
	sender.stopAllActions();
	sender.removeFromParent(true);
};

EFObjBaseFishNode.prototype.paralysisEnd = function(sender) {
	this.playAnim();
	this.isMoving = true;
};

EFObjBaseFishNode.prototype.playAnim = function() {
	var anim = cc.animationCache.getAnimation(this.animKey);
	var fish = this.getChildByTag(EFObjBaseFishNodeTag.fish);
	if(!anim) {
		var frames = new Array();
		
		for(var i = 0; i < this.animSpriteList.length; i++) {
			frames.push(cc.spriteFrameCache.getSpriteFrame(this.animSpriteList[i]));
		}
		
		anim = new cc.Animation(frames);
		anim.setDelayPerUnit(0.1);
		anim.setRestoreOriginalFrame(false);
		cc.animationCache.addAnimation(anim, this.animKey);
		this.setContentSize(frames[0].getOriginalSize());
	}
	fish.stopAllActions();
	var animate = cc.repeatForever(cc.animate(anim));
	fish.runAction(animate);
};
