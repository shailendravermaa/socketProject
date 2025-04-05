const http=require('http');

const express =require('express');
const path=require('path');
const app=express();//http request ko ye handle karega 
const {Server}=require("socket.io")

const server=http.createServer(app);//this line says: “Hey, make an HTTP server, and when requests come in, let Express (app) handle them.”

const io=new Server(server)//web socket requests ko ye handle karega 

io.on('connection',(socket)=>{//when you make connection we just console
    
    socket.on('user-message', (msg) => {
        io.emit('user-message', msg); // broadcast to all clients
      });

    socket.on('user-message',(messege)=>{// this handles  the use-message event 
        console.log("new User messege",messege);
        io.emit('message',messege);//for all sending to all client connection
    });
    socket.on('user-emai',(email)=>{//this handles the 
        console.log("email",email);
    });
    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        io.emit("user-left", socket.id);
      });
     
      
      
})


// Serve all static files from "public" folder
app.use(express.static(path.join(__dirname, "public","index1.html")));

// Serve index.html on root route
app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "public", "index1.html"))
})
    server.listen(9000,()=>{
        console.log("server is started at  port:9000 ");
    })
    
    


   