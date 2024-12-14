const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("convertHandler should correctly read a whole number input", () => {
        const input = "5kg";
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 5, "The number should be read as 5")
    });
    test("convertHandler should correctly read a decimal number input", () => {
        const input = "5.2kg";
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 5.2, "The number should be read as 5.2")
    });
    test("convertHandler should correctly read a fractional input", () => {
        const input = "1/2kg";
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 0.5, "The number should be read as 0.5")
    });
    test("convertHandler should correctly read a fractional input with a decimal", () => {
        const input = "1.5/3kg";
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 0.5, "The number should be read as 0.5")
    });
    test("convertHandler should correctly return an error on a double fraction", () => {
        const input = "1.5//3kg";
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, null, "The number should be read as null")
    });
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", () => {
        const input = "kg";
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 1, "The number should be read as 1")
    });
    test("convertHandler should correctly read each valid input unit", () => {
        const input = "1kg";
        const result = convertHandler.getUnit(input);
        assert.strictEqual(result, "kg", "The unit should be read as kg")
    });
    test("convertHandler should correctly return an error for an invalid input unit", () => {
        const input = "1kug";
        const result = convertHandler.getUnit(input);
        assert.strictEqual(result, null, "The unit should be read as null")
    });
    test("convertHandler should return the correct return unit for each valid input unit", () => {
        const input = "kg";
        const result = convertHandler.getReturnUnit(input);
        assert.strictEqual(result, "lbs", "The unit should be read as lbs")
    });
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit", () => {
        const input = "lbs";
        const result = convertHandler.spellOutUnit(input);
        assert.strictEqual(result, "pounds", "The unit should be read as pounds")
    });
    test("convertHandler should correctly convert gal to L", () => {
        const input = "gal";
        const result = convertHandler.getReturnUnit(input);
        assert.strictEqual(result, "L", "The unit should be read as L")
    });
    test("convertHandler should correctly convert L to gal", () => {
        const input = "L";
        const result = convertHandler.getReturnUnit(input);
        assert.strictEqual(result, "gal", "The unit should be read as gal")
    });
    test("convertHandler should correctly convert mi to km", () => {
        const input = "mi";
        const result = convertHandler.getReturnUnit(input);
        assert.strictEqual(result, "km", "The unit should be read as km")
    });
    test("convertHandler should correctly convert km to mi", () => {
        const input = "km";
        const result = convertHandler.getReturnUnit(input);
        assert.strictEqual(result, "mi", "The unit should be read as km")
    });
    test("convertHandler lbs to kg", () => {
        const input = "lbs";
        const result = convertHandler.getReturnUnit(input);
        assert.strictEqual(result, "kg", "The unit should be read as kg")
    });
    test("convertHandler kg to lbs", () => {
        const input = "kg";
        const result = convertHandler.getReturnUnit(input);
        assert.strictEqual(result, "lbs", "The unit should be read as lbs")
    });
});