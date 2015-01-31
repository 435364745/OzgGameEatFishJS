//属性
//type

//ItemNodeType需要100开始，防止跟EnemyFishType冲突
eatfish.element.ItemNodeType = {
	gold: 100
};

eatfish.element.ItemNode = eatfish.element.BaseNode.extend({
	sprite:null,
	ctor:function (type) {		
		this._super();

		this.type = type;
		switch (this.type) {
			default:
				this.animSpriteList = eatfish.element.animData.itemGold;
				this.animKey = cfg.animKeyItemGold;
				this.elementName = eatfish.element.Name.itemGold;

				break;
		}
		
		var itemNode = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame(this.animSpriteList[0]));
		itemNode.setAnchorPoint(0, 0);
		itemNode.setPosition(0, 0);
		itemNode.setTag(eatfish.element.BaseNodeTag.mainObj);
		this.addChild(itemNode);
		
		this.setAnchorPoint(0.5, 0.5);
		this.setContentSize(itemNode.getContentSize());
		
		var center = new cc.Node();
		center.setAnchorPoint(0.5, 0.5);
		center.setTag(eatfish.element.BaseNodeTag.centerPoint);
		switch (this.type) {
			default:
				center.setPosition(cc.p(this.getContentSize().width / 2, this.getContentSize().height / 2));
				center.setContentSize(itemNode.getContentSize());
				break;
		}
		
		this.addChild(center);
		this.playAnim(0.15);
		this.scheduleUpdate();
		
		return true;
	}
});
