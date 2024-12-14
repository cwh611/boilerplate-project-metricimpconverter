function ConvertHandler() {

  this.getNum = function(input) {
    let numString = input.split(/[a-zA-Z]/, 1)[0];
    return numString ? Number(numString) : 1;
  };

  this.getUnit = function(input) {
    let unitMatch = input.match(/[a-zA-Z]+/);
    if (unitMatch[0] === "L" || unitMatch[0] === "l") {
      return unitMatch[0].toUpperCase();
    } else {
      return unitMatch ? unitMatch[0].toLowerCase() : null;
    }
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      gal: "L",
      L: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi"
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const unitNames = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers"
    };
    return unitNames[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "gal": result = initNum * galToL; break;
      case "L": result = initNum / galToL; break;
      case "lbs": result = initNum * lbsToKg; break;
      case "kg": result = initNum / lbsToKg; break;
      case "mi": result = initNum * miToKm; break;
      case "km": result = initNum / miToKm; break;
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}.`;
  };

}

module.exports = ConvertHandler;
