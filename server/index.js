import express from "express"
import cors from "cors"
import { Server } from "socket.io"
import { createServer } from "http"
import morgan from "morgan"

const app = express()

app.use(cors())
app.use(morgan("dev"))
const server = createServer(app)

const io = new Server(server, {
  connectionStateRecovery: {}
})

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/client/index.html")
  console.log(process.cwd())
})

let userList = []

io.on("connection", (socket) => {
  console.log("a user has connected!")

  socket.on("join", (object) => {
    socket.join(object.room)

    userList.push({ name: object.name, room: object.room, id: socket.id })

    console.log(`user ${object.name} has joined the room ${object.room}`)
    console.log(userList)
    const roomList = userList.filter((user) => {
      return user.room === object.room
    })
    console.log(roomList)
    io.to(object.room).emit("joined room", roomList, object.name)
  })

  socket.on("create room", (object) => {
    console.log(socket.rooms)
    socket.leave(socket.rooms)
    socket.join(object.room)
    console.log(`room ${object.room} has been created`)
    userList.push({ name: object.name, room: object.room, id: socket.id })
    const roomList = userList.filter((user) => {
      return user.room === object.room
    })
    io.to(object.room).emit("joined room", roomList, object.name)
  })

  //Leaving the room
  socket.on("leaving", (name, room) => {
    socket.leave(room)
    console.log(`user ${name} left the room`)
    console.log(socket.id)

    const newArray = [
      ...userList.filter((user) => {
        return user.id !== socket.id
      })
    ]

    userList = [...newArray]

    io.to(room).emit("left room", { name: name, id: socket.id })
  })

  //Sending a message
  socket.on("sender message", (info) => {
    console.log(`${info.name} sent ${info.message}`)
    console.log(info)
    socket.to(info.room).emit("recieved message", info)
    console.log(info.timeStamp)
    socket.emit("sender message", info)
  })

  //Disconnecting the user
  socket.on("disconnect", () => {
    console.log("a user has disconnected with id: ", socket.id)
  })
})

server.listen(3000, () => {
  console.log("Server is running on port 3000")
})
