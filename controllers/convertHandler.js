function ConvertHandler() {
  const unitsMap = {
    gal: { returnUnit: "L", convert: x => x * 3.78541 },
    L: { returnUnit: "gal", convert: x => x / 3.78541 },
    mi: { returnUnit: "km", convert: x => x * 1.60934 },
    km: { returnUnit: "mi", convert: x => x / 1.60934 },
    lbs: { returnUnit: "kg", convert: x => x * 0.453592 },
    kg: { returnUnit: "lbs", convert: x => x / 0.453592 }
  };

  this.getNum = function(input) {
    const match = input.match(/^([.\d\/]+)?[a-zA-Z]+$/);
    if (!match) return "invalid number";
    const result = match[1];
    if (!result) return 1;

    if ((result.match(/\//g) || []).length > 1) return "invalid number";

    try {
      return eval(result);
    } catch {
      return "invalid number";
    }
  };

  this.getUnit = function(input) {
    const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
    const inputUnit = input.match(/[a-zA-Z]+$/i);
    if (!inputUnit) return 'invalid unit';

    let unit = inputUnit[0].toLowerCase();
    if (unit === 'l') unit = 'L';

    if (!units.includes(unit)) return 'invalid unit';

    return unit;
  };

  this.getReturnUnit = function(initUnit) {
    return unitsMap[initUnit]?.returnUnit;
  };

  this.spellOutUnit = function(unit) {
    const fullNames = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms"
    };
    return fullNames[unit];
  };

  this.convert = function(initNum, initUnit) {
    if (!unitsMap[initUnit]) return "invalid unit";
    const convertedVal = parseFloat(unitsMap[initUnit].convert(initNum).toFixed(5));
    return convertedVal;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
