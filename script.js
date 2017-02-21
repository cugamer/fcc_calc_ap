function inputConstructor(vals, opps) {
	var input = {
		vals: vals || [],
		opps: opps || []
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
	// console.log(first, second)
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
	// var binOpps = ['+', '-', 'X', '/'];
	var result = binOp(inputObj, oppFunc);
	return result;
}

// -----------------Capture user input------------------------


currentNumStr = "";
currentInput = inputConstructor();

function currentNumStringBuilder(nextInput, currentString) {
	var current = currentString || "";
	if(nextInput === "." && current.length === 0) {
		current += "0.1";
	} else {
		current += nextInput;
	}
	return current;
}

function updateInputVals(inputObj) {
	inputObj.vals.push(convertToBignum(currentNumStr));
	currentNumStr = "";
}

function useBtnInput() {
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

function useInput(input) {
	if(input.match(/(\d|\.)/)) {
		currentNumStr = currentNumStringBuilder(input, currentNumStr);
		updateDisplay(currentNumStr);
	} else if (input.match(/(X|\/|-|\+)/)) {
		updateInputVals(currentInput);
		currentInput.opps.push(input);
	} else if (input.match(/=/)) {
		updateInputVals(currentInput);
		callOp(currentInput);
		updateDisplay(currentInput.vals[currentInput.vals.length - 1].toString());
	}
}

function updateDisplay(val) {
	disp.value = val;
}

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
	if(input.match(/\d*\.*\d+/)) {
		if(input[0] === ".") {
			input = "0" + input;
		}
		currentNumStr = input;
	}
});

document.addEventListener('keyup', useKeyInput);
buttons.forEach(function(btn){
	btn.addEventListener('click', useBtnInput)
});