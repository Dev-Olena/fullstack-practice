const http = require('http');
const app = require('./app');
const {Server} = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`App started on port ${PORT}`)
});