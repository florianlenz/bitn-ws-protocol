var app = require('express')();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const levelup = require('levelup');

app.get('/', function(req, res){
    res.send('<h1>Hello world</h1>');
});

http.listen(process.env.PORT || 80);

const clients = [];

io.on('connection', function (socket) {

    /**
     * Set clients
     */
    clients.push({
        socketId: socket.id,
        pubKey: socket.handshake.query['pubKey']
    });

    console.log(clients);

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

    //Logic to share nodes
    socket.on('nodes:share', function(data){
        data = JSON.parse(data);

        //Node can contain address port
        const nodes = data.nodes;

        //1. Add to list of nodes
        //2. fetch list of nodes and pass back

        const savedNodes = [];

        socket.emit('nodes:share', JSON.stringify(savedNodes));

    });

    socket.on('disconnect', function(socket){

        for(var i = 0; i < clients.length; i++){

            const client = clients[i];

            if(client.socketId === socket.id){
                if (i > -1) {
                    clients.splice(i, 1);
                }
            }

        }

    })

});