"use strict";


const shipItApi = require("../shipItApi");
shipItApi.shipProduct = jest.fn();

const shipmentReq = {
  productId: 1000,
  name: "Test Tester",
  addr: "100 Test St",
  zip: "12345-6789",
};

const request = require("supertest");
const app = require("../app");


describe("POST /", function () {
  test("valid mock shipment", async function () {
    shipItApi.shipProduct.mockReturnValue(1234);

    const resp = await request(app).post("/shipments").send(shipmentReq);

    expect(resp.body).toEqual({ shipped: 1234 });
  });

  // test("valid", async function () {
  //   const resp = await request(app).post("/shipments").send({
  //     productId: 1000,
  //     name: "Test Tester",
  //     addr: "100 Test St",
  //     zip: "12345-6789",
  //   });

  //   expect(resp.body).toEqual({ shipped: expect.any(Number) });
  // });

  test("invalid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1,
      name: 89,
      addr: true,
      zip: false,
    });

    expect(resp.body.error.status).toEqual(400);

    expect(resp.body.error.message).toEqual([
			"instance.productId must be greater than or equal to 1000",
			"instance.name is not of a type(s) string",
			"instance.addr is not of a type(s) string",
			"instance.zip is not of a type(s) string"
		]);
  });
});
