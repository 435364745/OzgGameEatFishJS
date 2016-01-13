
//属性
//btn1Callback
//btn2Callback

eatfish.element.DialogNodeTag = {	
	btn1: 10,
	btn2: 11,
	labTitle: 12,
	labContent: 13
};

eatfish.element.DialogNode = cc.Node.extend({
	sprite:null,
	ctor:function (title, content, btn1Text, btn1Callback, btn2Text, btn2Callback) {		
		this._super();
		
		if(btn1Callback) {
			this.btn1Callback = btn1Callback;
			this.btn1Callback.retain();
		}
		else
			this.btn1Callback = null;
		if(btn2Callback) {
			this.btn2Callback = btn2Callback;
			this.btn2Callback.retain();
		}
		else
			this.btn2Callback = null;
		
		this.setScale(0);
		
		var bgSprite = new cc.Sprite(res.dialog_bg_png);
		this.addChild(bgSprite);
		this.setContentSize(bgSprite.getContentSize());
		this.setAnchorPoint(0.5, 0.5);
		bgSprite.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
		
		var labTitle = new cc.LabelTTF(title, cfg.globalFontName01, 32, cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		labTitle.setPosition(this.getContentSize().width / 2, 170);
		labTitle.setTag(eatfish.element.DialogNodeTag.labTitle);
		this.addChild(labTitle);
		
		var labContent = new cc.LabelTTF(content, cfg.globalFontName01, 25, cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		labContent.setPosition(this.getContentSize().width / 2, 115);
		labContent.setTag(eatfish.element.DialogNodeTag.labContent);
		this.addChild(labContent);
		
		if(btn2Callback) {
			//2个按钮
			
			var btn1 = new ccui.Button();
			btn1.loadTextureNormal(res.dialog_btn_yes_1_png);
			btn1.loadTexturePressed(res.dialog_btn_yes_2_png);
			btn1.setPosition(this.getContentSize().width / 2 - 90, 45);
			btn1.addTouchEventListener(this.onButton, this);
			btn1.setEnabled(false);
			btn1.setTag(eatfish.element.DialogNodeTag.btn1);
			btn1.setTitleFontName(cfg.globalFontName01);
			btn1.setTitleFontSize(32.0);
			btn1.setTitleText(btn1Text);
			btn1.setScale(0.75);
			this.addChild(btn1);
			
			var btn2 = new ccui.Button();
			btn2.loadTextureNormal(res.dialog_btn_no_1_png);
			btn2.loadTexturePressed(res.dialog_btn_no_2_png);
			btn2.setPosition(this.getContentSize().width / 2 + 90, 45);
			btn2.addTouchEventListener(this.onButton, this);
			btn2.setEnabled(false);
			btn2.setTag(eatfish.element.DialogNodeTag.btn2);
			btn2.setTitleFontName(cfg.globalFontName01);
			btn2.setTitleFontSize(32.0);
			btn2.setTitleText(btn2Text);
			btn2.setScale(0.75);
			this.addChild(btn2);
		}
		else {
			//1个按钮
			
			var btn1 = new ccui.Button();
			btn1.loadTextureNormal(res.dialog_btn_yes_1_png);
			btn1.loadTexturePressed(res.dialog_btn_yes_2_png);
			btn1.setPosition(this.getContentSize().width / 2, 45);
			btn1.addTouchEventListener(this.onButton, this);
			btn1.setEnabled(false);
			btn1.setTag(eatfish.element.DialogNodeTag.btn1);
			btn1.setTitleFontName(cfg.globalFontName01);
			btn1.setTitleFontSize(32.0);
			btn1.setTitleText(btn1Text);
			btn1.setScale(0.75);
			this.addChild(btn1);
		}
		
		this.runAction(cc.Sequence.create(cc.EaseElasticOut.create(cc.ScaleTo.create(1, 1)), cc.CallFunc.create(this.showActEnd, this)));

		return true;
	},
	setBtn1Text: function(text) {
		var btn1 = this.getChildByTag(eatfish.element.DialogNodeTag.btn1);
		btn1.setTitleText(text);
	},

	setBtn2Text: function(text) {
		var btn2 = this.getChildByTag(eatfish.element.DialogNodeTag.btn2);
		btn2.setTitleText(text);
	},

	setLabTitleText: function(text) {
		var labTitle = this.getChildByTag(eatfish.element.DialogNodeTag.labTitle);
		labTitle.setString(text);
	},

	setLabTitleContent: function(text) {
		var labContent = this.getChildByTag(eatfish.element.DialogNodeTag.labContent);
		labContent.setString(text);
	},

	setBtn1Callback: function(callback) {
		this.btn1Callback = callback;
	},

	setBtn2Callback: function(callback) {
		this.btn2Callback = callback;
	},

	showActEnd: function() {
		var btn1 = this.getChildByTag(eatfish.element.DialogNodeTag.btn1);
		var btn2 = this.getChildByTag(eatfish.element.DialogNodeTag.btn2);
		
		if(btn1)
			btn1.setEnabled(true);
		if(btn2)
			btn2.setEnabled(true);
	},

	onButton: function(sender, eventType) {
		switch(eventType) {
			case ccui.Widget.TOUCH_BEGAN:
				break;
			case ccui.Widget.TOUCH_MOVED:
				break;
			case ccui.Widget.TOUCH_ENDED:
				{
					switch(sender.getTag()) {
						case eatfish.element.DialogNodeTag.btn2:
							{
								if (this.btn2Callback)
									this.runAction(this.btn2Callback);
									//this.removeFromParent(true);
							}
							break;
						default:
							{
								if (this.btn1Callback)
									this.runAction(this.btn1Callback);
							}
							break;
					}
				}
				break;
		}
	}

});
