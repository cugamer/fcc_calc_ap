function addTwo(inputObj) {
	var first = convertToBignum(inputObj.val[0]);
	var second = convertToBignum(inputObj.val[1]);
	return first.plus(second);
}

function subtractTwo(inputObj) {
	var first = convertToBignum(inputObj.val[0]);
	var second = convertToBignum(inputObj.val[1]);
	return first.minus(second);
}

function multiplyTwo(inputObj) {
	var first = convertToBignum(inputObj.val[0]);
	var second = convertToBignum(inputObj.val[1]);
	return first.times(second);
}

function divideTwo(inputObj) {
	var first = convertToBignum(inputObj.val[0]);
	var second = convertToBignum(inputObj.val[1]);
	return first.dividedBy(second);
}


function convertToBignum(inputNum) {
	var num = inputNum;
	return num instanceof BigNumber ? num : new BigNumber(num, 10);
}