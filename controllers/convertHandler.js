function ConvertHandler() {

  this.getNum = function(input) {
    let numString = input.split(/[a-zA-Z]/, 1)[0];
    console.log("NUM STRING:", numString);
    if (numString.match(/\/\//)) {
      return null;
    };
    if (numString) {
      if (numString.includes("/")) {
        const [numerator, denominator] = numString.split("/").map(Number);
        return Number((numerator / denominator).toFixed(5));
      } else {
        return Number(numString);
      }
    } else {
      return 1;
    }
  };

  this.getUnit = function(input) {
    let unitMatch = input.match(/[a-zA-Z]+$/);
    console.log(unitMatch[0]);
    if (unitMatch[0] === "L" || unitMatch[0] === "l") {
      return unitMatch[0].toUpperCase();
    } else if (unitMatch[0].toLowerCase() === "gal" || unitMatch[0].toLowerCase() === "lbs" || unitMatch[0].toLowerCase() === "kg" || unitMatch[0].toLowerCase() === "mi" || unitMatch[0].toLowerCase() === "km") {
      return unitMatch[0].toLowerCase();
    } else  {
      return null;
    };
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
    if (result === undefined) {
      return 0;
    } else  {
    return result;
  }};

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
