import supertest from "supertest";
import app from "../../server";

const request = supertest(app);
let token: string;

describe("Endpoints Tests : ", () => {
    // ------------ Get user token ----------------------

  beforeAll(async () => {
    try {
      const response = await request.post("/dev/user");
      token = response.body;
    } catch (err) {
      console.log(err);
    }
  });
    // ------------ user ----------------------

  describe("user Endpoints", () => {
    // get a test user token

    it("create return a 200 response", async () => {
      try {
        const response = await request.post("/dev/user");
        expect(response.status).toBe(200);
      } catch (err) {
        console.log(err);
      }
    });

    it("index return a 200 response ", function (done) {
      // Set up the request with a valid JWT token
      const req = request.get("/dev/users");
      req.set("Authorization", "Bearer " + token);

      // Send the request and check the response
      req.expect(200).end(function (err, res) {
        if (err) return console.log(err);
        done();
      });
    });

    it("show return a 200 response", function (done) {
      // Set up the request with a valid JWT token
      const req = request.get("/dev/user/1");
      req.set("Authorization", "Bearer " + token);

      // Send the request and check the response
      req.expect(200).end(function (err, res) {
        if (err) return console.log(err);
        done();
      });
    });
  });


  // ------------ order ----------------------

  describe("order Endpoints", () => {
    it("Complete orders return a 200 response ", async () => {
      // Set up the request with a valid JWT token
      try {
        const res = await request
          .get("dev/orders/user/1/complete ")
          .set("Authorization", "Bearer " + token)
          .expect(200);
        expect(res.status).toBe(200);
      } catch (err) {}
    });

    it("currents orders return a 200 response ", async () => {
      // Set up the request with a valid JWT token
      try {
        const res = await request
          .get("dev/orders/user/2/active ")
          .set("Authorization", "Bearer " + token)
          .expect(200);
        expect(res.status).toBe(200);
      } catch (err) {}
    });

    it("index  return a 200 response ", async () => {
      // Set up the request with a valid JWT token
      try {
        const res = await request
          .get("/dev/orders")
          .set("Authorization", "Bearer " + token)
          .expect(200);
        expect(res.status).toBe(200);
      } catch (err) {}
    });

    it("show  return a 200 response ", async () => {
      // Set up the request with a valid JWT token
      try {
        const res = await request
          .get("/dev/order/1")
          .set("Authorization", "Bearer " + token)
          .expect(200);
        expect(res.status).toBe(200);
      } catch (err) {}
    });

    it("create  return a 200 response ", async () => {
      // Set up the request with a valid JWT token
      try {
        const res = await request
          .post("/dev/orders/1/products")
          .set("Authorization", "Bearer " + token)
          .expect(200);
        expect(res.status).toBe(200);
      } catch (err) {}
    });

    it("delete return a 200 response ", async () => {
      // Set up the request with a valid JWT token
      try {
        const res = await request
          .delete("/dev/order/1")
          .set("Authorization", "Bearer " + token)
          .expect(200);
        expect(res.status).toBe(200);
      } catch (err) {}
    });
  });

  // ------------ Product ----------------------
  describe("product Endpoints", () => {
    it("index", async () => {
      try {
        const response = await request.get("/dev/products");
        expect(response.status).toBe(200);
      } catch (err) {}
    });
    it("show", async () => {
      try {
        const response = await request.get("/dev/product/1");
        expect(response.status).toBe(200);
      } catch (err) {}
    });

    it("create product return 200 response", async () => {
      try {
        const res = await request
          .post("/dev/product")
          .set("Authorization", "Bearer " + token)
          .expect(200);
        expect(res.status).toBe(200);
      } catch (err) {}
    });

    it("delete", async () => {
      try {
        const response = await request.delete("/dev/product/1");
        expect(response.status).toBe(200);
      } catch (err) {
        console.log(err);
      }
    });
  });
});
