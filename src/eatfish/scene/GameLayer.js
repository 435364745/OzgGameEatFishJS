
//属性
//stageNum //关卡
//score //分数
//eatFish //吃了鱼的分数，用来判断变大的，player死了会清0
//eatFishTotal //吃了鱼的总数
//eatFishTotalType1And2 //吃了Type1和2的鱼的总数
//eatFishTotalType3 //吃了Type3的鱼的总数
//eatFishTotalType4 //吃了Type4的鱼的总数
//playerLife
//bg
//touchEventObj

eatfish.scene.GameLayerTag = {
	bg: 1,
	blisterLeft: 2,
	blisterRight: 3,
	fishNode: 4,
	labStageNum: 5,
	labScore: 6,
	btnPause: 7,
	progressBg: 8,
	progress: 9,
	fishLife: 10,
	labFishLife: 11,
	fishPlayer: 12,
		
	btnRestart: 21,
	btnNext: 22,
	btnExit: 23,
	btnEffect: 24,
	btnSound: 25,
	btnResume: 26,
	gameoverNode: 27,
	clearNode: 28,
	pauseNode: 29,
	mask: 30
};

eatfish.scene.GameLayer = eatfish.scene.BaseLayer.extend({
	sprite:null,
	ctor:function () {		
		this._super();
		
		this.stageNum = 0;
		this.score = 0;
		this.playerLife = cfg.player;
		
		this.isTouchEnabled = false;
		
		cc.spriteFrameCache.addSpriteFrames(res.Fishtales_plist);
		cc.spriteFrameCache.addSpriteFrames(res.Fishall_plist);
		cc.spriteFrameCache.addSpriteFrames(res.cump_plist);
		
		var winSize = cc.director.getWinSize();
		
		//背景
		var bgList = [ res.bg1_png, res.bg2_png, res.bg3_png ];
		var i = rangeRandom(0, bgList.length - 1);
				
		var bg = new cc.Sprite(bgList[i]);
		bg.setPosition(winSize.width / 2, winSize.height / 2);
		bg.setTag(eatfish.scene.GameLayerTag.bg);
		this.addChild(bg);
		
		//水泡
		var blisterLeft = new cc.ParticleSystem(res.particle_sys_blister_plist);
		blisterLeft.setPosition(winSize.width / 2 - 300, 120);
		blisterLeft.setTag(eatfish.scene.GameLayerTag.blisterLeft);
		this.addChild(blisterLeft);
		
		var blisterRight = new cc.ParticleSystem(res.particle_sys_blister_plist);
		blisterRight.setPosition(winSize.width / 2 + 300, 120);
		blisterRight.setTag(eatfish.scene.GameLayerTag.blisterRight);
		this.addChild(blisterRight);
		
		//所有的鱼元素都在这个Node
		var fishNode = new cc.Node();
		fishNode.setAnchorPoint(0, 0);
		fishNode.setPosition(0, 0);
		fishNode.setTag(eatfish.scene.GameLayerTag.fishNode);
		this.addChild(fishNode);
		
		//右上角的部分
		var stageNumLab = new ccui.TextField();
		stageNumLab.setString(strings.gameSceneLabStageNum + this.stageNum.toString());
		stageNumLab.setFontName(cfg.globalFontName01);
		stageNumLab.setFontSize(30);
		stageNumLab.setTag(eatfish.scene.GameLayerTag.labStageNum);
		stageNumLab.setPosition(winSize.width - 100, winSize.height - 24);
		stageNumLab.setTextColor(cc.color(255, 255, 255, 255));
		stageNumLab.setTextAreaSize(cc.size(200, 40));
		stageNumLab.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		stageNumLab.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		this.addChild(stageNumLab);
		
		var scoreLab = new ccui.TextField();
		scoreLab.setString(strings.gameSceneLabScore + this.score.toString());
		scoreLab.setFontName(cfg.globalFontName01);
		scoreLab.setFontSize(30);
		scoreLab.setTag(eatfish.scene.GameLayerTag.labScore);
		scoreLab.setPosition(winSize.width - 100, winSize.height - 56);
		scoreLab.setTextColor(cc.color(255, 255, 255, 255));
		scoreLab.setTextAreaSize(cc.size(200, 40));
		scoreLab.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		scoreLab.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		this.addChild(scoreLab);
		
		//暂停按钮
		var btnPause = new ccui.Button();
		btnPause.loadTextureNormal(res.pause_up_png);
		btnPause.loadTexturePressed(res.pause_dw_png);
		btnPause.setPosition(winSize.width - 120, winSize.height - 100);
		btnPause.addTouchEventListener(this.onButton, this);
		btnPause.setTag(eatfish.scene.GameLayerTag.btnPause);
		this.addChild(btnPause);
				
		//左上角的部分
		var progressBg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("progress.png"));		
		progressBg.setPosition(80, 610);
		progressBg.setTag(eatfish.scene.GameLayerTag.progressBg);
		this.addChild(progressBg);
		
		//关卡进度条
		var progress = new cc.ProgressTimer(new cc.Sprite(res.progressk_png));
		progress.setBarChangeRate(cc.p(1, 0)); //设置进度条的长度和高度开始变化的大小
		progress.setType(cc.ProgressTimer.TYPE_BAR); //设置进度条为水平
		progress.setMidpoint(cc.p(0, 0));
		progress.setPosition(80, 594);
		progress.setTag(eatfish.scene.GameLayerTag.progress);
		this.addChild(progress);
		
		var fishLife = cc.Sprite(cc.spriteFrameCache.getSpriteFrame("fishlife.png"));
		fishLife.setPosition(70, 550);
		fishLife.setTag(eatfish.scene.GameLayerTag.fishLife);
		this.addChild(fishLife);
		
		var fishLifeLab = new ccui.TextField();
		fishLifeLab.setString(this.playerLife.toString());
		fishLifeLab.setFontName(cfg.globalFontName01);
		fishLifeLab.setFontSize(30);
		fishLifeLab.setTag(eatfish.scene.GameLayerTag.labFishLife);
		fishLifeLab.setPosition(140, 540);
		fishLifeLab.setTextColor(cc.color(255, 255, 255, 255));
		fishLifeLab.setTextAreaSize(cc.size(100, 40));
		fishLifeLab.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		fishLifeLab.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		this.addChild(fishLifeLab);
		
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			onTouchBegan: this.onLayerTouchBegan,
			onTouchMoved: this.onLayerTouchMoved,
			onTouchEnded: this.onLayerTouchEnded
		}, this);
		
		//player
		var player = new eatfish.element.PlayerNode();
		player.setPosition(winSize.width / 2, 800);
		player.setTag(eatfish.scene.GameLayerTag.fishPlayer);
		fishNode.addChild(player, 99999);
		player.invincible();

		//配合过场的时间，所以延时执行这个方法
		this.scheduleOnce(this.gameStart, cfg.transition);

		return true;
	}
});

eatfish.scene.GameLayer.prototype.update = function(delay) {
	var winSize = cc.director.getWinSize();
	
	var fishNode = this.getChildByTag(eatfish.scene.GameLayerTag.fishNode);
	if(!fishNode)
		return;

	//水母
	if(Math.random() <= cfg.enemyJellyFish) {
		var enemyFishNode = new eatfish.element.JellyfishNode();

		var minVal = enemyFishNode.getContentSize().width / 2;
		var maxVal = winSize.width - (enemyFishNode.getContentSize().width / 2);

		var srcX = maxVal - minVal;
		srcX = minVal + (srcX * Math.random());

		enemyFishNode.setPosition(Vec2(srcX, -enemyFishNode.getContentSize().height / 2));
		fishNode.addChild(enemyFishNode);

		var moveTime = 15.0 - 10.0;
		moveTime = 10.0 + (moveTime * CCRANDOM_0_1());

		enemyFishNode.runAction(cc.Sequence.create(
				cc.MoveTo.create(moveTime, cc.p(srcX, winSize.height + (enemyFishNode.getContentSize().height / 2))), 
				cc.CallFunc.create(function() {
					enemyFishNode.removeFromParent(true);
				}, this)
		));

	}

	//fish1
	if(Math.random() <= cfg.enemyFish1) {
		var enemyFishNode = new eatfish.element.EnemyFishNode(eatfish.element.EnemyFishType.fish1);
		this.enemyFishEmergence(enemyFishNode);
	}

	//fish2
	if(Math.random() <= cfg.enemyFish2) {
		var enemyFishNode = new eatfish.element.EnemyFishNode(eatfish.element.EnemyFishType.fish2);
		this.enemyFishEmergence(enemyFishNode);
	}

	//fish3
	if(Math.random() <= cfg.enemyFish3) {
		var enemyFishNode = new eatfish.element.EnemyFishNode(eatfish.element.EnemyFishType.fish3);
		this.enemyFishEmergence(enemyFishNode);
	}

	//fish4
	if(Math.random() <= cfg.enemyFish4) {
		var enemyFishNode = new eatfish.element.EnemyFishNode(eatfish.element.EnemyFishType.fish4);
		this.enemyFishEmergence(enemyFishNode);
	}

	//fish5
	if(Math.random() <= cfg.enemyFish5) {
		var enemyFishNode = new eatfish.element.EnemyFishNode(eatfish.element.EnemyFishType.fish5);
		this.enemyFishEmergence(enemyFishNode);
	}

	//fish6
	if(Math.random() <= cfg.enemyFish6) {
		var enemyFishNode = new eatfish.element.EnemyFishNode(eatfish.element.EnemyFishType.fish6);
		this.enemyFishEmergence(enemyFishNode);
	}
	
	//以下是碰撞
	var nodeList = fishNode.getChildren();
	for (var i = 0; i < nodeList.length; i++) {
		var srcObj = nodeList[i];
		var srcCenter = srcObj.centerRect();
		
		for (var j = 0; j < nodeList.length; j++) {
			var targetObj = nodeList[j];
			var targetCenter = targetObj.centerRect();
			
			if (cc.rectContainsRect(srcCenter, targetCenter)) {
				cc.log(typeof(srcObj) + " " + typeof(targetObj));
			}
		}
		
	}
	
};

eatfish.scene.GameLayer.prototype.scenePause = function() {

	if(this.getChildByTag(eatfish.scene.GameLayerTag.pauseNode))
		return;

	var fishNode = this.getChildByTag(eatfish.scene.GameLayerTag.fishNode);
	if(fishNode) {
		var nodeList = fishNode.getChildren();
		for(var i = 0; i < nodeList.length; i++) {
			var fishChildren = nodeList[i].getChildren();
			for(var j = 0; j < fishChildren.length; j++) {
				fishChildren[j].pause();
			}
			nodeList[i].pause();
		}			
		
		var winSize = cc.director.getWinSize();

		this.enabledTouchEvent(false);

		//暂停界面
		var pauseBg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("pausebg.png"));
		pauseBg.setPosition(pauseBg.getContentSize().width / 2, pauseBg.getContentSize().height / 2);

		var pauseNode = new cc.Node();
		pauseNode.setAnchorPoint(0.5, 0.5);
		pauseNode.setContentSize(pauseBg.getContentSize());
		pauseNode.setPosition(winSize.width / 2, winSize.height / 2);
		pauseNode.setTag(eatfish.scene.GameLayerTag.pauseNode);
		this.addChild(pauseNode);

		pauseNode.addChild(pauseBg);

		var btnResume = new ccui.Button();
		btnResume.loadTextureNormal(res.btn1_up_png);
		btnResume.loadTexturePressed(res.btn1_dw_png);
		btnResume.setPosition(180, 370);
		btnResume.addTouchEventListener(this.onButton, this);
		btnResume.setTag(eatfish.scene.GameLayerTag.btnResume);
		btnResume.setTitleFontName(cfg.globalFontName01);
		btnResume.setTitleFontSize(22.0);
		btnResume.setTitleText(strings.pauseResume);
		pauseNode.addChild(btnResume);
		
		var btnSound = new ccui.Button();
		btnSound.loadTextureNormal(res.btn1_up_png);
		btnSound.loadTexturePressed(res.btn1_dw_png);
		btnSound.setPosition(180, 264);
		btnSound.addTouchEventListener(this.onButton, this);
		btnSound.setTag(eatfish.scene.GameLayerTag.btnSound);
		btnSound.setTitleFontName(cfg.globalFontName01);
		btnSound.setTitleFontSize(22.0);		
		pauseNode.addChild(btnSound);
		
		if(sys.localStorage.getItem(cfg.bgSound))
			btnSound.setTitleText(strings.pauseSound + "(" + strings.pauseOff + ")");
		else
			btnSound.setTitleText(strings.pauseSound + "(" + strings.pauseOn + ")");

		pauseNode.addChild(btnSound);

		var btnEffect = new ccui.Button();
		btnEffect.loadTextureNormal(res.btn1_up_png);
		btnEffect.loadTexturePressed(res.btn1_dw_png);
		btnEffect.setPosition(180, 157);
		btnEffect.addTouchEventListener(this.onButton, this);
		btnEffect.setTag(eatfish.scene.GameLayerTag.btnEffect);
		btnEffect.setTitleFontName(cfg.globalFontName01);
		btnEffect.setTitleFontSize(22.0);		
		pauseNode.addChild(btnEffect);

		if(sys.localStorage.getItem(cfg.effectSound))
			btnEffect.setTitleText(strings.pauseEffect + "(" + strings.pauseOff + ")");
		else
			btnEffect.setTitleText(strings.pauseEffect + "(" + strings.pauseOn + ")");

		pauseNode.addChild(btnEffect);
		
		var btnExit = new ccui.Button();
		btnExit.loadTextureNormal(res.btn1_up_png);
		btnExit.loadTexturePressed(res.btn1_dw_png);
		btnExit.setPosition(180, 50);
		btnExit.addTouchEventListener(this.onButton, this);
		btnExit.setTag(eatfish.scene.GameLayerTag.btnExit);
		btnExit.setTitleFontName(cfg.globalFontName01);
		btnExit.setTitleFontSize(22.0);
		btnExit.setTitleText(strings.pauseExit);
		pauseNode.addChild(btnExit);
				
		var labGithub = new ccui.TextField();
		labGithub.setString("github:https://github.com/ouzhigang/OzgGameEatFishJS");
		labGithub.setFontName(cfg.globalFontName01);
		labGithub.setFontSize(20);
		labGithub.setPosition(650, 210);
		pauseNode.addChild(labGithub);
		
    }
    
    this.unscheduleUpdate();
	
};

eatfish.scene.GameLayer.prototype.onButton = function(sender, eventType) {
	
	switch(eventType) {
	case ccui.Widget.TOUCH_BEGAN:

		break;
	case ccui.Widget.TOUCH_MOVED:

		break;
	case ccui.Widget.TOUCH_ENDED:
		switch(sender.getTag()) {
		case eatfish.scene.GameLayerTag.btnPause:
		{
			//暂停游戏
			cc.audioEngine.playEffect(res.audios_btn_wav);

			this.scenePause();                    
		}
			break;
		case eatfish.scene.GameLayerTag.btnResume:
		{
			//继续游戏

			cc.audioEngine.playEffect(res.audios_btn_wav);

			var fishNode = this.getChildByTag(eatfish.scene.GameLayerTag.fishNode);
			if(fishNode) {
				var nodeList = fishNode.getChildren();
				
				for(var i = 0; i < nodeList.length; i++) {
					
					var fishChildren = nodeList[i].getChildren();
					
					for(var j = 0; j < fishChildren.length; j++) {
						fishChildren[j].resume();
					}
					
					nodeList[i].resume();
				}

			}

			this.scheduleUpdate();
			this.enabledTouchEvent(true);

			var pauseNode = this.getChildByTag(eatfish.scene.GameLayerTag.pauseNode);
			if(pauseNode)
				pauseNode.removeFromParent(true);

		}
			break;
		case eatfish.scene.GameLayerTag.btnSound:
		{
			//背景音乐
			if(!sys.localStorage.getItem(cfg.bgSound)) {
				cc.audioEngine.setMusicVolume(1.0);				
				sys.localStorage.setItem(cfg.bgSound, true);
				sender.setTitleText(strings.pauseSound + "(" + strings.pauseOff + ")");
				
			}
			else {
				cc.audioEngine.setMusicVolume(0.0);
				sys.localStorage.setItem(cfg.bgSound, false);
				sender.setTitleText(strings.pauseSound + "(" + strings.pauseOn + ")");
				
			}

		}
			break;	
		case eatfish.scene.GameLayerTag.btnEffect:
		{
			//效果声音
			if(!sys.localStorage.getItem(cfg.effectSound)) {
				cc.audioEngine.setEffectsVolume(1.0);
				sys.localStorage.setItem(cfg.effectSound, true);
				sender.setTitleText(strings.pauseEffect + "(" + strings.pauseOff + ")");
				
			}
			else {
				cc.audioEngine.setEffectsVolume(0.0);
				sys.localStorage.setItem(cfg.effectSound, false);				
				sender.setTitleText(strings.pauseEffect + "(" + strings.pauseOn + ")");
				
			}

		}
			break;
		case eatfish.scene.GameLayerTag.btnExit:
		{			
			//退出游戏
			var maskLayer = new cc.LayerColor(cc.color(0, 0, 0, 180), cc.director.getWinSize().width, cc.director.getWinSize().height);
			maskLayer.setTag(eatfish.scene.GameLayerTag.mask);
			maskLayer.setPosition(cc.p(0, 0));
			this.addChild(maskLayer);

			var pauseNode = this.getChildByTag(eatfish.scene.GameLayerTag.pauseNode);
			var clearNode = this.getChildByTag(eatfish.scene.GameLayerTag.clearNode);
			var gameoverNode = this.getChildByTag(eatfish.scene.GameLayerTag.gameoverNode);

			if(pauseNode) {
				var btnResume = pauseNode.getChildByTag(eatfish.scene.GameLayerTag.btnResume);
				btnResume.setEnabled(false);

				var btnSound = pauseNode.getChildByTag(eatfish.scene.GameLayerTag.btnSound);
				btnSound.setEnabled(false);

				var btnEffect = pauseNode.getChildByTag(eatfish.scene.GameLayerTag.btnEffect);
				btnEffect.setEnabled(false);

				var btnExit = pauseNode.getChildByTag(eatfish.scene.GameLayerTag.btnExit);
				btnExit.setEnabled(false);
			}

			if(clearNode) {
				var btnExit = clearNode.getChildByTag(eatfish.scene.GameLayerTag.btnExit);
				btnExit.setEnabled(false);

				var btnNext = clearNode.getChildByTag(eatfish.scene.GameLayerTag.btnNext);
				btnNext.setEnabled(false);
			}

			if(gameoverNode) {
				var btnExit = gameoverNode.getChildByTag(eatfish.scene.GameLayerTag.btnExit);
				btnExit.setEnabled(false);

				var btnRestart = gameoverNode.getChildByTag(eatfish.scene.GameLayerTag.btnRestart);
				btnRestart.setEnabled(false);
			}

			var dialog = new eatfish.element.DialogNode(strings.title, strings.settingsExitDialog, strings.dialogBtnNo, cc.CallFunc.create(this.onDialogBtnNo, this), strings.dialogBtnYes, cc.CallFunc.create(this.onDialogBtnYes, this));
			dialog.setPosition(this.getContentSize().width / 2, this.getContentSize().height / 2);
			this.addChild(dialog);
		}
			break;
		case eatfish.scene.GameLayerTag.btnNext:
		{
			//下一关

			this.stageNum += 1;
			if(this.stageNum > cfg.maxStage)
				this.stageNum = cfg.maxStage;

			var stageNumLab = this.getChildByTag(eatfish.scene.GameLayerTag.labStageNum);
			stageNumLab.setString(strings.gameSceneLabStageNum + this.stageNum.toString());

			this.eatFish = 0;
			this.eatFishTotal = 0;
			this.eatFishTotalType1And2 = 0;
			this.eatFishTotalType3 = 0;
			this.eatFishTotalType4 = 0;

			var progress = this.getChildByTag(eatfish.scene.GameLayerTag.progress);
			progress.setPercentage(0);

			var clearNode = this.getChildByTag(eatfish.scene.GameLayerTag.clearNode);
			clearNode.removeFromParent(true);
			
			var fishNode = this.getChildByTag(eatfish.scene.GameLayerTag.fishNode);
			var player = new eatfish.element.PlayerNode();
			player.setPosition(cc.director.getWinSize().width / 2, 800);
			player.setTag(eatfish.scene.GameLayerTag.fishPlayer);
			fishNode.addChild(player, 99999);
			player.invincible();
			
			this.gameStart(cfg.transition);
		}
			break;
		case eatfish.scene.GameLayerTag.btnRestart:
		{
			//重新开始

			this.score = 0;
			this.stageNum = 1;
			this.playerLife = cfg.player;
			this.eatFish = 0;
			this.eatFishTotal = 0;
			this.eatFishTotalType1And2 = 0;
			this.eatFishTotalType3 = 0;
			this.eatFishTotalType4 = 0;

			var stageNumLab = this.getChildByTag(eatfish.scene.GameLayerTag.labStageNum);
			stageNumLab.setString(strings.gameSceneLabStageNum + this.stageNum.toString());

			var scoreLab = this.getChildByTag(eatfish.scene.GameLayerTag.labScore);
			scoreLab.setString(strings.gameSceneLabScore + this.score.toString());

			var fishLifeLab = this.getChildByTag(eatfish.scene.GameLayerTag.labFishLife);
			fishLifeLab.setString(this.playerLife.toString());

			var progress = this.getChildByTag(eatfish.scene.GameLayerTag.progress);
			progress.setPercentage(0);

			var gameoverNode = this.getChildByTag(eatfish.scene.GameLayerTag.gameoverNode);
			gameoverNode.removeFromParent(true);
			
			var fishNode = this.getChildByTag(eatfish.scene.GameLayerTag.fishNode);
			var player = new eatfish.element.PlayerNode();
			player.setPosition(cc.director.getWinSize().width / 2, 800);
			player.setTag(eatfish.scene.GameLayerTag.fishPlayer);
			fishNode.addChild(player, 99999);
			player.invincible();

			this.gameStart(cfg.transition);
		}
			break;
		default:
			break;
		}

		break;
	}
	
};

eatfish.scene.GameLayer.prototype.gameStart = function(delay) {
	cc.audioEngine.playEffect(res.audios_fishstart_mp3);

	var fishNode = this.getChildByTag(eatfish.scene.GameLayerTag.fishNode);
	var player = fishNode.getChildByTag(eatfish.scene.GameLayerTag.fishPlayer);
	player.runAction(cc.Sequence.create(cc.MoveBy.create(1.0, cc.p(0, -400)), cc.CallFunc.create(this.gameStartCallback, this)));
};

eatfish.scene.GameLayer.prototype.gameStartCallback = function() {
	this.enabledTouchEvent(true);
	var fishNode = this.getChildByTag(eatfish.scene.GameLayerTag.fishNode);
	var player = fishNode.getChildByTag(eatfish.scene.GameLayerTag.fishPlayer);
	player.isMoving = true;
	
	//随机性质的事件和AI都在这里计算
	this.scheduleUpdate();
};

eatfish.scene.GameLayer.prototype.gameRestart = function(delay) {
	cc.audioEngine.playEffect(res.audios_fishstart_mp3);
	
	var winSize = cc.director.getWinSize();
	var fishNode = this.getChildByTag(eatfish.scene.GameLayerTag.fishNode);

	var player = new eatfish.element.PlayerNode();
	player.setPosition(winSize.width / 2, 800);
	player.setTag(eatfish.scene.GameLayerTag.fishPlayer);
	fishNode.addChild(player, 99999);
	player.invincible();

	//鱼掉下来
	player.runAction(cc.Sequence.create(cc.MoveBy.create(1.0, cc.p(0, -400)), cc.CallFunc.create(this.gameRestartCallback, this)));

	this.enabledTouchEvent(false);
	
};

eatfish.scene.GameLayer.prototype.gameRestartCallback = function() {
	var fishNode = this.getChildByTag(eatfish.scene.GameLayerTag.fishNode);

	var player = fishNode.getChildByTag(eatfish.scene.GameLayerTag.fishPlayer);
	
	player.isMoving = true;

	this.enabledTouchEvent(true);
};

eatfish.scene.GameLayer.prototype.enabledTouchEvent = function(enabled) {
	this.isTouchEnabled = enabled;
	
	var btnPause = this.getChildByTag(eatfish.scene.GameLayerTag.btnPause);
	btnPause.setEnabled(enabled);
		
};

//点击事件 end
//这里的this不是eatfish.scene.GameLayer实例
eatfish.scene.GameLayer.prototype.onLayerTouchBegan = function(touch, event) {
	
	return true;
};

eatfish.scene.GameLayer.prototype.onLayerTouchMoved = function(touch, event) {
	
	if(!event.getCurrentTarget().isTouchEnabled)
		return;
	
	var winSize = cc.director.getWinSize();
	
	var fishNode = event.getCurrentTarget().getChildByTag(eatfish.scene.GameLayerTag.fishNode);
	
	var player = fishNode.getChildByTag(eatfish.scene.GameLayerTag.fishPlayer);
	
	if(player && player.isMoving) {
		var beginPoint = touch.getLocation();
		var endPoint = touch.getPreviousLocation();
		var offSet = cc.pSub(beginPoint, endPoint);
		var toPoint = cc.pAdd(player.getPosition(), offSet);
		
		var toX = player.getPosition().x;
		var toY = player.getPosition().y;
		
		var rect = player.centerRect();
		var moveRect = cc.rect(rect.width / 2, rect.height / 2, winSize.width - (rect.width / 2), winSize.height - (rect.height / 2));
		
		//如果toPoint的x存在moveRect的宽度范围里面则x为可移动，y的情况一样
		if(toPoint.x >= moveRect.x && toPoint.x <= moveRect.width)
			toX = toPoint.x;
		if(toPoint.y >= moveRect.y && toPoint.y <= moveRect.height)
			toY = toPoint.y;
		
		player.setPosition(toX, toY);
		
		if(offSet.x > 0)
			player.orientationRight(); //向右移动则转向右边
		else if(offSet.x < 0)
			player.orientationLeft(); //向左移动则转向左边

	}
};

eatfish.scene.GameLayer.prototype.onLayerTouchEnded = function(touch, event) {

};
//点击事件 end

eatfish.scene.GameLayer.prototype.enemyFishEmergence = function(enemyFishNode) {
	var startPoint = null;
	var endPoint = null;
	
	var fishNode = this.getChildByTag(eatfish.scene.GameLayerTag.fishNode);

	//0.5为左边右边的机率各为50%
	if(Math.random() <= 0.5) {
		//左边出现
		startPoint = this.enemyFishRandomLeftPoint(enemyFishNode);
		endPoint = this.enemyFishRandomRightPoint(enemyFishNode);
		enemyFishNode.orientationRight(); //左边出现需要面向右边
	}
	else {
		//右边出现
		startPoint = this.enemyFishRandomRightPoint(enemyFishNode);
		endPoint = this.enemyFishRandomLeftPoint(enemyFishNode);
		enemyFishNode.orientationLeft(); //右边出现需要面向左边
	}
	enemyFishNode.setPosition(startPoint);
	fishNode.addChild(enemyFishNode);

	var moveTime = 20.0 - 10.0;
	moveTime = 10.0 + (moveTime * Math.random());

	enemyFishNode.isMoving = true; //执行action需要强制设置成YES
	enemyFishNode.moveTime = moveTime;
	enemyFishNode.moveStartPoint = startPoint;
	enemyFishNode.moveEndPoint = endPoint;

	enemyFishNode.runAction(cc.Sequence.create(
			cc.MoveTo.create(moveTime, endPoint), 
			cc.CallFunc.create(function() {
				enemyFishNode.removeFromParent(true);
			}, this)
	));

};

eatfish.scene.GameLayer.prototype.enemyFishRandomLeftPoint = function(enemyFishNode) {
	var winSize = cc.director.getWinSize();
	var x = -enemyFishNode.getContentSize().width / 2;
	var minY = enemyFishNode.centerRect().height / 2;
	var maxY = winSize.height - minY;

	var val = maxY - minY;
	var y = minY + (val * Math.random());
	return cc.p(x, y);
};

eatfish.scene.GameLayer.prototype.enemyFishRandomRightPoint = function(enemyFishNode) {
	var winSize = cc.director.getWinSize();
	var x = winSize.width + (enemyFishNode.getContentSize().width / 2);
	var minY = enemyFishNode.centerRect().height / 2;
	var maxY = winSize.height - minY;

	var val = maxY - minY;
	var y = minY + (val * Math.random());
	return cc.p(x, y);
};

eatfish.scene.GameLayer.prototype.changeScore = function(type) {

	switch(type) {
	case eatfish.element.EnemyFishType.fish2:
		this.score += cfg.scoreFish2;
		this.eatFish += cfg.scoreFish2;
		this.eatFishTotal += 1;
		this.eatFishTotalType1And2 += 1;
		
		break;
	case eatfish.element.EnemyFishType.fish3:
		this.score += cfg.scoreFish3;
		this.eatFish += cfg.scoreFish3;
		this.eatFishTotal += 1;
		this.eatFishTotalType3 += 1;
		
		break;
	case eatfish.element.EnemyFishType.fish4:
		this.score += cfg.scoreFish4;
		this.eatFish += cfg.scoreFish4;
		this.eatFishTotal += 1;
		this.eatFishTotalType4 += 1;
		
		break;
	default:
		this.score += cfg.scoreFish1;
		this.eatFish += cfg.scoreFish1;
		this.eatFishTotal += 1;
		this.eatFishTotalType1And2 += 1;
		
		break;
	}
	
	if(this.score > cfg.maxScore)
		this.score = cfg.maxScore;

	if(this.eatFish > cfg.maxScore)
		this.eatFish = cfg.maxScore;

	if(this.eatFishTotal > cfg.maxScore)
		this.eatFishTotal = cfg.maxScore;
				
};

eatfish.scene.GameLayer.prototype.changePlayerLife = function(playerLife) {
	this.playerLife = playerLife;
	
	var fishLifeLab = this.getChildByTag(eatfish.scene.GameLayerTag.labFishLife);
	fishLifeLab.setString(this.playerLife.toString());
};

eatfish.scene.GameLayer.prototype.onDialogBtnNo = function(sender) {
	//取消退出游戏
	sender.removeFromParent(true);
	
	var maskLayer = this.getChildByTag(eatfish.scene.GameLayerTag.mask);
	maskLayer.removeFromParent(true);
	
	var pauseNode = this.getChildByTag(eatfish.scene.GameLayerTag.pauseNode);
	var clearNode = this.getChildByTag(eatfish.scene.GameLayerTag.clearNode);
	var gameoverNode = this.getChildByTag(eatfish.scene.GameLayerTag.gameoverNode);
	
	if(pauseNode) {
		var btnResume = pauseNode.getChildByTag(eatfish.scene.GameLayerTag.btnResume);
		btnResume.setEnabled(true);
		var btnSound = pauseNode.getChildByTag(eatfish.scene.GameLayerTag.btnSound);
		btnSound.setEnabled(true);
		var btnEffect = pauseNode.getChildByTag(eatfish.scene.GameLayerTag.btnEffect);
		btnEffect.setEnabled(true);
		var btnExit = pauseNode.getChildByTag(eatfish.scene.GameLayerTag.btnExit);
		btnExit.setEnabled(true);
	}
	
	if(clearNode) {
		var btnExit = clearNode.getChildByTag(eatfish.scene.GameLayerTag.btnExit);
		btnExit.setEnabled(true);
		var btnNext = clearNode.getChildByTag(eatfish.scene.GameLayerTag.btnNext);
		btnNext.setEnabled(true);
	}
	
	if(gameoverNode) {
		var btnExit = gameoverNode.getChildByTag(eatfish.scene.GameLayerTag.btnExit);
		btnExit.setEnabled(true);
		var btnRestart = gameoverNode.getChildByTag(eatfish.scene.GameLayerTag.btnRestart);
		btnRestart.setEnabled(true);
	}
	
};

eatfish.scene.GameLayer.prototype.onDialogBtnYes = function(sender) {
	this.unscheduleUpdate();
	
	var s = new eatfish.scene.StartScene();
	var t = cc.TransitionFade(cfg.transition, s);
	cc.director.pushScene(t);	
};

eatfish.scene.GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new eatfish.scene.GameLayer();
		this.addChild(layer);
	}
});
