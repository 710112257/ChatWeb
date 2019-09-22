var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usocket = [];
var jsdom = require('jsdom');


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  console.log(req.connection.remoteAddress);//获取客户端ip地址

});

io.on('connection', function (socket) {

  //console.log('a user connected')

  socket.on("join", function (name) {
    usocket[name] = socket
    io.emit("join", name)
  })

  socket.on("message", function (msg) {
    io.emit("message", msg) //将新消息广播出去
  })

});

http.listen(8080, function () {
  console.log('listening on *:8080');
});



