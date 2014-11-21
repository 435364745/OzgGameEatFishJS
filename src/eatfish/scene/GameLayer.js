
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
//		btnPause.addTouchEventListener(this.onButton, this);
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
		this.enabledTouchEvent(false);
		
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

	}

};

eatfish.scene.GameLayer.prototype.enemyFishMoveEnd = function(sneder) {
	sender.removeFromParent(true);
};

eatfish.scene.GameLayer.prototype.scenePause = function() {
	
};

eatfish.scene.GameLayer.prototype.onButton = function(sender, eventType) {
	
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
	
	cc.eventManager.setEnabled(enabled);
	
	var btnPause = this.getChildByTag(eatfish.scene.GameLayerTag.btnPause);
	btnPause.setEnabled(enabled);
		
};

//点击事件 end
//这里的this不是eatfish.scene.GameLayer实例
eatfish.scene.GameLayer.prototype.onLayerTouchBegan = function(touch, event) {
	
	return true;
};

eatfish.scene.GameLayer.prototype.onLayerTouchMoved = function(touch, event) {
	
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

	enemyFishNode.runAction(cc.Sequence.create(cc.MoveTo.create(moveTime, endPoint), cc.CallFunc.create(this.enemyFishMoveEnd, this, enemyFishNode)));

};

eatfish.scene.GameLayer.prototype.enemyFishRandomLeftPoint = function(enemyFishNode) {
	var winSize = cc.director.getWinSize();
	var x = -enemyFishNode.getContentSize().width / 2;
	var minY = enemyFishNode.centerRect().size.height / 2;
	var maxY = winSize.height - minY;

	var val = maxY - minY;
	var y = minY + (val * Math.random());
	return cc.p(x, y);
};

eatfish.scene.GameLayer.prototype.enemyFishRandomRightPoint = function(enemyFishNode) {
	var winSize = cc.director.getWinSize();
	var x = winSize.width + (enemyFishNode.getContentSize().width / 2);
	var minY = enemyFishNode.centerRect().size.height / 2;
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
