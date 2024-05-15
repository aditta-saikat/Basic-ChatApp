const { Socket } = require('dgram');
const express = require('express'); 
const app = express();
const http = require('http'); 
const expressServer = http.createServer(app); 
const port = 3000; 

 

const {Server} = require("socket.io"); 
const io = new Server(expressServer); 

 

app.get('/', (req, res) => { 
res.sendFile(__dirname + "/index.html"); 

}); 

io.on("connection" , (socket) =>{
    

    socket.on('message', (data) => {
        const { msg, time } = data;
        
        io.emit('message-show', { msg, time });
    });
    
    
    /*console.log("A user is connected!");


    socket.on("disconnect" , (socket)=>{
        console.log("A user is disconnected!");
    })*/
});

 


expressServer.listen(port, () => { 
console.log(`Server is listening on port ${port}`); 

}); 