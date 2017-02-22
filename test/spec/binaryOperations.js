(function () {
	'use strict';
	var bigNumZero = new BigNumber('0');
    var bigNumOne = new BigNumber('123456789');
    var bigNumTwo = new BigNumber('55');
    var bigNumThree = new BigNumber('1');
    var bigNumFour = new BigNumber('152399025152399025');
    var bigNumFive = new BigNumber('444444444444444444');
    var bigNumSix = new BigNumber('2');

	var inputOne = inputConstructor([bigNumTwo, bigNumTwo]);
	describe('"binOp" function', function() {
		it('should run addition on two most recent values when passed "addNums" function', function() {
			var addOutput = binOp(inputOne, addNums);
			expect(addOutput).toEqual(jasmine.any(BigNumber));
			expect(addOutput.c[0]).toEqual(110);
			expect(addOutput.toString()).toEqual("110");
			expect(inputOne.vals[1]).toEqual(jasmine.any(BigNumber));
			expect(inputOne.vals[1].c[0]).toEqual(110);
			expect(inputOne.vals[1].toString()).toEqual("110");
			expect(inputOne.vals.length).toEqual(2);
		});
	});

	describe('"selectOperation" function', function() {
		it('should return the function for the most recently added opperation' , function() {
			var inputTwo = inputConstructor([bigNumTwo, bigNumTwo], ["/"]);
			var divOpFunc = selectOperation(inputTwo);
			expect(divOpFunc).toEqual(jasmine.any(Function));
			expect(divOpFunc).toEqual(divideNums);
		});
	});

	describe('"callOp" function', function() {
		var inputThree = inputConstructor([bigNumTwo, bigNumTwo], ["X"]);
		var processed = callOp(inputThree);
		it('should return the correct result for a recent operation', function() {
			expect(processed).toEqual(jasmine.any(BigNumber));
			expect(processed.c[0]).toEqual(3025);
		});
	});
})();