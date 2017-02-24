function inputConstructor(vals, opps, lastInputVal) {
	var input = {
		vals:         vals         || [],
		opps:         opps         || [],
		lastInputVal: lastInputVal || convertToBignum("0"),
		recursive:    false,
		reverseOrder: false
	}
	return input;
}

// -----------------Input object management------------------------
function convertToBignum(inputNum) {
	var num = inputNum.toString();
	return num instanceof BigNumber ? num : new BigNumber(num, 10);
}

function addValToInput(val, input, updateVals) {
	var big = new BigNumber(val);
	if(input.lastInputVal != null && updateVals) {
		input.vals.push(input.lastInputVal);
	}
	input.lastInputVal = big;
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

// -----------------Arithmetic functions------------------------
function addNums(inputObj) {
	var lastInputVal = inputObj.lastInputVal;
	var len = inputObj.vals.length
	var workingVal = inputObj.vals[len - 1];
	return lastInputVal.plus(workingVal);
}

function subtractNums(inputObj) {
	var lastInputVal = inputObj.lastInputVal;
	var len = inputObj.vals.length
	var workingVal = inputObj.vals[len - 1];
	return !inputObj.reverseOrder ? workingVal.minus(lastInputVal) : lastInputVal.minus(workingVal);
}

function multiplyNums(inputObj) {
	var lastInputVal = inputObj.lastInputVal;
	var len = inputObj.vals.length
	var workingVal = inputObj.vals[len - 1];
	return lastInputVal.times(workingVal);
}

function divideNums(inputObj) {
	var lastInputVal = inputObj.lastInputVal;
	var len = inputObj.vals.length
	var workingVal = inputObj.vals[len - 1];
	return !inputObj.reverseOrder ? workingVal.dividedBy(lastInputVal) : lastInputVal.dividedBy(workingVal);
}

// -----------------User input------------------------
function useButtonInput() {
	if(!displayFocused) {
		val = getButtonVal(this);
		useInput(val);
	}
}

function getButtonVal(btn) { return btn.dataset.button; }

function useKeyInput(e) {
	if(!displayFocused) {
		var key = e.key;
		if(key === "Enter") {
			key = "="; 
		} else if (key === "*") {
			key = "X";
		}
		useInput(key);
	}
}

function captureDirectInput() {
	var input = this.value;
	if(input.match(/^\d*\.*\d*$/)) {
		if(input[0] === ".") {
			input = "0" + input;
		}
		currentNumStr = input;
	}
	updateDisplay(currentNumStr);
}

// -----------------Operations management------------------------
function useInput(input) {
	if(input.match(/(\d|\.)/)) {
		handleDigitInput(input);
	} else if(input.match(/(X|\/|-|\+)/)) {
		handleBinaryOperation(input);
	} else if(input.match(/=/)) {
		handleEqualsOperation();
	} else if(input.match(/^c$/)) {
		clearCurrentNumStr();
	} else if(input.match(/^ac$/)) {
		allClear();
	}
}

function handleDigitInput(input) {
	currentNumStr = currentNumStringBuilder(input, currentNumStr);
	updateDisplay(currentNumStr);
}

function handleBinaryOperation(input) {
	if(currentNumStr.length > 0) {
		if(currentInput.recursive) {
			addValToInput(currentNumStr, currentInput, false);
			updateDisplay(callBinaryOp(currentInput).toString());
		} else if (currentInput.opps.length > 0) {
			addValToInput(currentNumStr, currentInput, true);
			updateDisplay(callBinaryOp(currentInput).toString());
			currentInput.recursive = true;
		} else {
			addValToInput(currentNumStr, currentInput, true);				
		}
		currentNumStr = "";
	}
	if(currentInput.vals.length > 0 || currentInput.lastInputVal) {
		addOpToInput(input, currentInput);
	}
}

function callBinaryOp(inputObj) {
	var oppFunc = selectOpFunction(inputObj);
	var result = binOp(inputObj, oppFunc, inputObj.reverseOrder);
	return result;
}

function binOp(inputObj, cb) {
	var result = cb(inputObj, inputObj.reverseOrder);
	// Keep an eye on this, used to be length minus one
	inputObj.vals[inputObj.vals.length] = result;
	return result;
}

function selectOpFunction(inputObj) {
	var mostRecent = inputObj.opps[inputObj.opps.length - 1]
	switch(mostRecent) {
		case '+': return addNums;
		case '-': return subtractNums;
		case 'X': return multiplyNums;
		case '/': return divideNums;
		default: return "Operator value not found";
	}
}

function handleEqualsOperation(input) {
	if(currentNumStr.length > 0) {
		if(currentInput.recursive) {
			addValToInput(currentNumStr, currentInput, false);
		} else if(currentInput.opps.length > 0) {
			addValToInput(currentNumStr, currentInput, true);
			currentInput.recursive = true;
		} 
		currentNumStr = "";
	}
	updateDisplay(callBinaryOp(currentInput).toString());
}

// -----------------Output display------------------------
function updateDisplay(val) {
	disp.value = val;
}

function currentNumStringBuilder(nextInput, currentString) {
	var current = currentString || "";
	return nextInput === "." && current.length === 0 ? "0." : current += nextInput;
}

function clearCurrentNumStr() {
	currentNumStr = "";
	updateDisplay("0");
}

function allClear() {
	inputHistory = archiveInputArr(currentInput, inputHistory);
	currentInput = refreshCurrentInput();
	clearCurrentNumStr();
}

function archiveInputArr(inputArr, history) {
	return history.push(inputArr);
}

function refreshCurrentInput() {
	return inputConstructor();
}

// -----------------Global variables------------------------
var currentInput = inputConstructor();
var currentNumStr = "";
var displayFocused = false;
var buttons = document.querySelectorAll(".calc-btn");
var disp = document.querySelector('.display');
var inputHistory = [];

// -----------------Event listeners------------------------
disp.addEventListener("focus", function() { displayFocused = true; });
disp.addEventListener("blur", function() { displayFocused = false; });
disp.addEventListener('input', captureDirectInput);

document.addEventListener('keyup', useKeyInput);
buttons.forEach(function(btn){ btn.addEventListener('click', useButtonInput) });













// -----------------Unused functions------------------------
function updateInputVals(inputObj) {
	inputObj.vals.push(convertToBignum(currentNumStr));
	currentNumStr = "";
}

function checkIfReady(inputObj) {
	var binOpps = /(X|\/|-|\+)/;
	if(inputObj.vals.length >= 1 && 
		inputObj.opps.length >= 1 &&
		inputObj.opps[inputObj.opps.length - 1].match(/(X|\/|-|\+)/)) {
		return true;
	}
	return false;
}