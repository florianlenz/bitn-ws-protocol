var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
    res.writeHead(200);
    res.end("<h1>Websocket - Running</h1>");
}

io.on('connection', function (socket) {

    console.log(socket.handshake.query['pubKey']);

    //get instructions to search user
    socket.on('search:user', function (data) {

        console.log('EVENT - search:user', data);

        //Instruct all connections to search for user
        io.sockets.emit('search:user', JSON.stringify({
            requester: socket.id,
            searchTerm: data,
            event: 'search:user'}));
    });

    socket.on('search-response:user', function(data){
        data = JSON.parse(data);
        io.to(data.requester).emit('search-response:user', JSON.stringify(data));
    });

    socket.on('node:add', function(){

        //Connect to new node

    });

    socket.on('msg:send', function(data){

        const exampleData = {
            to: 'pubKey',
            msg: 'hashed message',
            timeStamp: "timestamp",
            hashOfMsg: "asdf"
        };

        //1. ?Check if user is connected to this node / true -> send message / false -> send to another node

    });

});