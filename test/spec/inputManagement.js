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
	});

	describe('When updating an input objects values', function() {
		var inputOne = inputConstructor();
		describe('"addValToInput function', function() {
			it('should add a BigNumber object to an input objects "vals" property', function() {
				addValToInput(55, inputOne);
				expect(inputOne.vals.length).toEqual(1);
				expect(inputOne.vals[0]).toEqual(jasmine.any(BigNumber));
				expect(inputOne.vals[0].c[0]).toEqual(55);

				addValToInput("55", inputOne);
				expect(inputOne.vals.length).toEqual(2);
				expect(inputOne.vals[1]).toEqual(jasmine.any(BigNumber));
				expect(inputOne.vals[1].c[0]).toEqual(55);
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
				// var remOpOne = ;
				expect(removeOpFromInput(0, inputOne)).toEqual("+");
				expect(inputOne.opps.length).toEqual(1);
			})
		})
	});


})();