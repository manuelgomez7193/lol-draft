import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';  // Asegúrate de importar cors

import { Server } from 'socket.io';

const app = express();
const server = createServer(app);

// Aplicar middleware CORS
app.use(cors({
  origin: "http://localhost:3000", // Cambia este URL si es necesario
  methods: ["GET", "POST"],
  credentials: true
}));

// Configurar Socket.IO con opciones de CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // URL del cliente, asegúrate de cambiar esto si tu cliente está en una URL diferente
    methods: ["GET", "POST"],
    credentials: true
  }
});

// io.on('connection', async (socket) => {
//   console.log('a user connected');

//   io.emit('connected');

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//     io.emit('chat message server', "Hola soy el servidor");
//   });

// });

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  io.emit('connected');

  // Escuchar cuando un cliente quiere unirse a una sala
  socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} se ha unido a la sala ${roomId}`);
  });

  // Escuchar mensajes enviados por el cliente y retransmitirlos a la sala, excepto al emisor
  socket.on('sendMessage', (roomId, message) => {
      console.log(message);
      socket.to(roomId).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
      console.log('Un cliente se ha desconectado');
  });
});

server.listen(3001, () => {
  console.log('server running at http://localhost:3001');
});