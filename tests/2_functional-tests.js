const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test("Convert a valid input such as 10L: GET request to /api/convert", (done) => {
        chai.request(server)
            .get("/api/convert")
            .query({input: "10L"})
            .end((err, res) => {  // Callback when the response is received
                assert.equal(res.status, 200);  // Check if status is 200 (OK)
                assert.isObject(res.body);  // Check if the response body is an object
                assert.property(res.body, 'initNum');  // Ensure the response contains initNum
                assert.property(res.body, 'initUnit');  // Ensure the response contains initUnit
                assert.property(res.body, 'returnNum');  // Ensure the response contains returnNum
                assert.property(res.body, 'returnUnit');  // Ensure the response contains returnUnit
                assert.property(res.body, 'string');  // Ensure the response contains string
                done();  // Notify Mocha that the test is done
            });
    });
    test("Convert an invalid input such as 32g: GET request to /api/convert", (done) => {
        chai.request(server)
            .get("/api/convert")
            .query({input: "32g"})
            .end((err, res) => {               
                assert.isObject(res.body);  // Ensure the response is an object
                assert.property(res.body, 'error');  // Ensure the 'error' property exists
                assert.equal(res.body.error, 'invalid unit');
                done();
            })
    });
    test("Convert an invalid number such as 3//4kg: GET request to /api/convert", (done) => {
        chai.request(server)
            .get("/api/convert")
            .query({input: "3//4kg"})
            .end((err, res) => {               
                assert.isObject(res.body);  // Ensure the response is an object
                assert.property(res.body, 'error');  // Ensure the 'error' property exists
                assert.equal(res.body.error, 'invalid number');
                done();
            })
    });
    test("Convert an invalid number AND unit such as 3//4kilomegagram: GET request to /api/convert", (done) => {
        chai.request(server)
            .get("/api/convert")
            .query({input: "3//4kilomegagram"})
            .end((err, res) => {               
                assert.isObject(res.body);  // Ensure the response is an object
                assert.property(res.body, 'error');  // Ensure the 'error' property exists
                assert.equal(res.body.error, 'invalid number and unit');
                done();
            })
    });
    test("Convert with no number such as kg: GET request to /api/convert", (done) => {
        chai.request(server)
            .get("/api/convert")
            .query({input: "kg"})
            .end((err, res) => {               
                assert.equal(res.status, 200);  // Check if status is 200 (OK)
                assert.isObject(res.body);  // Check if the response body is an object
                assert.property(res.body, 'initNum');  // Ensure the response contains initNum
                assert.property(res.body, 'initUnit');  // Ensure the response contains initUnit
                assert.property(res.body, 'returnNum');  // Ensure the response contains returnNum
                assert.property(res.body, 'returnUnit');  // Ensure the response contains returnUnit
                assert.property(res.body, 'string');  // Ensure the response contains string
                done();  // Notify Mocha that the test is done
            })
    });
});
