
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
	fishLifeLab: 11,
	fishPlayer: 12
	
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
		fishLifeLab.setTag(eatfish.scene.GameLayerTag.fishLifeLab);
		fishLifeLab.setPosition(140, 540);
		fishLifeLab.setTextColor(cc.color(255, 255, 255, 255));
		fishLifeLab.setTextAreaSize(cc.size(100, 40));
		fishLifeLab.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
		fishLifeLab.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		this.addChild(fishLifeLab);
				
//		this.enabledTouchEvent(false);
		
		//player
//		var player = new eatfish.element.PlayerNode();
//		player.setPosition(winSize.width / 2, 300);
//		player.setTag(eatfish.scene.GameLayerTag.fishPlayer);
//		fishNode.addChild(player, 99999);
//		player.invincible();

		//配合过场的时间，所以延时执行这个方法
//		this.scheduleOnce(this.gameStart, cfg.transition);
		
		return true;
	}
});

eatfish.scene.GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new eatfish.scene.GameLayer();
		this.addChild(layer);
	}
});
