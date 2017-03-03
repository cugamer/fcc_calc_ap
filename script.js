// (function() {
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
function useButtonInput(e) {
	if(!displayFocused) {
		val = this.dataset.button;
		useInput(val);
	}
}

function getButtonVal(btn) { return btn.dataset.button; }

function useKeyInput(e) {
	var key = e.key;
	var okValues = /[\.\+\-\*\/\d]|Enter|Escape|Backspace/;
	if(!key.match(okValues)) { return; }
	if(!displayFocused) {
		if(key === "Enter") {
			key = "="; 
		} else if(key === "*") {
			key = "X";
		} else if(key === "Escape") {
			key = "ac";
		} else if(key === "Backspace") {
			key = "shorten";
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
	} else if(input.match(/^shorten$/)) {
		shortenCurrentNumStr();	
	} else if(input.match(/^plusmin$/)) {
		toggleSign();
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
	workingInputDisp();
}

// -----------------Output display------------------------
function updateDisplay(val) {
	disp.value = val || "0";
}

function currentNumStringBuilder(nextInput, currentString) {
	var current = currentString || "";
	if(nextInput.match(/\./)) {
		return addDecimal(currentString);
	} else {
		return current += nextInput;
	}
}

function clearCurrentNumStr() {
	currentNumStr = "";
	updateDisplay(currentNumStr);
}

function shortenCurrentNumStr() {
	var len = currentNumStr.length;
	if(len > 0) {
		currentNumStr = currentNumStr.slice(0, len - 1);
		updateDisplay(currentNumStr);
	}
}

function allClear() {
	inputHistory = archiveInputArr(currentInput, inputHistory);
	currentInput = refreshCurrentInput();
	clearCurrentNumStr();
	clearWorkingInput();
}

function archiveInputArr(inputArr, history) {
	history.push(inputArr);
	return history;
}

function refreshCurrentInput() {
	return inputConstructor();
}

function toggleSign() {
	if(getCurrentDispVal()[0] === "-") {
		currentNumStr = currentNumStr.slice(1, currentNumStr.length);
	} else {
		if(currentInput.vals[currentInput.vals.length - 1]) {
			var stringBase = currentNumStr || currentInput.vals[currentInput.vals.length - 1];
		} else {
			stringBase = "";
		}
		currentNumStr = "-" + stringBase;
	}
	updateDisplay(currentNumStr);
}

function getCurrentDispVal() {
	return disp.value;
}

function addDecimal(str) {
	if(str.length === 0) { str = "0"; }
	return str.match(/\./) ? str : str + ".";
}

function workingInputDisp() {
	var lastVal = currentInput.vals[currentInput.vals.length - 1] || "";
	var nextLast = currentInput.vals[currentInput.vals.length - 2] || "";
	var lastInput = currentInput.lastInputVal.c[0] || "";
	var lastOpp = currentInput.opps[currentInput.opps.length - 1] || "";
	// workingInput.textContent = "fun fun fun"
	workingInput.textContent = nextLast + " " + lastOpp + " " + lastInput + " = " + lastVal;
}

function clearWorkingInput() {
	workingInput.textContent = "";
}

// -----------------Global variables------------------------
var currentInput = inputConstructor();
var currentNumStr = "";
var displayFocused = false;
var buttons = document.querySelectorAll(".calc-btn");
var disp = document.querySelector('.display');
var inputHistory = [];
var workingInput = document.querySelector('.working-input');

// -----------------Event listeners------------------------
disp.addEventListener("focus", function() { displayFocused = true; });
disp.addEventListener("blur", function() { displayFocused = false; });
disp.addEventListener('input', captureDirectInput);

document.addEventListener('keyup', useKeyInput);
buttons.forEach(function(btn){ btn.addEventListener('mouseup', useButtonInput, true) });













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
// })();