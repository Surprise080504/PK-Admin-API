const { authJwt } = require("../middlewares");
const controller = require("../controllers/messages.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/api/message', [authJwt.verifyToken], controller.createMessage)
  app.get('/api/message/:friendId', [authJwt.verifyToken], controller.getMessage)
};