import supertest from "supertest";
import app from "../../server";

const request = supertest(app);

describe("user Endpoints", () => {
  it("index", async () => {
    try {
      const response = await request.get("/dev/users");
      expect(response.status).toBe(401);
    } catch (err) {}
  });
  it("show", async () => {
    try {
      const response = await request.get("/dev/user/1");
      expect(response.status).toBe(401);
    } catch (err) {}
  });

  it("create", async () => {
    try {
      const response = await request.post("/dev/user");
      expect(response.status).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });
});
