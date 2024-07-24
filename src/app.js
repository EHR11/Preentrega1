import express from "express"
import routerProducts from "./api/routes/products.js"
import routerCarts from "./api/routes/carts.js"
import viewsRouter from "./views/views.js"
import handlebars from "express-handlebars"
import __dirname from "./utils.js"
import { Server } from "socket.io"


const app= express()
console.log(app)

app.engine("handlebars",handlebars.engine())
app.set("views",__dirname+"/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname+"/public"))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const PORT = 8080
const httpServer=app.listen(PORT,()=>{console.log(`Server Running on Port ${PORT}`)})
const socketServer = new Server(httpServer)

const injectSocketMiddleWare = (req, res, next) => {
    const socketID = req.header("X-Socket-IO-ID");
    const socketIO = socketServer.of("/").sockets.get(socketID);

    if (!socketIO)
        console.warn("Some client does not have the X-Socket-IO-ID set!");

    req.socketIO = socketIO;

    next();
}

app.use("/api/products",injectSocketMiddleWare,routerProducts)
app.use("/api/carts",routerCarts)
app.use("/", viewsRouter)




socketServer.on("connection", socket=>{
    console.log("Client connected")
    socket.emit("WelcomeMsg","Welcome")
})