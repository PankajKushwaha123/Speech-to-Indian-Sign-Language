import express from 'express';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
const io = new Server(8001, {
  cors: {
    origin: "*", // your frontend domain
    methods: ["GET", "POST"]
  }
});
const app=express();
app.use(bodyParser.json());
const emialToSocketMapping=new Map();
const socketToEmailMapping=new Map();
app.listen(8000,()=>{
  console.log('server is running on port 8000');
}
);


io.on('connection', (socket) => {
  console.log("New Connection");
  // when user connects 
  socket.on('join-room',data=>{
    
    const {roomId, emailId}=data;
    //console.log('a user connected',roomId , emailId);
    emialToSocketMapping.set(emailId, socket.id);
    socketToEmailMapping.set(socket.id, emailId);
    socket.join(roomId);
    socket.emit("joined-room", data);
    socket.broadcast.to(roomId).emit('user-joined',{ emailId});
  })
  socket.on('call-user',(data)=>{
    const {emailId,offer}=data;
    const fromEmailId=socketToEmailMapping.get(socket.id);
    const socketId=emialToSocketMapping.get(emailId);
    //console.log(fromEmailId)
      socket.to(socketId).emit('incoming-call',{
        from:fromEmailId,
        offer,})
  })
  socket.on("call-accepted",data=>{
    const {emailId, ans}=data;
    const socketId=emialToSocketMapping.get(emailId);
    //console.log("call accepted",emailId, ans);
    socket.to(socketId).emit('call-accepted',{ans});
  }
  )
  socket.on("textsent",data=>{
    const {emailId, text,roomId}=data;
    const socketId=emialToSocketMapping.get(emailId);
    console.log("text sent",emailId, text);
    console.log("socketId",socketId);
    console.log("roomId",roomId);
    socket.to(roomId).emit('textreceived',{text});
  })
  socket.on('predictedText',data=>{
    const { text,name,roomId}=data;

    console.log("predictedText", text);
    console.log("name",name);
    console.log("roomId",roomId);
    console.log("socketId",typeof roomId);
    socket.to(roomId).emit('predictedTextReceived',{text});
  })
});