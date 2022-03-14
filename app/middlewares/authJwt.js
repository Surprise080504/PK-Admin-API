const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  const bearerHeader  = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(403).send({ message: "No token provided!" });
  }
  const bearerToken = bearerHeader.split(' ')[1];
  jwt.verify(bearerToken, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isOwner = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "owner") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Require owner Role!" });
        return;
      }
    );
  });
};


const authJwt = {
  verifyToken,
  isOwner,
};
module.exports = authJwt;
