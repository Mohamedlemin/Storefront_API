import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("order Endpoints", () => {
  it("Complete orders", async () => {
    try {
      const response = await request.get("/dev/orders/active/user/:id");
      expect(response.status).toBe(401);
    } catch (err) {}
  });

  it("currents orders", async () => {
    try {
      const response = await request.get("/dev/orders/complete/user/:id");
      expect(response.status).toBe(401);
    } catch (err) {}
  });
  it("index", async () => {
    try {
      const response = await request.get("/dev/orders");
      expect(response.status).toBe(200);
    } catch (err) {}
  });
  it("show", async () => {
    try {
      const response = await request.get("/dev/order/1");
      expect(response.status).toBe(401);
    } catch (err) {}
  });

  it("create", async () => {
    try {
      const response = await request.post("/dev/order");
      expect(response.status).toBe(401);
    } catch (err) {
      console.log(err);
    }
  });

  it("delete", async () => {
    try {
      const response = await request.delete("/dev/order/1");
      expect(response.status).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });
});
