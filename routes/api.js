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
    const initUnit = convertHandler.getUnit(input);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit).toFixed(5);
    const returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    if (!initNum) {
      return res.json({error: "invalid number"})
    } else if (!returnUnit) {
      return res.json({error: "invalid unit"})
    } else if (!initNum && !returnUnit) {
      return res.json({error: "invalid number and unit"})
    } else  {
      res.json({initNum, initUnit, returnNum, returnUnit,
        string: returnString
      });
      console.log("RESPONSE IF VALID REQUEST:", returnString)
    }
  })

};
