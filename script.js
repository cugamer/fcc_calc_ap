function inputConstructor() {
	var input = {
		val:         [],
		opperations: []
	}
	return input;
}

function addValToInput(val, input) {
	input.values.push(val);
}

function remValFromInput(pos, input) {
	input.values.splice(pos, 1);
}

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
	var num = inputNum.toString();
	return num instanceof BigNumber ? num : new BigNumber(num, 10);
}