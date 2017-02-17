(function () {
	'use strict';

	describe('"inputConstructor" function', function() {
		it('should make a new input object', function() {
			expect(inputConstructor()).toEqual(jasmine.any(Object));
		});

		it('objects should have correct keys', function() {
			expect(inputConstructor().val).toEqual(jasmine.any(Array));
			expect(inputConstructor().opperations).toEqual(jasmine.any(Array));
		});
	});
})();