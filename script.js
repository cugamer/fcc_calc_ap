function inputConstructor(vals, opps, lastInputVal) {
	var input = {
		vals:         vals         || [],
		opps:         opps         || [],
		lastInputVal: lastInputVal || null
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

function subtractNums(inputObj, reverseOrder) {
	var lastInputVal = inputObj.lastInputVal;
	var len = inputObj.vals.length
	var workingVal = inputObj.vals[len - 1];
	return !reverseOrder ? workingVal.minus(lastInputVal) : lastInputVal.minus(workingVal);
}

function multiplyNums(inputObj) {
	var lastInputVal = inputObj.lastInputVal;
	var len = inputObj.vals.length
	var workingVal = inputObj.vals[len - 1];
	return lastInputVal.times(workingVal);
}

function divideNums(inputObj, reverseOrder) {
	var lastInputVal = inputObj.lastInputVal;
	var len = inputObj.vals.length
	var workingVal = inputObj.vals[len - 1];
	return !reverseOrder ? workingVal.dividedBy(lastInputVal) : lastInputVal.dividedBy(workingVal);
}

// -----------------Global variables------------------------
var currentNumStr = "";
var currentInput = inputConstructor();
var recursive = false;
var reverseOrder = false;

// -----------------User input------------------------
function useButtonInput() {
	if(!dispFocus) {
		val = getButtonVal(this);
		useInput(val);
	}
}

function useKeyInput(e) {
	if(!dispFocus) {
		var key = e.key;
		if(key === "Enter") {
			key = "="; 
		} else if (key === "*") {
			key = "X";
		}
		useInput(key);
	}
}

// -----------------Operations management------------------------
function useInput(input) {
	if(input.match(/(\d|\.)/)) {
		currentNumStr = currentNumStringBuilder(input, currentNumStr);
		updateDisplay(currentNumStr);
	} else if(input.match(/(X|\/|-|\+)/)) {
		handleBinaryOperation(input);
	} else if(input.match(/=/)) {
		if(currentNumStr.length > 0) {
			if(recursive) {
				addValToInput(currentNumStr, currentInput, false);
			} else if(currentInput.opps.length > 0) {
				addValToInput(currentNumStr, currentInput, true);
				recursive = true;
			} 
			currentNumStr = "";
		}
		updateDisplay(callBinaryOp(currentInput).toString());
	}
}

function handleBinaryOperation(input) {
	if(currentNumStr.length > 0) {
		if(recursive) {
			addValToInput(currentNumStr, currentInput, false);
			updateDisplay(callBinaryOp(currentInput).toString());
		} else if (currentInput.opps.length > 0) {
			addValToInput(currentNumStr, currentInput, true);
			updateDisplay(callBinaryOp(currentInput).toString());
			recursive = true;
		} else {
			addValToInput(currentNumStr, currentInput, true);				
		}
		currentNumStr = "";
	}
	addOpToInput(input, currentInput);
}

function callBinaryOp(inputObj, reverseOrder) {
	var oppFunc = selectOperation(inputObj);
	var result = binOp(inputObj, oppFunc, reverseOrder);
	return result;
}

function binOp(inputObj, cb, reverseOrder) {
	var result = cb(inputObj, reverseOrder);
	inputObj.vals[inputObj.vals.length - 1] = result;
	return result;
}

function selectOperation(inputObj) {
	var mostRecent = inputObj.opps[inputObj.opps.length - 1]
	switch(mostRecent) {
		case '+': return addNums;
		case '-': return subtractNums;
		case 'X': return multiplyNums;
		case '/': return divideNums;
		default: return "Opperator value not found";
	}
}

// -----------------Output display------------------------
function updateDisplay(val) {
	disp.value = val;
}

function currentNumStringBuilder(nextInput, currentString) {
	var current = currentString || "";
	return nextInput === "." && current.length === 0 ? "0." : current += nextInput;
}

// -----------------Event listeners------------------------
var buttons = document.querySelectorAll(".calc-btn");
function getButtonVal(btn) {
	return btn.dataset.button;
}

var disp = document.querySelector('.display');
var dispFocus = false;
disp.addEventListener("focus", function() { dispFocus = true; });
disp.addEventListener("blur", function() { dispFocus = false; });
disp.addEventListener('input', function(e) {
	var input = this.value;
	if(input.match(/^\d*\.*\d*$/)) {
		if(input[0] === ".") {
			input = "0" + input;
		}
		currentNumStr = input;
	}
	updateDisplay(currentNumStr);
});

document.addEventListener('keyup', useKeyInput);
buttons.forEach(function(btn){
	btn.addEventListener('click', useButtonInput)
});













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