const controller = require('../controllers/wholesale.controller');

module.exports = function (app) {
  app.get('/api/wholesale/products', controller.getProducts);
  app.get('/api/wholesale/orders', controller.getOrders);
  app.get('/api/wholesale/customers', controller.getCustomers);
};
