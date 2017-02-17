function inputConstructor() {
	var input = {
		vals: [],
		opps: []
	}
	return input;
}

function addValToInput(vals, input) {
	var big = new BigNumber(vals);
	input.vals.push(big);
}

function remValFromInput(pos, input) {
	return input.vals.splice(pos, 1)[0];
}

function addOpToInput(op, input) {
	input.opps.push(op);
}

function removeOpFromInput(pos, input) {
	return input.opps.splice(pos, 1)[0];
}

function addNums(inputObj) {
	var first = convertToBignum(inputObj.vals[0]);
	var second = convertToBignum(inputObj.vals[1]);
	return first.plus(second);
}

function subtractTwo(inputObj) {
	var first = convertToBignum(inputObj.vals[0]);
	var second = convertToBignum(inputObj.vals[1]);
	return first.minus(second);
}

function multiplyTwo(inputObj) {
	var first = convertToBignum(inputObj.vals[0]);
	var second = convertToBignum(inputObj.vals[1]);
	return first.times(second);
}

function divideTwo(inputObj) {
	var first = convertToBignum(inputObj.vals[0]);
	var second = convertToBignum(inputObj.vals[1]);
	return first.dividedBy(second);
}


function convertToBignum(inputNum) {
	var num = inputNum.toString();
	return num instanceof BigNumber ? num : new BigNumber(num, 10);
}

function binOp(inputObj, cb) {
	var len = inputObj.vals.length;
	var sum = cb(inputObj);
	remValFromInput(len - 1, inputObj);
	inputObj.vals[len - 2] = sum;
	return sum;
}