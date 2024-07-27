"use client";

import { useEffect, useState } from 'react';
import useIo from '../../hooks/socket-connection'; // Asegúrate de importar correctamente el hook
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function Test() {
  const socket = useIo("http://localhost:3001");
  const [connected, setConnected] = useState<boolean | null>(socket?.connected);

  useEffect(() => {
    if (socket) {
      socket.on('connected', () => {
        //console.log('Conectado al servidor');
        toast.success('Conectado al servidor', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
        setConnected(true);
      });

      socket.on('chat message server', (mensaje: string) => {
        //console.log('Mensaje del servidor:', mensaje);
        toast.info(mensaje, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      });

      return () => {
        setConnected(false);
        socket.off('connected');
        socket.off('chat message server');
      };
    }
  }, [socket]); // La dependencia aquí es el socket mismo

  const enviarMensaje = () => {
    if (socket) {
      socket.emit('chat message', 'Hola desde el cliente!');
    }
  };


  return (
    <div className='flex flex-col gap-2 ml-5 mt-5'>
      <h1>Client Socket.IO</h1>
      <button className='button-custom w-fit' onClick={enviarMensaje}>Send message</button>
      <label>State of conexion: {connected ? 'Connected' : 'Disconnected'}</label>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </div>
  );
}



