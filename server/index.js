// let app = require("express")()
// let http = require("http").createServer(app)
// let io = require("socket.io")(http)
// let cors = require("cors")

// app.use(cors({
//     origin: "*"
// }))

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*")
//   next()
// })

const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: {
    origin: "*"
  }});

app.get('/', (req, res) => {
    res.send('Hello World')
})

io.on("connection", (socket) => {
  socket.on('comment', ({ comment }) => {
        io.emit('comment', ({ comment }))
    })
});

httpServer.listen(4000, () => {
    console.log("listening to port 4000")
});


// const httpServer = createServer();
// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:3001"
//   }
// });

// app.get('/', (req, res) => {
//     res.send('Hello World')
// })

// io.on('connection', socket => {
//     socket.on('comment', ({ comment }) => {
//         io.emit('comment', ({ comment }))
//     })
// })

// let port = 3001
// http.listen(port, () => {
//     console.log(`listening on port ${port}`)
// })
