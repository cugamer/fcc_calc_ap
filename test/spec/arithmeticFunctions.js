(function () {
  'use strict';
  var bigNumOne = new BigNumber('123456789');

  describe('"convertToBignum" function', function () {
  	it('should return a BigNumber object', function () {
  	  expect(convertToBignum("12345")).toEqual(jasmine.any(BigNumber));
  	  expect(convertToBignum(bigNumOne)).toEqual(jasmine.any(BigNumber));
  	  expect(true).toBe(true);
  	});
  });

  describe('"addNums" function', function() {
  	it('should return a BigNumber object', function() {
  		expect(addNums({vals: ["12345", "12345"]})).toEqual(jasmine.any(BigNumber));
  	});

  	it('should return a BigNumber object with the correct value', function() {
  		expect(addNums({vals: ["12345", "12345"]}).c[0]).toEqual(24690);
  		expect(addNums({vals: ["12345", "12345"]}).toString()).toEqual("24690");
  	});
  });

  describe('"subtractNums" function', function() {
  	it('should return a BigNumber object', function() {
  		expect(subtractNums({vals: ["12345", "12345"]})).toEqual(jasmine.any(BigNumber));
  	});

  	it('should return a BigNumber object with the correct value', function() {
  		expect(subtractNums({vals: ["12345", "1"]}).c[0]).toEqual(12344);
  		expect(subtractNums({vals: ["12345", "1"]}).toString()).toEqual("12344");
  	});
  });

  describe('"multiplyNums" function', function() {
  	it('should return a BigNumber object', function() {
  		expect(multiplyNums({vals: ["12345", "12345"]})).toEqual(jasmine.any(BigNumber));
  	});

  	it('should return a BigNumber object with the correct value', function() {
  		expect(multiplyNums({vals: ["12345", "12345"]}).c[0]).toEqual(152399025);
  		expect(multiplyNums({vals: ["12345", "12345"]}).toString()).toEqual("152399025");
  		expect(multiplyNums({vals: ["152399025152399025", "152399025152399025"]}).c.length).toEqual(3);
  		expect(multiplyNums({vals: ["152399025152399025", "152399025152399025"]}).c[0]).toEqual(2322546);
  		expect(multiplyNums({vals: ["152399025152399025", "152399025152399025"]}).c[1]).toEqual(28674015506651);
  		expect(multiplyNums({vals: ["152399025152399025", "152399025152399025"]}).c[2]).toEqual(26712820950625);
  		expect(multiplyNums({vals: ["152399025152399025", "152399025152399025"]}).toString()).toEqual("2.3225462867401550665126712820950625e+34");
  	});
  });

  describe('"divideNums" function', function() {
  	it('should return a BigNumber object', function() {
  		expect(divideNums({vals: ["12345", "12345"]})).toEqual(jasmine.any(BigNumber));
  	});

  	it('should return a BigNumber object with the correct value', function() {
  		expect(divideNums({vals: ["12345", "12345"]}).c[0]).toEqual(1);
  		expect(divideNums({vals: ["12345", "12345"]}).toString()).toEqual("1");
  		expect(divideNums({vals: ["444444444444444444", "2"]}).c.length).toEqual(2);
  		expect(divideNums({vals: ["444444444444444444", "2"]}).c[0]).toEqual(2222);
  		expect(divideNums({vals: ["444444444444444444", "2"]}).c[1]).toEqual(22222222222222);
  		expect(divideNums({vals: ["444444444444444444", "2"]}).toString()).toEqual("222222222222222222");
  	});

  	it('should return proper undefined values for division by zero', function() {
  		expect(divideNums({vals: ["12345", "0"]}).c).toBeNull();
  		expect(divideNums({vals: ["12345", "0"]}).toString()).toEqual("Infinity");
  	});
  });
})();
