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

function convertToBignum(inputNum) {
	var num = inputNum.toString();
	return num instanceof BigNumber ? num : new BigNumber(num, 10);
}

function addOpToInput(op, input) {
	input.opps.push(op);
}

function removeOpFromInput(pos, input) {
	return input.opps.splice(pos, 1)[0];
}

function addNums(inputObj) {
	var len = inputObj.vals.length
	var first = inputObj.vals[len - 2];
	var second = inputObj.vals[len - 1];
	return first.plus(second);
}

function subtractNums(inputObj) {
	var len = inputObj.vals.length
	var first = inputObj.vals[len - 2];
	var second = inputObj.vals[len - 1];
	return first.minus(second);
}

function multiplyNums(inputObj) {
	var len = inputObj.vals.length
	var first = inputObj.vals[len - 2];
	var second = inputObj.vals[len - 1];
	return first.times(second);
}

function divideNums(inputObj) {
	var len = inputObj.vals.length
	var first = inputObj.vals[len - 2];
	var second = inputObj.vals[len - 1];
	return first.dividedBy(second);
}

function binOp(inputObj, cb) {
	var sum = cb(inputObj);
	inputObj.vals.pop()
	inputObj.vals.pop();
	inputObj.vals.push(sum);
	return sum;
}

function selectOperation(inputObj) {
	var mostRecent = inputObj.opps.pop();
	switch(mostRecent) {
		case '+':
			return addNums;
		case '-':
			return subtractNums;
		case 'X':
			return multiplyNums;
		case '/':
			return divideNums;
		default:
			return "Opperator value not found";
	}
}

function callOp(inputObj) {
	var opp = inputObj;
	var oppFunc = selectOperation(opp);
	var binOpps = ['+', '-', 'X', '/'];
	var result = binOp(inputObj, oppFunc);
	return result;
}

// -----------------Capture user input------------------------
var buttons = document.querySelectorAll(".calc-btn");
function getButtonVal(btn) {
	return btn.dataset.button;
}

buttons.forEach(function(btn){
	btn.addEventListener('click', useBtnInput)
});

currentNumStr = "";

function useBtnInput() {
	val = getButtonVal(this);
	if(val.match(/(\d)/)) {
		currentNumStr += val;
		console.log(currentNumStr);
	}
}
