const { createError } = require("../errors");
const orderItemsRepo = require("../repositories/orderItems");
const ordersRepo = require("../repositories/orders");
const productsRepo = require("../repositories/products");
const applicableCategoriesRepo = require("../repositories/applicableCategories");
const orderDiscountsRepo = require("../repositories/orderDiscounts");
const discountCodesRepo = require("../repositories/discountCodes");
const { validatePositiveIntegerNumber } = require("../validators");

/**
 * @param {number} order_id - id of the order
 * @param {number} user_id - id of the user who is requesting the order items
 */
async function getOrderItemsByOrderId(order_id, user_id) {
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }

  if (order.user_id !== user_id) {
    throw createError(
      "ForbiddenError",
      `User ${user_id} does not have access to order ${order_id}`
    );
  }

  return orderItemsRepo.getOrderItemsByOrderId(order_id);
}

/**
 * @param {number} order_id - id of the order
 * @param {number} product_id - id of the product to be updated inside the order
 * @param {number} quantity - the new quantity of the product inside the order
 * @param {number} user_id - id of the user who is requesting the update
 */
async function updateOrderItem(order_id, product_id, quantity, user_id) {
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }

  const product = await productsRepo.getProductById(product_id);

  if (product === null) {
    throw createError("NotFoundError", `Product ${product_id} was not found`);
  }

  if (order.user_id !== user_id) {
    throw createError(
      "ForbiddenError",
      `User ${user_id} does not have access to order ${order_id}`
    );
  }

  const orderItems = await orderItemsRepo.getOrderItemsByOrderId(order_id);

  const productInOrder = orderItems.find(
    (orderItem) => orderItem.product_id === product_id
  );

  if (productInOrder === undefined) {
    throw createError(
      "NotFoundError",
      `Product ${product_id} was not found in order ${order_id}`
    );
  }

  await orderItemsRepo.updateOrderItem(order_id, product_id, quantity);
}

/**
 * @param {number} order_id - id of the order
 * @param {number} user_id - id of the user who is requesting to add the discount code
 * @returns {Promise<DiscountCode[]>}
 */
async function getOrderDiscountCodesByOrderId(order_id, user_id) {
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }

  if (order.user_id !== user_id) {
    throw createError(
      "ForbiddenError",
      `User ${user_id} does not have access to order ${order_id}`
    );
  }

  const discountCodes = await orderDiscountsRepo.getOrderDiscountCodesByOrderId(
    order_id
  );

  return discountCodes;
}

/**
 * @param {number} order_id - id of the order
 * @param {string} code - the code of the discount code
 * @param {number} user_id - id of the user who is requesting to add the discount code
 * @returns {Promise<void>}
 */
async function addOrderDiscountCodeToOrderByCode(order_id, code, user_id) {
  const order = await ordersRepo.getOrderById(order_id);

  if (order === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }
  //verificar se o id do usuário é o mesmo da order
  if(order.id != user_id){
    throw createError(
      "ForbiddenError",
      `User ${user_id} does not have access to order ${order_id}`
    );
  }
  if(order.confirmed){
    throw createError(
      "ForbiddenError",
      `Order ${order.id} is already finished`
    )
  }
  //verificar o código
  const discount = await discountCodesRepo.getDiscountCodeByCode(code)
  if (discount === null) {
    throw createError("NotFoundError", `Order ${order_id} was not found`);
  }
  //verificar se o código ainda é válido
  const date = new Date();
  const dataExpiration = new Date(discount.expiration_date)
  if(date > dataExpiration){
    throw createError(
      "ForbiddenError",
      `Discount ${order.id} has expired`
    )
  }
  const order_itens = await orderItemsRepo.getOrderItemsWithProductInformationByOrderId(order.id)
  if(order_itens.length > 0){
    let total_price = 0;
    for(let product of order_itens){
      total_price += (product.product_price*product.quantity)
    }
    
    if(discount.minimum_order_value!=null && total_price < discount.minimum_order_value){
      throw createError(
        "ForbiddenError",
        `The total order amount is less than the minimum discount ${discount.id} value`
      )
    }
  }

  const discount_categories = await applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId(discount.id)
  if(discount_categories.length > 0){
    let count = 0;
    for(let product of order_itens){
      for(let category of discount_categories){
        if(product.product_category_id == category.id){
          count += 1;
        }
      }
    }
    if(count == 0){
      throw createError(
        "ForbiddenError",
        `No product belongs to the discount category`
      )
    }
  }

  const orderDiscounts_User = await orderDiscountsRepo.getOrderDiscountCodesByUserId(user_id)
  if(orderDiscounts_User.length > 0){
    for(let orderDiscount of orderDiscounts_User){
      if(orderDiscount.id == discount.id){
        throw createError(
          "ForbiddenError",
          `This code has already been used by this user.`
        )
      }
    }
  }


  const orderDiscount = await orderDiscountsRepo.addDiscountCodeToOrder(order_id, discount.id);
  return orderDiscount;
}

module.exports = {
  getOrderItemsByOrderId,
  getOrderDiscountCodesByOrderId,
  updateOrderItem,
  addOrderDiscountCodeToOrderByCode,
};
