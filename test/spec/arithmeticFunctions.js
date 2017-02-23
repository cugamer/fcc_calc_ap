(function () {
  'use strict';
  var bigNumZero = new BigNumber('0');
  var bigNumOne = new BigNumber('123456789');
  var bigNumTwo = new BigNumber('12345');
  var bigNumThree = new BigNumber('1');
  var bigNumFour = new BigNumber('152399025152399025');
  var bigNumFive = new BigNumber('444444444444444444');
  var bigNumSix = new BigNumber('2');

  describe('"convertToBignum" function', function () {
  	it('should return a BigNumber object', function () {
  	  expect(convertToBignum("12345")).toEqual(jasmine.any(BigNumber));
  	  expect(convertToBignum(bigNumOne)).toEqual(jasmine.any(BigNumber));
  	  expect(true).toBe(true);
  	});
  });

  describe('"addNums" function', function() {
  	it('should return a BigNumber object', function() {
  		expect(addNums({vals: [bigNumOne], 
        opps: [null], 
        lastInputVal: bigNumOne}))
      .toEqual(jasmine.any(BigNumber));
  	});

  	it('should return a BigNumber object with the correct value', function() {
  		expect(addNums({vals: [bigNumOne], 
        opps: [null], 
        lastInputVal: bigNumOne})
      .c[0]).toEqual(246913578);
  		expect(addNums({vals: [bigNumOne], 
        opps: [null], 
        lastInputVal: bigNumOne})
      .toString()).toEqual("246913578");
  	});
  });

  describe('"subtractNums" function', function() {
  	it('should return a BigNumber object', function() {
  		expect(subtractNums({vals: [bigNumTwo], 
        opps: [null], 
        lastInputVal: bigNumTwo}))
      .toEqual(jasmine.any(BigNumber));
  	});

  	it('should return a BigNumber object with the correct value', function() {
  		expect(subtractNums({vals: [bigNumTwo],
        opps: [null],
        lastInputVal: bigNumThree}).c[0]).toEqual(12344);
  		expect(subtractNums({vals: [bigNumTwo], 
        opps: [null],
        lastInputVal: bigNumThree}).toString()).toEqual("12344");
  	});

    it('when reverse is true should return a BigNumber object with the correct value with order reversed', function() {
      expect(subtractNums({vals: [bigNumTwo], 
        opps:[null],
        lastInputVal: bigNumOne}, true).c[0]).toEqual(123444444);
      expect(subtractNums({vals: [bigNumTwo], 
        opps:[null],
        lastInputVal: bigNumOne}, true).toString()).toEqual("123444444");
    })
  });

  describe('"multiplyNums" function', function() {
  	it('should return a BigNumber object', function() {
  		expect(multiplyNums({vals: [bigNumTwo],
        lastInputVal: bigNumTwo})).toEqual(jasmine.any(BigNumber));
  	});

  	it('should return a BigNumber object with the correct value', function() {
  		expect(multiplyNums({vals: [bigNumTwo], lastInputVal: bigNumTwo}).c[0]).toEqual(152399025);
  		expect(multiplyNums({vals: [bigNumTwo], lastInputVal: bigNumTwo}).toString()).toEqual("152399025");
  		expect(multiplyNums({vals: [bigNumFour], lastInputVal: bigNumFour}).c.length).toEqual(3);
  		expect(multiplyNums({vals: [bigNumFour], lastInputVal: bigNumFour}).c[0]).toEqual(2322546);
  		expect(multiplyNums({vals: [bigNumFour], lastInputVal: bigNumFour}).c[1]).toEqual(28674015506651);
  		expect(multiplyNums({vals: [bigNumFour], lastInputVal: bigNumFour}).c[2]).toEqual(26712820950625);
  		expect(multiplyNums({vals: [bigNumFour], lastInputVal: bigNumFour}).toString()).toEqual("2.3225462867401550665126712820950625e+34");
  	});
  });

  describe('"divideNums" function', function() {
  	it('should return a BigNumber object', function() {
  		expect(divideNums({vals: [bigNumTwo], lastInputVal: bigNumTwo})).toEqual(jasmine.any(BigNumber));
  	});

  	it('should return a BigNumber object with the correct value', function() {
  		expect(divideNums({vals: [bigNumTwo], lastInputVal: bigNumTwo}).c[0]).toEqual(1);
  		expect(divideNums({vals: [bigNumTwo], lastInputVal: bigNumTwo}).toString()).toEqual("1");
  		expect(divideNums({vals: [bigNumFive], lastInputVal: bigNumSix}).c.length).toEqual(2);
  		expect(divideNums({vals: [bigNumFive], lastInputVal: bigNumSix}).c[0]).toEqual(2222);
  		expect(divideNums({vals: [bigNumFive], lastInputVal: bigNumSix}).c[1]).toEqual(22222222222222);
  		expect(divideNums({vals: [bigNumFive], lastInputVal: bigNumSix}).toString()).toEqual("222222222222222222");
  	});

  	it('should return proper undefined values for division by zero', function() {
  		expect(divideNums({vals: [bigNumTwo], lastInputVal: bigNumZero}).c).toBeNull();
  		expect(divideNums({vals: [bigNumTwo], lastInputVal: bigNumZero}).toString()).toEqual("Infinity");
  	});

    it('when reverse is true should return a BigNumber object with the correct value with order reversed', function() {
      expect(divideNums({vals: [bigNumTwo], lastInputVal: bigNumTwo}, true).c[0]).toEqual(1);
      expect(divideNums({vals: [bigNumTwo], lastInputVal: bigNumTwo}, true).toString()).toEqual("1");
      expect(divideNums({vals: [bigNumSix], lastInputVal: bigNumFive}, true).c.length).toEqual(2);
      expect(divideNums({vals: [bigNumSix], lastInputVal: bigNumFive}, true).c[0]).toEqual(2222);
      expect(divideNums({vals: [bigNumSix], lastInputVal: bigNumFive}, true).c[1]).toEqual(22222222222222);
      expect(divideNums({vals: [bigNumSix], lastInputVal: bigNumFive}, true).toString()).toEqual("222222222222222222");
    });
  });
})();
