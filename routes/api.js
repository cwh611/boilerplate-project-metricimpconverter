'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  app.get("/api/convert", (req, res) => {
    const input = req.query.input;
    console.log("REQ URL:", req.url)
    console.log("input:", input);
    const initNum = convertHandler.getNum(input);
    console.log("INIT NUM:", initNum);
    const initUnit = convertHandler.getUnit(input);
    console.log(initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = Number(convertHandler.convert(initNum, initUnit).toFixed(5));
    console.log("RETURN NUM:", returnNum);
    const returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    if (!initNum && !initUnit) {
      console.log("invalid number and unit");
      return res.json({error: "invalid number and unit"});
    } else if (!initNum) {
      console.log("invalid number");
      return res.json({error: "invalid number"});
    } else if (!initUnit) {
      console.log("invalid unit");
      return res.json({error: "invalid unit"});
    } else  {
      res.json({initNum, initUnit, returnNum, returnUnit,
        string: returnString
      });
      console.log("RESPONSE IF VALID REQUEST:", returnString);
    }
  })

};
