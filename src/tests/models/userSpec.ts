import { userStore } from "../../models/user";

const store = new userStore();

describe("user Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("create should add a user", async () => {
    const result = await store.create({
      firstName: "Hamoudy",
      lastName: "Hamadi",
      password: "Tech",
    });
    expect(result.firstName).toBeUndefined;
  });

  it("index should return a list of user", async () => {
    const result = await store.index();
    expect(result.length).toBeLessThan(10);
  });

  it("show  should return the correct user", async () => {
    const result = await store.show("1");
    expect(result.id).toEqual(1);
  });
});
