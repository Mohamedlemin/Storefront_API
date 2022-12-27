import { productStore } from "../../models/product";

const store = new productStore();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create should add a product", async () => {
    const result = await store.create({
      name: "MacBook M1",
      price: 2500,
      category: "Tech",
    });
    expect(result.name).toEqual("MacBook M1");
  });

  it("index should return a list of product", async () => {
    const result = await store.index();
    expect(result.length).toBeLessThan(15);
  });
});
