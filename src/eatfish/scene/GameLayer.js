
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
//stageClear //吃够多少条鱼过一关
//playerStatusNormal //升级到中等鱼的所需条件，这个值必须为m_stageClear的29%
//playerStatusBig //升级到大鱼的所需条件，这个值必须为m_stageClear的61%

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
		
		this.score = 0;
		this.stageNum = 1;
		this.playerLife = cfg.player;
		this.eatFish = 0;
		this.eatFishTotal = 0;
		this.eatFishTotalType1And2 = 0;
		this.eatFishTotalType3 = 0;
		this.eatFishTotalType4 = 0;
		
		this.stageClear = cfg.stageClear;
		this.playerStatusNormal = parseInt(parseFloat(this.stageClear) * 0.29 + 0.5);
		this.playerStatusBig = parseInt(parseFloat(this.stageClear) * 0.61 + 0.5);
		
		this.isTouchEnabled = false;
		
		cc.spriteFrameCache.addSpriteFrames(res.Fishtales_plist);
		cc.spriteFrameCache.addSpriteFrames(res.Fishall_plist);
		cc.spriteFrameCache.addSpriteFrames(res.cump_plist);
		
		var winSize = cc.director.getWinSize();
		
		//背景
		var bgList = [ res.bg1_png, res.bg2_png, res.bg3_png ];
		var i = randomInt(0, bgList.length - 1);
				
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
		var stageNumLab = new cc.LabelTTF(strings.gameSceneLabStageNum + this.stageNum.toString(), cfg.globalFontName01, 30, cc.size(400, 40), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		stageNumLab.setTag(eatfish.scene.GameLayerTag.labStageNum);
		stageNumLab.setPosition(winSize.width, winSize.height - 24);
		stageNumLab.setFontFillColor(cc.color(255, 255, 255));
		this.addChild(stageNumLab);
		
		var scoreLab = new cc.LabelTTF(strings.gameSceneLabScore + this.score.toString(), cfg.globalFontName01, 30, cc.size(400, 40), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		scoreLab.setTag(eatfish.scene.GameLayerTag.labScore);
		scoreLab.setPosition(winSize.width, winSize.height - 56);
		scoreLab.setFontFillColor(cc.color(255, 255, 255));
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
		
		var fishLife = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("fishlife.png"));
		fishLife.setPosition(70, 550);
		fishLife.setTag(eatfish.scene.GameLayerTag.fishLife);
		this.addChild(fishLife);
		
		var fishLifeLab = new cc.LabelTTF(this.playerLife.toString(), cfg.globalFontName01, 30, cc.size(100, 40), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		fishLifeLab.setTag(eatfish.scene.GameLayerTag.labFishLife);
		fishLifeLab.setPosition(140, 540);
		fishLifeLab.setFontFillColor(cc.color(255, 255, 255));
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
		
		return true;
	},
	onEnterTransitionDidFinish: function() {
		this.gameStart();
	}
});

eatfish.scene.GameLayer.prototype.update = function(delay) {
	var winSize = cc.director.getWinSize();
	
	var fishNode = this.getChildByTag(eatfish.scene.GameLayerTag.fishNode);
	if(!fishNode)
		return;
	
	var offsetVal = this.stageNum * 0.0003;
	
	//水母
	if(Math.random() <= cfg.enemyJellyFish + offsetVal) {
		var enemyFishNode = new eatfish.element.JellyfishNode();

		var minVal = enemyFishNode.getContentSize().width / 2;
		var maxVal = winSize.width - (enemyFishNode.getContentSize().width / 2);

		srcX = randomFloat(minVal, maxVal);

		enemyFishNode.setPosition(cc.p(srcX, -enemyFishNode.getContentSize().height / 2));
		fishNode.addChild(enemyFishNode);

		var moveTime = randomFloat(10.0, 15.0);

		enemyFishNode.runAction(cc.sequence(
			cc.moveTo(moveTime, cc.p(srcX, winSize.height + (enemyFishNode.getContentSize().height / 2))), 
			cc.callFunc(function() {
				enemyFishNode.removeFromParent(true);
			}, this)
		));

	}

	//金币
	if (Math.random() <= cfg.itemGold) {
		var itemNode = new eatfish.element.ItemNode(eatfish.element.ItemNodeType.gold);

		var minVal = itemNode.getContentSize().width / 2;
		var maxVal = winSize.width - (itemNode.getContentSize().width / 2);
		var srcX = randomFloat(minVal, maxVal);
		
		itemNode.setPosition(srcX, winSize.height + (itemNode.getContentSize().height / 2));
		fishNode.addChild(itemNode);
		
		var moveTime = randomFloat(15.0, 20.0);
		itemNode.runAction(cc.Sequence.create(
			cc.moveTo(moveTime, cc.p(srcX, -itemNode.getContentSize().height / 2)),
			cc.callFunc(function() {
				itemNode.removeFromParent(true);
			}, this)
		));
	}

	//fish1
	if(Math.random() <= cfg.enemyFish1 + offsetVal) {
		var enemyFishNode = new eatfish.element.EnemyFishNode(eatfish.element.EnemyFishType.fish1);
		this.enemyFishEmergence(enemyFishNode);
	}

	//fish2
	if(Math.random() <= cfg.enemyFish2 + offsetVal) {
		var enemyFishNode = new eatfish.element.EnemyFishNode(eatfish.element.EnemyFishType.fish2);
		this.enemyFishEmergence(enemyFishNode);
	}

	//fish3
	if(Math.random() <= cfg.enemyFish3 + offsetVal) {
		var enemyFishNode = new eatfish.element.EnemyFishNode(eatfish.element.EnemyFishType.fish3);
		this.enemyFishEmergence(enemyFishNode);
	}

	//fish4
	if(Math.random() <= cfg.enemyFish4 + offsetVal) {
		var enemyFishNode = new eatfish.element.EnemyFishNode(eatfish.element.EnemyFishType.fish4);
		this.enemyFishEmergence(enemyFishNode);
	}

	//fish5
	if(Math.random() <= cfg.enemyFish5 + offsetVal) {
		var enemyFishNode = new eatfish.element.EnemyFishNode(eatfish.element.EnemyFishType.fish5);
		this.enemyFishEmergence(enemyFishNode);
	}

	//fish6
	if(Math.random() <= cfg.enemyFish6 + offsetVal) {
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

			if (cc.rectIntersectsRect(srcCenter, targetCenter)) {
				if ((srcObj.elementName >= eatfish.element.Name.enemtyFish1 && srcObj.elementName <= eatfish.element.Name.enemtyFish6) && (targetObj.elementName >= eatfish.element.Name.enemtyFish1 && targetObj.elementName <= eatfish.element.Name.enemtyFish6)) {
					//Enemy鱼跟Enemy鱼的处理
					//大鱼吃小鱼
					if (srcObj.type > eatfish.element.EnemyFishType.fish2 && srcObj.type > targetObj.type) {
						srcObj.cump();
						targetObj.removeFromParent(true);
					}
				}
				else if ((srcObj.elementName >= eatfish.element.Name.enemtyFish1 && srcObj.elementName <= eatfish.element.Name.enemtyFish6) && targetObj.elementName == eatfish.element.Name.jellyFish) {
					//鲨鱼不执行
					if (srcObj.type < eatfish.element.EnemyFishType.fish5) {
						//Enemy鱼跟水母的处理
						srcObj.paralysis();
					}
				}
				else if (srcObj.elementName == eatfish.element.Name.player) {
					
					if (targetObj.elementName == eatfish.element.Name.jellyFish) {
						//player与水母碰撞了
						if (srcObj.effectStatus != eatfish.element.BaseFishNodeEffectStatus.invincible) {
							cc.audioEngine.playEffect(res.audios_jellyfish_mp3);
							srcObj.paralysis();
						}												
					}
					else if (targetObj.elementName == eatfish.element.Name.itemGold) {
						//player与item碰撞了
						
						var player = srcObj;
						
						switch (targetObj.type) {
							default:
								//吃了金币
								player.cump(targetObj.type);
								targetObj.removeFromParent(true);
								
								//加分
								this.changeScore(targetObj.type);
								break;
						}
						
					}
					else if (targetObj.elementName >= eatfish.element.Name.enemtyFish1 && targetObj.elementName <= eatfish.element.Name.enemtyFish6) {
						//player与Enemy鱼碰撞了
						var doEat = false;
						var player = srcObj;
						
						if (player.isMoving) {
							switch (player.status) {
								case eatfish.element.PlayerNodeStatus.normal:
									//中的状态
									if (targetObj.type == eatfish.element.EnemyFishType.fish1 || targetObj.type == eatfish.element.EnemyFishType.fish2 || targetObj.type == eatfish.element.EnemyFishType.fish3)
										doEat = true;
									break;
								case eatfish.element.PlayerNodeStatus.big:
									//大的状态
									if (targetObj.type == eatfish.element.EnemyFishType.fish1 || targetObj.type == eatfish.element.EnemyFishType.fish2 || targetObj.type == eatfish.element.EnemyFishType.fish3 || targetObj.type == eatfish.element.EnemyFishType.fish4)
										doEat = true;
									break;
								default:
									//小的状态
									if (targetObj.type == eatfish.element.EnemyFishType.fish1 || targetObj.type == eatfish.element.EnemyFishType.fish2)
										doEat = true;
									break;
							}
						}
						
						if (doEat) {
							//吃掉比自己小的鱼
							player.cump(targetObj.type);
							targetObj.removeFromParent(true);
							
							//分数
							this.changeScore(targetObj.type);
							
							//关卡进度条
							var cpProgress = parseFloat(this.eatFishTotal) / parseFloat(this.stageClear);
							var progress = this.getChildByTag(eatfish.scene.GameLayerTag.progress);
							progress.setPercentage(cpProgress * 100.0);
							
							if (cpProgress >= 1.0) {
								//过关
								this.unscheduleUpdate();
								
								cc.audioEngine.playEffect(res.audios_complete_mp3);
								
								this.enabledTouchEvent(false);
								fishNode.removeAllChildren(true);
								
								//过关界面
								var clearBg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("completebg.png"));
								clearBg.setPosition(clearBg.getContentSize().width / 2, clearBg.getContentSize().height / 2);
								
								var clearNode = new cc.Node();
								clearNode.setAnchorPoint(0.5, 0.5);
								clearNode.setContentSize(clearBg.getContentSize());
								clearNode.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
								clearNode.setTag(eatfish.scene.GameLayerTag.clearNode);
								this.addChild(clearNode);
								clearNode.addChild(clearBg);
								
								var fishNum = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("fishnum.png"));
								fishNum.setPosition(clearNode.getContentSize().width / 2, clearNode.getContentSize().height / 2);
								clearNode.addChild(fishNum);
								
								var title = new cc.LabelTTF(strings.clearTitle, cfg.globalFontName01, 50, cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
								title.setTag(eatfish.scene.StartLayerTag.helpTitle);
								title.setPosition(clearNode.getContentSize().width / 2, 470);
								clearNode.addChild(title);
								
								var gameClearLab1 = new cc.LabelTTF(this.eatFishTotalType1And2, cfg.globalFontName01, 30, cc.size(500, 40), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
								gameClearLab1.setPosition(730, 330);
								clearNode.addChild(gameClearLab1);
								
								var gameClearLab2 = new cc.LabelTTF(this.eatFishTotalType3, cfg.globalFontName01, 30, cc.size(500, 40), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
								gameClearLab2.setPosition(730, 255);
								clearNode.addChild(gameClearLab2);
								
								var gameClearLab3 = new cc.LabelTTF(this.eatFishTotalType4, cfg.globalFontName01, 30, cc.size(500, 40), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
								gameClearLab3.setPosition(730, 180);
								clearNode.addChild(gameClearLab3);

								var btnExit = new ccui.Button();
								btnExit.loadTextureNormal(res.btn1_up_png);
								btnExit.loadTexturePressed(res.btn1_dw_png);
								btnExit.setPosition(200, 70);
								btnExit.addTouchEventListener(this.onButton, this);
								btnExit.setTag(eatfish.scene.GameLayerTag.btnExit);
								btnExit.setTitleFontName(cfg.globalFontName01);
								btnExit.setTitleFontSize(22.0);
								btnExit.setTitleText(strings.clearExit);
								clearNode.addChild(btnExit);

								var btnNext = new ccui.Button();
								btnNext.loadTextureNormal(res.btn1_up_png);
								btnNext.loadTexturePressed(res.btn1_dw_png);
								btnNext.setPosition(clearNode.getContentSize().width - 200, 70);
								btnNext.addTouchEventListener(this.onButton, this);
								btnNext.setTag(eatfish.scene.GameLayerTag.btnNext);
								btnNext.setTitleFontName(cfg.globalFontName01);
								btnNext.setTitleFontSize(22.0);
								btnNext.setTitleText(strings.clearNext);
								clearNode.addChild(btnNext);
								
							}
							
							//变大的判断
							if (player.status == eatfish.element.PlayerNodeStatus.normal && this.eatFish >= this.playerStatusBig) {
								cc.audioEngine.playEffect(res.audios_growth_mp3);
								player.changeStatus(eatfish.element.PlayerNodeStatus.big);
							}
							else if (player.status == eatfish.element.PlayerNodeStatus.small && this.eatFish >= this.playerStatusNormal) {
								cc.audioEngine.playEffect(res.audios_growth_mp3);
								player.changeStatus(eatfish.element.PlayerNodeStatus.normal);
							}
						}
						else {
							//如果在可控制状态下，不是无敌状态的话，就会被比自己大的鱼吃了
							
							if (player.isMoving && player.effectStatus != eatfish.element.BaseFishNodeEffectStatus.invincible) {
								targetObj.cump();
								player.removeFromParent(true);
								this.enabledTouchEvent(false);
								
								if (this.playerLife == 0) {
									this.unscheduleUpdate();
									
									//没有了生命值就game over
									cc.audioEngine.playEffect(res.audios_complete_mp3);
									this.enabledTouchEvent(false);
									fishNode.removeAllChildren(true);
									
									//game over界面
									var gameoverBg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame("completebg.png"));
									gameoverBg.setPosition(gameoverBg.getContentSize().width / 2, gameoverBg.getContentSize().height / 2);
									
									var gameoverNode = new cc.Node();
									gameoverNode.setAnchorPoint(0.5, 0.5);
									gameoverNode.setContentSize(gameoverBg.getContentSize());
									gameoverNode.setPosition(cc.director.getWinSize().width / 2, cc.director.getWinSize().height / 2);
									gameoverNode.setTag(eatfish.scene.GameLayerTag.gameoverNode);
									this.addChild(gameoverNode);
									gameoverNode.addChild(gameoverBg);
									
									var title = new cc.LabelTTF(strings.gameoverTitle, cfg.globalFontName01, 50, cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
									title.setPosition(gameoverNode.getContentSize().width / 2, 430);
									gameoverNode.addChild(title);
									
									var content = new cc.LabelTTF(strings.gameoverContent, cfg.globalFontName01, 30, cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
									content.setPosition(gameoverNode.getContentSize().width / 2, 350);
									gameoverNode.addChild(content);
									
									var btnExit = new ccui.Button();
									btnExit.loadTextureNormal(res.btn1_up_png);
									btnExit.loadTexturePressed(res.btn1_dw_png);
									btnExit.setPosition(200, 70);
									btnExit.addTouchEventListener(this.onButton, this);
									btnExit.setTag(eatfish.scene.GameLayerTag.btnExit);
									btnExit.setTitleFontName(cfg.globalFontName01);
									btnExit.setTitleFontSize(22.0);
									btnExit.setTitleText(strings.gameoverExit);
									gameoverNode.addChild(btnExit);
									
									var btnRestart = new ccui.Button();
									btnRestart.loadTextureNormal(res.btn1_up_png);
									btnRestart.loadTexturePressed(res.btn1_dw_png);
									btnRestart.setPosition(gameoverNode.getContentSize().width - 200, 70);
									btnRestart.addTouchEventListener(this.onButton, this);
									btnRestart.setTag(eatfish.scene.GameLayerTag.btnRestart);
									btnRestart.setTitleFontName(cfg.globalFontName01);
									btnRestart.setTitleFontSize(22.0);
									btnRestart.setTitleText(strings.gameoverRestart);
									gameoverNode.addChild(btnRestart);

								}
								else {
									this.eatFish = 0;
									
									cc.audioEngine.playEffect(res.audios_playbyeat_mp3);
									this.changePlayerLife(this.playerLife - 1);
									this.scheduleOnce(this.gameRestart, 2.5);
								}
							}
						}
						
					}
					
				}
				
			}
		}
		
	}
	
};

eatfish.scene.GameLayer.prototype.scenePause = function() {
	
	this.unscheduleUpdate();
	
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
		
		if(cc.sys.localStorage.getItem(cfg.bgSound) && cc.sys.localStorage.getItem(cfg.bgSound) == "yes")
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

		if(cc.sys.localStorage.getItem(cfg.effectSound) && cc.sys.localStorage.getItem(cfg.effectSound) == "yes")
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
				
		var labGithub = new cc.LabelTTF("github:https://github.com/ouzhigang/OzgGameEatFishJS", cfg.globalFontName01, 20, cc.size(0, 0), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
		labGithub.setPosition(650, 210);
		pauseNode.addChild(labGithub);
		
    }
    
    
	
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
						if(!cc.sys.localStorage.getItem(cfg.bgSound) || cc.sys.localStorage.getItem(cfg.bgSound) == "no") {
							cc.audioEngine.setMusicVolume(1.0);				
							cc.sys.localStorage.setItem(cfg.bgSound, "yes");
							sender.setTitleText(strings.pauseSound + "(" + strings.pauseOff + ")");
							
						}
						else {				
							cc.audioEngine.setMusicVolume(0.0);
							cc.sys.localStorage.setItem(cfg.bgSound, "no");
							sender.setTitleText(strings.pauseSound + "(" + strings.pauseOn + ")");
							
						}
			
					}
					break;	
				case eatfish.scene.GameLayerTag.btnEffect:
					{
						//效果声音
						if(!cc.sys.localStorage.getItem(cfg.effectSound) || cc.sys.localStorage.getItem(cfg.effectSound) == "no") {
							cc.audioEngine.setEffectsVolume(1.0);
							cc.sys.localStorage.setItem(cfg.effectSound, "yes");
							sender.setTitleText(strings.pauseEffect + "(" + strings.pauseOff + ")");
							
						}
						else {
							cc.audioEngine.setEffectsVolume(0.0);
							cc.sys.localStorage.setItem(cfg.effectSound, "no");				
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
						
						this.stageClear += cfg.stageClearStep;
						this.playerStatusNormal = parseInt(parseFloat(this.stageClear) * 0.29 + 0.5);
						this.playerStatusBig = parseInt(parseFloat(this.stageClear) * 0.61 + 0.5);
						
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
						
						this.gameStart();
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
						
						this.stageClear = cfg.stageClear;
						this.playerStatusNormal = parseInt(parseFloat(this.stageClear) * 0.29 + 0.5);
						this.playerStatusBig = parseInt(parseFloat(this.stageClear) * 0.61 + 0.5);
						
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
			
						this.gameStart();
					}
					break;
				default:
					break;
			}
			break;
	}
	
};

eatfish.scene.GameLayer.prototype.gameStart = function() {
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
	
	if(player && player.isMoving && player.effectStatus != eatfish.element.BaseFishNodeEffectStatus.paralysis) {
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

	var moveTime = randomFloat(10.0, 20.0);

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

	var y = randomFloat(minY, maxY);
	return cc.p(x, y);
};

eatfish.scene.GameLayer.prototype.enemyFishRandomRightPoint = function(enemyFishNode) {
	var winSize = cc.director.getWinSize();
	var x = winSize.width + (enemyFishNode.getContentSize().width / 2);
	var minY = enemyFishNode.centerRect().height / 2;
	var maxY = winSize.height - minY;

	var y = randomFloat(minY, maxY);
	return cc.p(x, y);
};

eatfish.scene.GameLayer.prototype.changeScore = function(type) {

	switch(type) {
		case eatfish.element.EnemyFishType.fish2:
			this.score += cfg.scoreFish2;
			this.eatFish += cfg.scoreFish2;
			this.eatFishTotal += cfg.scoreFish2;
			this.eatFishTotalType1And2 += 1;
			
			break;
		case eatfish.element.EnemyFishType.fish3:
			this.score += cfg.scoreFish3;
			this.eatFish += cfg.scoreFish3;
			this.eatFishTotal += cfg.scoreFish3;
			this.eatFishTotalType3 += 1;
			
			break;
		case eatfish.element.EnemyFishType.fish4:
			this.score += cfg.scoreFish4;
			this.eatFish += cfg.scoreFish4;
			this.eatFishTotal += cfg.scoreFish4;
			this.eatFishTotalType4 += 1;
			
			break;
		
		//道具部分
		case eatfish.element.ItemNodeType.gold:
			//金币
			this.score += cfg.scoreItemGold;

			break;
			
		default:
			this.score += cfg.scoreFish1;
			this.eatFish += cfg.scoreFish1;
			this.eatFishTotal += cfg.scoreFish1;
			this.eatFishTotalType1And2 += 1;

			break;
	}

	if(this.score > cfg.maxScore)
		this.score = cfg.maxScore;

	if(this.eatFish > cfg.maxScore)
		this.eatFish = cfg.maxScore;

	if(this.eatFishTotal > cfg.maxScore)
		this.eatFishTotal = cfg.maxScore;

	var scoreLab = this.getChildByTag(eatfish.scene.GameLayerTag.labScore);
	scoreLab.setString(strings.gameSceneLabScore + this.score.toString());
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
	var t = new cc.TransitionFade(cfg.transition, s);
	cc.director.pushScene(t);	
};

eatfish.scene.GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new eatfish.scene.GameLayer();
		this.addChild(layer);
	}
});
