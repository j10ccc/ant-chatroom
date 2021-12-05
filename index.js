const path = require('path');
const http = require('http');
const Koa = require('koa');
const serve = require('koa-static');
const socketIO = require('socket.io');

const hostname = '127.0.0.1';
const port = 3000;
const publicPath = path.join(__dirname, 'public');

//  创建koa实例
const app = new Koa();
// 创建http server 实例
const server = http.createServer(app.callback());

//创建 socket.io实例
const io = socketIO(server);

//储存在线所有用户
const users = new Map();
const historys = [];

// 客户端接入
io.use((socket, next) => {
  const { name, password } = socket.handshake.query;
  if (!name) {
	return next(new Error('WRONG_ACCOUNT'));
  }
  if (password !== 'j10c') {
	console.log("wrong password");
	return next(new Error('WRONG_PASSWORD'));
  }
  next();
});

io.on('connection', function(socket) {
  console.log('user connected');
  const name = socket.handshake.query.name;
  users.set(name, socket);
  console.log('users====', users.keys());
  io.sockets.emit('online', [...users.keys()]);

  socket.on('disconnect', function(socket) {
	console.log(socket); //transport close
	console.log('user connected');
	users.delete(name, socket);
	console.log('users====', users.keys());
	io.sockets.emit('online', [...users.keys()]);
  });
  // 10:18
  socket.on('sendMessage', (content) => {
	console.log(name + " send a message: " + content);
	const message = {
	  time: Date.now(),
	  sender: name,
	  content: content
	};
	historys.push(message);
	socket.broadcast.emit('receiveMessage', message);
  });
  socket.on('getHistory', (fn) => {
	fn(historys);
  })
});

app.use(serve(publicPath));

server.listen(port, hostname, () => {
  console.log('listening...');
});
