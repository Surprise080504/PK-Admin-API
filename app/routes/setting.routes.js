const controller = require('../controllers/setting.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Headers', 'authorization, Origin, Content-Type, Accept');
    next();
  });

  app.get('/api/setting/shopify-keys', controller.getShopifyKeys);
};
