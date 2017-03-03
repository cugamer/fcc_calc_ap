(function () {
	'use strict';

	describe('"inputConstructor" function', function() {
		it('should make a new input object', function() {
			expect(inputConstructor()).toEqual(jasmine.any(Object));
		});

		it('objects should have correct keys', function() {
			expect(inputConstructor().vals).toEqual(jasmine.any(Array));
			expect(inputConstructor().opps).toEqual(jasmine.any(Array));
		});

		it('objects should have a "recursive" property set to false at creation', function() {
			expect(inputConstructor().recursive).toEqual(false);
		});

		it('objects should have a "reverseOrder" property set to false at creation', function() {
			expect(inputConstructor().reverseOrder).toEqual(false);
		});
	});

	describe('When updating an input objects values', function() {
		var inputOne = inputConstructor();
		describe('"addValToInput function', function() {
			it('should add a BigNumber object to an input objects "lastInputVal" property and update the "vals" property when updateVals is true', function() {
				addValToInput(55, inputOne, true);
				expect(inputOne.vals.length).toEqual(1);
				expect(inputOne.lastInputVal).toEqual(jasmine.any(BigNumber));
				expect(inputOne.lastInputVal.c[0]).toEqual(55);

				addValToInput(66, inputOne, true);
				expect(inputOne.vals.length).toEqual(2);
				expect(inputOne.vals[0]).toEqual(jasmine.any(BigNumber));
				expect(inputOne.vals[0].c[0]).toEqual(0);
				expect(inputOne.lastInputVal).toEqual(jasmine.any(BigNumber));
				expect(inputOne.lastInputVal.c[0]).toEqual(66);
			});

			var inputTwo = inputConstructor();
			it('should add a BigNumber object to an input objects "lastInputVal" property but not  update the "vals" property when updateVals is false', function() {
				addValToInput(55, inputTwo, true);
				addValToInput(66, inputTwo, true);
				expect(inputTwo.vals.length).toEqual(2);
				expect(inputTwo.vals[1].c[0]).toEqual(55);
				expect(inputTwo.lastInputVal).toEqual(jasmine.any(BigNumber));
				expect(inputTwo.lastInputVal.c[0]).toEqual(66);

				addValToInput(77, inputOne, false);
				expect(inputOne.vals.length).toEqual(2);
				expect(inputOne.vals[0]).toEqual(jasmine.any(BigNumber));
				expect(inputOne.vals[1].c[0]).toEqual(55);
				expect(inputOne.lastInputVal).toEqual(jasmine.any(BigNumber));
				expect(inputOne.lastInputVal.c[0]).toEqual(77);
			});
		});


		describe('"remValFromInput" function', function() {
			it('should remove items from the input objects "val" property', function() {
				var removedOne = remValFromInput(1, inputOne);
				expect(removedOne).toEqual(jasmine.any(BigNumber));
				expect(removedOne.c[0]).toEqual(55);
				expect(inputOne.vals.length).toEqual(1);
			});
		});

		describe('"addOpToInput"', function() {
			it('should add a string with the required opperation to an input objects "opps" property', function() {
				addOpToInput("+", inputOne);
				expect(inputOne.opps[0]).toEqual("+");
				expect(inputOne.opps.length).toEqual(1);
				addOpToInput("/", inputOne);
				expect(inputOne.opps[1]).toEqual("/");
				expect(inputOne.opps.length).toEqual(2);
			});
		});

		describe('"removeOpFromInput"', function() {
			it('should remove the desired string from the input objects "opps" property and return that value', function() {
				expect(removeOpFromInput(0, inputOne)).toEqual("+");
				expect(inputOne.opps.length).toEqual(1);
			});
		});
	});

	describe('"currentNumStringBuilder"', function() {
		it('should add input value to new string when given no working string', function() {
			expect(currentNumStringBuilder('1')).toEqual('1');
		});

		it('should add input value to working string when given one', function() {
			expect(currentNumStringBuilder('1', '234')).toEqual('2341');
		});

		it('should add a zero prior to the decimal point when the decimal is the first input', function() {
			var decimal = currentNumStringBuilder('.', '');
			expect(decimal).toEqual('0.');
			expect(currentNumStringBuilder('5', decimal)).toEqual('0.5');
		});
	});

	describe('"checkIfReady" function', function() {
		var inputTwo = inputConstructor();
		it('should return false for binary when input object has no values or opperations', function() {
			expect(checkIfReady(inputTwo)).toEqual(false);
		});
		var inputThree = inputConstructor([111]);
		it('should return false for binary when input object has one value and no opperations', function() {
			expect(checkIfReady(inputThree)).toEqual(false);
		});
		var inputFour = inputConstructor([111, 222]);
		it('should return false for binary when input object has no opperations', function() {
			expect(checkIfReady(inputFour)).toEqual(false);
		});
		var inputFive = inputConstructor([111, 222], ["X"]);
		it('should return true for binary when input object has values and opperations', function() {
			expect(checkIfReady(inputFive)).toEqual(true);
		});
	});

	describe('"archiveInputObj" function', function() {
		it('should take an existing input object and add it to an archive array', function() {
			var inputThree = inputConstructor();
			var inputHistory = [];
			expect(inputHistory.length).toEqual(0);
			var updatedHistory = archiveInputArr(inputThree, inputHistory);
			expect(updatedHistory.length).toEqual(1);
			expect(updatedHistory[0]).toEqual(jasmine.any(Object));
		});
	});

	describe('"refreshCurrentInput" function', function() {
		it('should take an existing input object and add it to an archive array', function() {
			var currentInput = inputConstructor();
			addValToInput('15', currentInput, true);
			addOpToInput('+', currentInput);
			expect(currentInput.vals.length).toEqual(1);
			expect(currentInput.opps.length).toEqual(1);
			currentInput = refreshCurrentInput();
			expect(currentInput.vals.length).toEqual(0);
			expect(currentInput.opps.length).toEqual(0);
		});
	});

	describe('"addDecimal" function', function() {
		it('should return zero plus decimal when given an empty string', function() {
			expect(addDecimal('')).toEqual("0.");
		});

		it('should add a decimal point to the end of an input string that doesn\'t already have one', function() {
			expect(addDecimal('11')).toEqual('11.');
			expect(addDecimal('0')).toEqual('0.');
		});

		it('should not add a decimal point to an input string that alredy has one', function() {
			expect(addDecimal('1.1')).toEqual('1.1');
		});
	});
})();