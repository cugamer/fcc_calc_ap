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
		});
	});
})();