
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
	animKeyItemGold: "AnimKeyItemGold",
	
	enemyJellyFish: 0.0005, //水母每帧的出现机率
	
	//各个AI鱼的出现机率
	enemyFish1: 0.05,
	enemyFish2: 0.05,
	enemyFish3: 0.00625,
	enemyFish4: 0.00375,
	enemyFish5: 0.00125,
	enemyFish6: 0.00125,
	
	//金币的出现机率
	itemGold: 0.005,
	
	//吃了一条鱼所加的分数
	scoreFish1: 1,
	scoreFish2: 1,
	scoreFish3: 2,
	scoreFish4: 3,
	
	//吃了一个金币所加的分数
	scoreItemGold: 5,
	
	//最高分数
	maxScore: 999999,
	
	//最高关卡
	maxStage: 99,
	
	globalFontName01: "Arial-BoldMT",
	globalFontName02: "Arial-BoldItalicMT",
	
	//吃够多少条鱼过一关
	stageClear: 40, //小鱼+1，中鱼+2，大鱼+3
	stageClearStep: 20, //每过一关，增加的吃鱼条件
	
	//窗口大小
	windowWidth: 960.0,
	windowHeight: 640.0
	
};

//定义本游戏的命名空间
var eatfish;
if(!eatfish)
	eatfish = {};
if(!eatfish.element)
	eatfish.element = {};
if(!eatfish.scene)
	eatfish.scene = {};
