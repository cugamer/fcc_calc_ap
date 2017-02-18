(function () {
	'use strict';
	var inputOne = inputConstructor();
	addValToInput("55", inputOne);
	addValToInput("55", inputOne);
	describe('"binOp" function', function() {
		it('should run addition on two most recent values when passed "addNums" function', function() {
			var addOutput = binOp(inputOne, addNums);
			expect(addOutput).toEqual(jasmine.any(BigNumber));
			expect(addOutput.c[0]).toEqual(110);
			expect(addOutput.toString()).toEqual("110");
			expect(inputOne.vals[0]).toEqual(jasmine.any(BigNumber));
			expect(inputOne.vals[0].c[0]).toEqual(110);
			expect(inputOne.vals[0].toString()).toEqual("110");
			expect(inputOne.vals.length).toEqual(1);
		});
	});

	describe('"selectOperation" function', function() {
		it('should return the function for the most recently added opperation' , function() {
			var inputTwo = inputConstructor();
			addValToInput("55", inputOne);
			addValToInput("55", inputOne);
			addOpToInput('/', inputTwo);
			var divOpFunc = selectOperation(inputTwo);
			expect(divOpFunc).toEqual(jasmine.any(Function));
			expect(divOpFunc).toEqual(divideNums);
		});
	});

	describe('"callOp" function', function() {
		var inputThree = inputConstructor();
		addValToInput("55", inputThree);
		addValToInput("55", inputThree);
		addOpToInput('X', inputThree);
		var processed = callOp(inputThree);
		it('should return the correct result for a recent operation', function() {
			expect(processed).toEqual(jasmine.any(BigNumber));
			expect(processed.c[0]).toEqual(3025);
		});
	});
})();