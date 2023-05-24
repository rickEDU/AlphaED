jest.mock("../../src/repositories/orders")
jest.mock("../../src/repositories/discountCodes")
jest.mock("../../src/repositories/orderItems")
jest.mock("../../src/repositories/applicableCategories")
jest.mock("../../src/repositories/orderDiscounts")


const supertest = require("supertest");
const { app } = require("../../src/app");
const {
  generateAuthorizationHeaderForUser,
  eraseDatabase,
  createDatabaseFromSchema,
  disconnectDatabase,
} = require("../helpers");
const ordersRepo = require("../../src/repositories/orders");
const discountRepo = require("../../src/repositories/discountCodes");
const orderItemsRepo = require("../../src/repositories/orderItems");
const applicableCategoriesRepo = require("../../src/repositories/applicableCategories");
const orderDiscountsRepo = require("../../src/repositories/orderDiscounts");




const ordersService = require("../../src/services/orders");


beforeEach(async () => {
  await eraseDatabase();
  await createDatabaseFromSchema();
});

afterAll(async () => {
  await eraseDatabase();
  await disconnectDatabase();
});

describe("Service POST /orders/:order_id/discount-codes", ()=>{

    it("Should return status 404 if order does not exist", async ()=>{
      const user_id = 1;
      const order_id = 1;
      const code = "testeTeste";
  
      jest.mocked(ordersRepo.getOrderById).mockResolvedValue(null);

      await expect(() =>
        ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
      ).rejects.toMatchObject({
        message: `Order ${order_id} was not found`,
        name: "NotFoundError",
      })
    });

    it("Should return status 403 if user is not owner of the order", async ()=>{
      const user_id = 1;
      const order_id = 1;
      const code = "testeTeste";

      jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
        return {id:1, user_id:2, confirmed: false, created_at: "12/8/2012"}
      });

      await expect(() =>
        ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
      ).rejects.toMatchObject({
        message: `User ${user_id} does not have access to order ${order_id}`,
        name: "ForbiddenError",
      })
    });

    it("Should return status 403 order is already close", async ()=>{
      const user_id = 1;
      const order_id = 1;
      const code = "testeTeste";

      jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
        return {id:1, user_id:1, confirmed: true, created_at: "12/8/2012"}
      });

      await expect(() =>
        ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
      ).rejects.toMatchObject({
        message: `Order ${order_id} is already finished`,
        name: "ForbiddenError",
      })
    });

    it("Should return status 404 if the code does not exist", async ()=>{
      const user_id = 1;
      const order_id = 1;
      const code = "testeTeste";

      jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
        return {id:1, user_id:1, confirmed: false, created_at: "12/8/2012"}
      });
     jest.mocked(discountRepo.getDiscountCodeByCode).mockResolvedValue(null);

      await expect(() =>
        ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
      ).rejects.toMatchObject({
        message: `Order ${order_id} was not found`,
        name: "NotFoundError",
      })
    });

    it("Should return status 404 if the code is not valid anymore", async ()=>{
      const user_id = 1;
      const order_id = 1;
      const code = "testeTeste";

      jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
        return {id:1, user_id:1, confirmed: false, created_at: "12/8/2012"}
      });
     jest.mocked(discountRepo.getDiscountCodeByCode).mockImplementation( async () => {
      return {id: 1, code:"testeTeste",value: 10, type:'absolute', expiration_date:"12/12/2012", minimum_order_value:10}
     });

      await expect(() =>
        ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
      ).rejects.toMatchObject({
        message: `Discount ${code} has expired`,
        name: "ForbiddenError",
      })
    });

    it("Should return status 403 if the total purchase amount is less than the minimum discount value", async ()=>{
      const user_id = 1;
      const order_id = 1;
      const code = "testeTeste";

      jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
        return {id:1, user_id:1, confirmed: false, created_at: "12/8/2012"}
      });
     jest.mocked(discountRepo.getDiscountCodeByCode).mockImplementation( async () => {
      return {id: 1, code:"testeTeste",value: 10, type:'absolute', expiration_date:"12/12/2099", minimum_order_value:100}
     });
     jest.mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId).mockImplementation( async () => {
      return [
        {
          order_id:1, 
          product_id:2, 
          quantity:2, 
          product_name:"produto 1", 
          product_price:15, 
          product_category_id:1
        },
        {
          order_id:1, 
          product_id:3, 
          quantity:1, 
          product_name:"produto 2", 
          product_price:5, 
          product_category_id:2
        }
      ]
     });

      await expect(() =>
        ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
      ).rejects.toMatchObject({
        message: `The total order amount is less than the minimum discount ${code} value`,
        name: "ForbiddenError",
      })
    });

    it("Should return status 403 if no product belongs to the discount category", async ()=>{
      const user_id = 1;
      const order_id = 1;
      const code = "testeTeste";

      jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
        return {id:1, user_id:1, confirmed: false, created_at: "12/8/2012"}
      });
      jest.mocked(discountRepo.getDiscountCodeByCode).mockImplementation( async () => {
        return {id: 1, code:"testeTeste",value: 10, type:'absolute', expiration_date:"12/12/2099", minimum_order_value:10}
      });
      jest.mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId).mockImplementation( async () => {
        return [
          {
            order_id:1, 
            product_id:2, 
            quantity:2, 
            product_name:"produto 1", 
            product_price:15, 
            product_category_id:1
          },
          {
            order_id:1, 
            product_id:3, 
            quantity:1, 
            product_name:"produto 2", 
            product_price:5, 
            product_category_id:2
          }
        ]
      });
      jest.mocked(applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId).mockImplementation(async ()=>{
        return [        
          {
          id:3,
          name:"categoria 1"
          }
        ];
      });
      await expect(() =>
        ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
      ).rejects.toMatchObject({
        message: `No product belongs to the discount category`,
        name: "ForbiddenError",
      })
    });

    it("Should return status 403 if the discount code has already been used in the same or another order by the user", async ()=>{
      const user_id = 1;
      const order_id = 1;
      const code = "testeTeste";

      jest.mocked(ordersRepo.getOrderById).mockImplementation(async () => {
        return {id:1, user_id:1, confirmed: false, created_at: "12/8/2012"}
      });
      jest.mocked(discountRepo.getDiscountCodeByCode).mockImplementation( async () => {
        return {id: 1, code:"testeTeste",value: 10, type:'absolute', expiration_date:"12/12/2099", minimum_order_value:10}
      });
      jest.mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId).mockImplementation( async () => {
        return [
          {
            order_id:1, 
            product_id:2, 
            quantity:2, 
            product_name:"produto 1", 
            product_price:15, 
            product_category_id:1
          },
          {
            order_id:1, 
            product_id:3, 
            quantity:1, 
            product_name:"produto 2", 
            product_price:5, 
            product_category_id:2
          }
        ]
      });
      jest.mocked(applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId).mockImplementation(async ()=>{
        return [        
          {
          id:2,
          name:"categoria 1"
          }
        ];
      });
      jest.mocked(orderDiscountsRepo.getOrderDiscountCodesByUserId).mockImplementation(async () =>{
        return [
          {
            id:1,
            code:"testeTeste",
            value:5,
            type:"absolute",
            expiration_date:"12/12/2099",
            minimum_order_value:150
          }
        ];
      })
      await expect(() =>
        ordersService.addOrderDiscountCodeToOrderByCode(order_id, code, user_id)
      ).rejects.toMatchObject({
        message: `This code has already been used by this user.`,
        name: "ForbiddenError",
      })
    });

});