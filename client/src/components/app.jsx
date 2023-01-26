import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io.connect('http://localhost:5000');
export const App = () => {
   const [room, setRoom] = useState('');

   const [message, setMessage] = useState('');
   const [messageRecive, setMessageRecive] = useState('');

   const joinRoom = () => {
      room !== '' && socket.emit('join_room', room);
   };

   useEffect(() => {
      socket.on('receive_message', (data) => {
         setMessageRecive(data.message);
      });
   }, [socket]);
   const sendMessage = () => {
      socket.emit('send_message', { message, room });
   };
   return (
      <div className="app">
         <input
            type="text"
            placeholder="Room"
            onChange={(e) => {
               setRoom(e.target.value);
            }}
         />
         <button onClick={joinRoom}>Join Room</button>
         <input
            type="text"
            placeholder="Message"
            onChange={(e) => {
               setMessage(e.target.value);
            }}
         />
         <button onClick={sendMessage}>Send Message</button>
         <h1>Message:</h1>
         {messageRecive}
      </div>
   );
};
