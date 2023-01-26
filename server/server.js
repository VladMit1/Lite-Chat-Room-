const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT;
app.use(cors());
app.use(
   '/',
   express.static(
      path.join(__dirname.replace('server', ''), 'client', 'public')
   )
);
app.get('/*', (_req, res) => {
   res.sendFile(
      path.join(
         __dirname.replace('server', ''),
         'client',
         'public',
         'index.html'
      )
   );
});
const server = http.createServer(app);
const io = new Server(server, {
   cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
   }
});

io.on('connection', (socket) => {
   console.log(`User connected: ${socket.id}`);
   socket.on('join_room', (data) => {
      socket.join(data);
   });
   socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
   });
});

server.listen(PORT, () => {
   console.log('-----------------------------------');
   console.log(`  App running in port ${PORT}`);
   console.log('-----------------------------------');
   console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
