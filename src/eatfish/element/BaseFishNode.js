
//属性
//animSpriteList
//animKey
//orientation
//isMoving
//effectStatus

eatfish.element.BaseFishNodeTag = {
	//mainObj: 1,
	//centerPoint: 2,
	cump: 3
};

eatfish.element.BaseFishNodeOrientation = {
	left: 1,
	right: 2
};

eatfish.element.BaseFishNodeEffectStatus = {
	normal: 1, //通常状态
	invincible: 2, //无敌状态
	paralysis: 3 //麻痹状态
};

eatfish.element.BaseFishNode = eatfish.element.BaseNode.extend({
	sprite:null,
	ctor:function () {		
		this._super();
		
		this.animSpriteList = null;
		this.animKey = null;
		this.orientation = eatfish.element.BaseFishNodeOrientation.left;
		this.isMoving = false;
		this.effectStatus = eatfish.element.BaseFishNodeEffectStatus.normal;
		
		return true;
	},
	orientationLeft: function() {
		this.orientation = eatfish.element.BaseFishNodeOrientation.left;
		var mainObj = this.getChildByTag(eatfish.element.BaseNodeTag.mainObj);
		mainObj.setFlippedX(false);
	},

	orientationRight: function() {
		this.orientation = eatfish.element.BaseFishNodeOrientation.right;
		var mainObj = this.getChildByTag(eatfish.element.BaseNodeTag.mainObj);
		mainObj.setFlippedX(true);
	},

	cump: function() {
		var chumSprite = this.getChildByTag(eatfish.element.BaseFishNodeTag.cump);
		if(chumSprite) {
			chumSprite.stopAllActions();
			chumSprite.removeFromParent(true);
		}
		
		//随机的cump精灵
		var cumpList = [ "cump1.png", "cump2.png", "cump3.png", "cump4.png", "cump5.png" ];
		var i = randomInt(0, cumpList.length - 1);

		chumSprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(cumpList[i]));
		
		//定义左边或右边的位置
		if(this.orientation == eatfish.element.BaseFishNodeOrientation.left)
			chumSprite.setPosition(-chumSprite.getContentSize().width / 2, this.getContentSize().height / 2);
		else
			chumSprite.setPosition(this.getContentSize().width + (chumSprite.getContentSize().width / 2), this.getContentSize().height / 2);

		chumSprite.setTag(eatfish.element.BaseFishNodeTag.cump);
		this.addChild(chumSprite);
		chumSprite.runAction(cc.Sequence.create(cc.DelayTime.create(0.2), cc.CallFunc.create(this.cumpAutoHide, this, chumSprite)));

	},

	paralysis: function() {
		if(this.effectStatus == eatfish.element.BaseFishNodeEffectStatus.invincible || this.effectStatus == eatfish.element.BaseFishNodeEffectStatus.paralysis)
			return;	
		this.effectStatus = eatfish.element.BaseFishNodeEffectStatus.paralysis;
		
		this.stopAllActions();
		var mainObj = this.getChildByTag(eatfish.element.BaseNodeTag.mainObj);
		if(mainObj)
			mainObj.stopAllActions();
		
		var act1 = cc.MoveBy.create(0.01, cc.p(-3, 0));
		var act2 = cc.MoveBy.create(0.02, cc.p(6, 0));
		var act3 = act2.reverse();
		var act4 = cc.MoveBy.create(0.01, cc.p(3, 0));
		
		var curr_obj = this;
		//麻痹5秒后恢复正常
		this.runAction(cc.Sequence.create(
			act1, 
			act2, 
			act3, 
			act4, 
			cc.CallFunc.create(function() {
				curr_obj.isMoving = false;
			}, this),
			cc.DelayTime.create(5.0), 
			cc.CallFunc.create(function() {
				curr_obj.playAnim();
				curr_obj.isMoving = true;
				curr_obj.effectStatus = eatfish.element.BaseFishNodeEffectStatus.normal;
				
				//如果不是player的话则执行下面的继续移动
				if(curr_obj.getTag() != eatfish.scene.GameLayerTag.fishPlayer) {
					curr_obj.moveTime -= curr_obj.moveTimeElapsed;
					curr_obj.runAction(cc.Sequence.create(
						cc.MoveTo.create(curr_obj.moveTime, curr_obj.moveEndPoint), 
						cc.CallFunc.create(function() {
							curr_obj.removeFromParent(true);
						}, curr_obj)
					));
				}
				
			}, this)
		));
	},

	pause: function() {
		if(this.getChildByTag(eatfish.element.BaseFishNodeTag.cump))
			this.getChildByTag(eatfish.element.BaseFishNodeTag.cump).pause();
		
		this._super();
	},

	resume: function() {
		if(this.getChildByTag(eatfish.element.BaseFishNodeTag.cump))
			this.getChildByTag(eatfish.element.BaseFishNodeTag.cump).resume();

		this._super();
	},

	cumpAutoHide: function(sender) {
		sender.stopAllActions();
		sender.removeFromParent(true);
	}
});
