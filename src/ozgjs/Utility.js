
//范围随机int
function randomInt(min, max) {   
	var range = max - min;
	var rand = Math.random();
	return (min + Math.round(rand * range));   
}

//范围随机float
function randomFloat(min, max) {   
	var range = max - min;
	var rand = Math.random();
	return (min + (rand * range));   
}
