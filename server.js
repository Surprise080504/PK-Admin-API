const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const dbConfig = require('./app/config/db.config');
// const appConfig = require('./app/config/app.config');

// const db = require('./app/models');
// const Users = db.user;
// const Role = db.role;

const app = express();
require('dotenv').config();

var http = require('http');
// var https = require('https');
// var fs = require('fs');
// const socketIo = require('socket.io');

// const corsOptions = {
//   origin: ['http://localhost:3000', 'https://admin.purekanawholesale.com/', 'https://api.purekanawholesale.com/'],
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/app/public'));

const server = http.createServer(app);
// const io = socketIo(server, { cors: corsOptions });

// db.mongoose
//   .connect(appConfig.ENVIRONMENT == 'local' ? `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}` : dbConfig.URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('Successfully connect to MongoDB.');
//     // initial();
//   })
//   .catch(err => {
//     console.error('Connection error', err);
//     process.exit();
//   });

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: 'user',
//       }).save(err => {
//         if (err) {
//           console.log('error', err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: 'admin',
//       }).save(err => {
//         if (err) {
//           console.log('error', err);
//         }

//         console.log("added 'admin' to roles collection");
//       });
//     }
//   });
// }

//socket IO

// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some(user => user.userId === userId) && users.push({ userId, socketId });
// };

// const removeUser = socketId => {
//   users = users.filter(user => user.socketId !== socketId);
// };

// const getUser = userId => {
//   return users.find(user => user.userId === userId);
// };

// io.on('connection', socket => {
//   //add user
//   socket.on('addUser', userId => {
//     addUser(userId, socket.id);
//     console.log('--------EMIT_GET_USER----------');
//     io.emit('getUsers', users);
//   });

//   //send text message
//   socket.on('sendTextMessage', pushTextMessage => {
//     // const user = getUser(receiverId);
//     // io.to(user.socketId).emit("getMessage", {
//     //   senderId,
//     //   text,
//     // })
//     console.log(pushTextMessage.content);
//     io.emit('getMessage', pushTextMessage);
//   });

//   //send image message
//   socket.on('sendImageMessage', async pushImageMessage => {
//     // const user = getUser(receiverId);
//     // io.to(user.socketId).emit("getMessage", {
//     //   senderId,
//     //   text,
//     // })
//     console.log(pushImageMessage.sender);
//     const user = await Users.findOne({ _id: pushImageMessage.sender });
//     let parsedUser = JSON.parse(JSON.stringify(user));
//     let payload = {
//       avatar: parsedUser.avatar,
//       avatarColor: parsedUser.avatarColor,
//       id: parsedUser.id,
//       username: parsedUser.username,
//       _id: parsedUser._id,
//     };
//     pushImageMessage.sender = payload;
//     io.emit('getImageMessage', pushImageMessage);
//   });

//   //disconnect user
//   socket.on('disconnect', () => {
//     console.log('REMOVING...');
//     removeUser(socket.id);
//     io.emit('getUsers', users);
//   });
// });

// simple route
app.get('/get', (req, res) => {
  res.json({ message: 'Welcome to PK Admin application.' });
});

app.post('/data', (req, res) => {
  console.log(req.body);
  res.json({ message: req.body.msg });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/chat.routes')(app);
require('./app/routes/friends.routes')(app);
require('./app/routes/messages.routes')(app);
require('./app/routes/setting.routes')(app);
require('./app/routes/wholesale.routes')(app);
// require('./app/routes/upload.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
