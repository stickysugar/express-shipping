"use strict";

const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");

const axiosMock = new AxiosMockAdapter(axios);

const {
  shipProduct,
  SHIPIT_API_KEY,
  SHIPIT_SHIP_URL,
} = require("./shipItApi");

const shipRes = {
  "receipt":
  {
    "name": "boxes",
    "addr": "1222 street",
    "zip": "1234",
    "shipId": 6019
  }
};

const shipReq = {
  productId: 1000,
  name: "boxes",
  addr: "1222 street",
  zip: "1234",
};


test("ship mock product", async function () {
  axiosMock.onPost(`${SHIPIT_SHIP_URL}`)
           .reply(200, shipRes);

  const shipId = await shipProduct(shipReq);
  expect(shipId).toEqual(6019);
});

// test("shipProduct", async function () {
//   const shipId = await shipProduct({
//     productId: 1000,
//     name: "Test Tester",
//     addr: "100 Test St",
//     zip: "12345-6789",
//   });

//   expect(shipId).toEqual(expect.any(Number));
// });
