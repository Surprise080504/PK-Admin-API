const { authJwt } = require('../middlewares');
const controller = require('../controllers/messages.controller');

module.exports = function (app) {
  app.post('/api/message', [authJwt.verifyToken], controller.createMessage);
  app.get('/api/message/:friendId', [authJwt.verifyToken], controller.getMessage);
};
