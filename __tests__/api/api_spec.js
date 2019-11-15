const frisby = require("frisby");

it("should be a teapot", function() {
  return frisby.get("http://httpbin.org/status/418").expect("status", 418);
});

// //get products list req
// it("should get all products", function() {
//   return frisby.get("localhost:3000/products").expect("json");
// });

// it("GET should return a status of 200 OK", function(done) {
//   frisby
//     .get("localhost:3000/products")
//     .inspectJSON()
//     .done(done);
// });
