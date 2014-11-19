
//配置部分

var cfg = {
		version: "1.0.0",
		transition: 0.5, //过场时间
		
		player: 2, //player默认的生命值
		playerInvincible: 4.0, //玩家的初始化无敌时间
		playerInvincible2: 30.0, //玩家使用道具获得的无敌时间
		
		bgSound: "cfg_bgSound",
		effectSound: "cfg_effectSound",
		
		//动画缓存key
		animKeyPlayerFish: "AnimKeyPlayerFish",
		animKeyPlayerBFish: "AnimKeyPlayerBFish",
		animKeyPlayerMFish: "AnimKeyPlayerMFish",
		animKeyEnemyFish1: "AnimKeyEnemyFish1",
		animKeyEnemyFish2: "AnimKeyEnemyFish2",
		animKeyEnemyFish3: "AnimKeyEnemyFish3",
		animKeyEnemyFish4: "AnimKeyEnemyFish4",
		animKeyEnemyFish5: "AnimKeyEnemyFish5",
		animKeyEnemyFish6: "AnimKeyEnemyFish6",
		animKeyJellyFish: "AnimKeyJellyFish",
		
		enemyJellyFish: 0.0005, //水母每帧的出现机率 1/2000的机率
		
		//各个AI鱼的出现机率
		enemyFish1: 0.05,
		enemyFish2: 0.05,
		enemyFish3: 0.00625,
		enemyFish4: 0.00375,
		enemyFish5: 0.00125,
		enemyFish6: 0.00125,
		
		//吃了一条鱼所加的分数
		scoreFish1: 1,
		scoreFish2: 1,
		scoreFish3: 2,
		scoreFish4: 3,
		
		//最高分数
		maxScore: 99999,
		
		//最高关卡
		maxStage: 99,
		
		globalFontName01: "Estrangelo Edessa",
		globalFontName02: "Estrangelo Edessa",
		
		//升级到中等或大的所需分数
		playerStatusNormal: 145, //这个值必须为STAGE_CLEAR的29%
		playerStatusBig: 305, //这个值必须为STAGE_CLEAR的61%
		
		//吃够多少条鱼过一关
		stageClear: 500 //小鱼+1，中鱼+2，大鱼+3	
		
};
