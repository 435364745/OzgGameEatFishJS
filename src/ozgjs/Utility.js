
//范围随机
function rangeRandom(min, max) {   
	var range = max - min;
	var rand = Math.random();
	return(min + Math.round(rand * range));   
}
