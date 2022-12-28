import { orders, ordersStore } from "../../models/orders";
import { extra_queries } from "../../database/services/extra_queries";

const store = new ordersStore();
const extra = new extra_queries();

describe("Order Model + Extra queries", () => {
  it("should have an current order method", () => {
    expect(extra.current_order).toBeDefined();
  });
  
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.addProduct).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create should add a order", async () => {
    const result = await store.create({
      fk_user_id: 1,
      status: "active",
    });
    expect(result.status).toEqual("active");
  });

  it("index should return a list of order", async () => {
    const result = await store.index();
    expect(result.length).toBeLessThan(10);
  });
});
