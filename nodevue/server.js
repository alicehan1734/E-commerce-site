
const httpServer = require("http").createServer()

const users = {}

const io = require('socket.io')(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }})

io.on('connection', socket => {
    console.log("hello")
    socket.emit('chat-message', ' hello')

    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })

    socket.on('send-chat-message',message => { //client 로부터 메시지 받았다. 
    socket.broadcast.emit('chat-message', {message:message, name: users[socket.id]}) // 보낸 client 를 제외한 다른 client 들에게 보내기 
    console.log(message)

})

    socket.on('disconnect',message => { //client 로부터 메시지 받았다. 
        socket.broadcast.emit('user-disconnected', users[socket.id]) // 보낸 client 를 제외한 다른 client 들에게 보내기 
        delete users[socket.id];

    })
})

httpServer.listen(3009, () => {
    console.log('listening on 3009.')
})