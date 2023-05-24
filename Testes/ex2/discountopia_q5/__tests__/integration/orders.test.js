const supertest = require("supertest");
const { app } = require("../../src/app");
const {
  generateAuthorizationHeaderForUser,
  eraseDatabase,
  createDatabaseFromSchema,
  disconnectDatabase,
} = require("../helpers");
const ordersRepo = require("../../src/repositories/orders");
const usersRepo = require("../../src/repositories/users");
const productsRepo = require("../../src/repositories/products");
const categoriesRepo = require("../../src/repositories/categories");
const orderItemsRepo = require("../../src/repositories/orderItems");

const request = supertest(app);

beforeEach(async () => {
  await eraseDatabase();
  await createDatabaseFromSchema();
});

afterAll(async () => {
  await eraseDatabase();
  await disconnectDatabase();
});

describe("GET /orders/:order_id/items", () => {
  it("should return status 401 if user token is missing", async () => {
    const response = await request.get("/orders/1/items");

    expect(response.status).toBe(401);
  });

  it("should return status 401 if user token is invalid", async () => {
    const authorization = "Bearer xxxxx";

    const response = await request
      .get("/orders/1/items")
      .set("authorization", authorization);

    expect(response.status).toBe(401);
  });

  it("should return status 400 if order_id is invalid", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .get("/orders/x/items")
      .set("authorization", authorization);

    expect(response.status).toBe(400);
  });

  it("should return status 404 if order does not exist", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .get("/orders/999/items")
      .set("authorization", authorization);

    expect(response.status).toBe(404);
  });

  it("should return status 403 if user is not owner of the order", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const user2 = await usersRepo.createUser(
      "user2",
      "user2@mail.com",
      "password2"
    );
    const order = await ordersRepo.createOrder(user1.id, false);

    const authorization = generateAuthorizationHeaderForUser(user2.id);

    const response = await request
      .get(`/orders/${order.id}/items`)
      .set("authorization", authorization);

    expect(response.status).toBe(403);
  });

  it("should return the order items and status 200 if user is the owner of the order", async () => {
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const category2 = await categoriesRepo.createCategory("category2");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );
    const product2 = await productsRepo.createProduct(
      "product2",
      20,
      category2.id
    );
    const order = await ordersRepo.createOrder(user.id, false);
    const orderItems = [
      await orderItemsRepo.createOrderItem(order.id, product1.id, 2),
      await orderItemsRepo.createOrderItem(order.id, product2.id, 4),
    ];

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
      .get(`/orders/${order.id}/items`)
      .set("authorization", authorization);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(orderItems);
  });
});


describe("PATCH /orders/:order_id/items/:product_id", () => {

  it("should return status 401 if user token is missing", async () => {
    const response = await request.patch("/orders/1/items/1");

    expect(response.status).toBe(401);
  });

  it("Should return status 400 if order_id is not a positive integer", async () => {
    
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

 
    const order = await ordersRepo.createOrder(user.id, false);
    await orderItemsRepo.createOrderItem(order.id, product1.id, 2);
    const body = {
      quantity:1
    }
    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
    .patch(`/orders/-${order.id}/items/${product1.id}`)
    .set("authorization", authorization)
    .send(body);

    const response2 = await request
    .patch(`/orders/${order.id}.1/items/${product1.id}`)
    .set("authorization", authorization)
    .send(body);

    expect(response.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it("Should return status 400 if product_id is not a positive integer", async () => {
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const order = await ordersRepo.createOrder(user.id, false);
    await orderItemsRepo.createOrderItem(order.id, product1.id, 2);

    const body = {
      quantity:1
    }
    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
    .patch(`/orders/${order.id}/items/-${product1.id}`)
    .set("authorization", authorization)
    .send(body);

    const response2 = await request
    .patch(`/orders/${order.id}/items/${product1.id}.1`)
    .set("authorization", authorization)
    .send(body);

    expect(response.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it("Should return status 400 if quantity is not a positive integer", async () => {
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const order = await ordersRepo.createOrder(user.id, false);
    await orderItemsRepo.createOrderItem(order.id, product1.id, 2);

    const body = {
      quantity:-1
    }
    const body2 = {
      quantity:1.1
    }
    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
    .patch(`/orders/${order.id}/items/${product1.id}`)
    .set("authorization", authorization)
    .send(body);

    const response2 = await request
    .patch(`/orders/${order.id}/items/${product1.id}`)
    .set("authorization", authorization)
    .send(body2);

    expect(response.status).toBe(400);
    expect(response2.status).toBe(400);
  });

  it("Should return status 404 if the order does not exist", async () => {
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const order = await ordersRepo.createOrder(user.id, false);
    await orderItemsRepo.createOrderItem(order.id, product1.id, 2);

    const body = {
      quantity:1
    }

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
    .patch(`/orders/${order.id+999}/items/${product1.id}`)
    .set("authorization", authorization)
    .send(body);

    expect(response.status).toBe(404);
  });

  it("Should return status 404 if the product does not exist", async () => {
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const order = await ordersRepo.createOrder(user.id, false);
    await orderItemsRepo.createOrderItem(order.id, product1.id, 2);

    const body = {
      quantity:1
    }

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
    .patch(`/orders/${order.id}/items/${product1.id+999}`)
    .set("authorization", authorization)
    .send(body);

    expect(response.status).toBe(404);
  });

  it("should return status 403 if user is not owner of the order", async () => {
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const user2 = await usersRepo.createUser(
      "user2",
      "user2@mail.com",
      "password2"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );

    const order = await ordersRepo.createOrder(user.id, false);
    await orderItemsRepo.createOrderItem(order.id, product1.id, 2);

    const body = {
      quantity:1
    }

    const authorization = generateAuthorizationHeaderForUser(user2.id);

    const response = await request
    .patch(`/orders/${order.id}/items/${product1.id}`)
    .set("authorization", authorization)
    .send(body);

    expect(response.status).toBe(403);
  });

  it("Should return status 404 if the product does not exist in the order", async () => {
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );
    const product2 = await productsRepo.createProduct(
      "product2",
      12,
      category1.id
    );

    const order = await ordersRepo.createOrder(user.id, false);
    await orderItemsRepo.createOrderItem(order.id, product1.id, 2);

    const body = {
      quantity:1
    }

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
    .patch(`/orders/${order.id}/items/${product2.id}`)
    .set("authorization", authorization)
    .send(body);

    expect(response.status).toBe(404);
  });
});