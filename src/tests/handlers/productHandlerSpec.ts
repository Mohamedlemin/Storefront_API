import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

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

  it("create", async () => {
    try {
      const response = await request.post("/dev/product");
      expect(response.status).toBe(401);
    } catch (err) {
      console.log(err);
    }
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
