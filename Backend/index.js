const express = require('express'); 
const app = express(); 
const http = require("http"); 
const cors = require("cors"); 
const { Server } = require("socket.io") 
app.use(cors());  
const server = http.createServer(app); 
const io = new Server(server, {
    cors:{ 
        origin:"http://localhost:3000", 
        methods: ["GET","POST"],
    }
})  
io.on("connection",(socket) =>{
    console.log(socket.id); 
    socket.on("join_room", (data) => { 
        socket.join(data);  
        console.log(`Joined a room ${data} where id is ${socket.id}`);
    }) 
    socket.on("send_msg",(data) =>{ 
        socket.to(data.room).emit("recieve_msg",data);
        console.log(data);
    })
    socket.on("disconnect", () =>{ 
        console.log("User Disconnected", socket.id); 
    })
})
server.listen(3001, () => { 
    console.log("Server running");
})