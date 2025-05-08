const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

suite('Unit Tests', () => {
  test('Whole number input', () => assert.equal(convertHandler.getNum('32L'), 32));
  test('Decimal input', () => assert.equal(convertHandler.getNum('32.5L'), 32.5));
  test('Fractional input', () => assert.equal(convertHandler.getNum('1/2L'), 0.5));
  test('Fractional with decimal', () => assert.equal(convertHandler.getNum('5.4/3L'), 1.8));
  test('Double-fraction error', () => assert.equal(convertHandler.getNum('3/2/3L'), 'invalid number'));
  test('Default to 1 if no number', () => assert.equal(convertHandler.getNum('kg'), 1));

  test('Each valid input unit', () => {
    const input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    input.forEach(unit => assert.equal(convertHandler.getUnit(`3${unit}`), unit === 'l' ? 'L' : unit));
  });

  test('Invalid input unit', () => assert.equal(convertHandler.getUnit('32g'), 'invalid unit'));

  test('Return unit for each valid unit', () => {
    const units = {
      gal: 'L', L: 'gal', mi: 'km',
      km: 'mi', lbs: 'kg', kg: 'lbs'
    };
    for (let unit in units) {
      assert.equal(convertHandler.getReturnUnit(unit), units[unit]);
    }
  });

  test('Spelled-out unit', () => {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
  });

  test('Convert gal to L', () => assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1));
  test('Convert L to gal', () => assert.approximately(convertHandler.convert(3.78541, 'L'), 1, 0.1));
  test('Convert mi to km', () => assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1));
  test('Convert km to mi', () => assert.approximately(convertHandler.convert(1.60934, 'km'), 1, 0.1));
  test('Convert lbs to kg', () => assert.approximately(convertHandler.convert(1, 'lbs'), 0.453592, 0.1));
  test('Convert kg to lbs', () => assert.approximately(convertHandler.convert(0.453592, 'kg'), 1, 0.1));
});
