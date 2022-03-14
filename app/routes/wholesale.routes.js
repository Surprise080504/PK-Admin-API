const controller = require('../controllers/wholesale.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'authorization, Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/wholesale/products', controller.getProducts);
  app.get('/api/wholesale/orders', controller.getOrders);
  app.get('/api/wholesale/customers', controller.getCustomers);
};
