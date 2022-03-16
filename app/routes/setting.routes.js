const controller = require('../controllers/setting.controller');

module.exports = function (app) {
  app.get('/api/setting/shopify-keys', controller.getShopifyKeys);
};
