const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Friends = db.friends;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const randColor = () => {
    let color = Math.floor(Math.random() * 16777215).toString(16);
    color = "#" + color;
    return color
  }

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    avatarColor: randColor(),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          let user_role_names = roles.map(role => role.name);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: 86400 // 24 hours
            });

            var authorities = [];

            for (let i = 0; i < user_role_names.length; i++) {
              authorities.push("ROLE_" + user_role_names[i].name.toUpperCase());
            }
            res.status(200).send({
              ...user._doc,
              id: user._id,
              username: user.username,
              email: user.email,
              roles: authorities,
              accessToken: token,
              friendsData: [],
            });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });

          var authorities = [];
          console.log("_______________", user.roles)
          for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_USER");
          }
          res.status(200).send({
            ...user._doc,
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            friendsData: [],
          });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      let friendsData;

      try {
        console.log(user._id)
        let logedUserId = user._id.toString();
        let friends = await Friends.find({
          friends: { $in: [logedUserId] },
        });
        friendsData = JSON.parse(JSON.stringify(friends))
        console.log('friends:', friends)
        let userList = []
        await Promise.all(friendsData.map(async (friend, index) => {
          const friendId = friend.friends.find((m) => m !== logedUserId);
          const user = await User.findOne({ _id: friendId });
          friendsData[index].friend = JSON.parse(JSON.stringify(user))
        }))

        res.status(200).send({
          ...user._doc,
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          friendsData: friendsData
        });
      }
      catch (err) {
        console.log(err)
      }


    });
};