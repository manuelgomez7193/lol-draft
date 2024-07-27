"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Champions, Datum } from '@/interfaces/champions';
import { motion } from "framer-motion"
import { useSearchParams } from 'next/navigation';
import useIo from '@/hooks/socket-connection';
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function ChampionsList({id}: {id: string}) {
  const [champions, setChampions] = useState<{ [key: string]: Datum }>({});
  const [version, setVersion] = useState('');
  const [search, setSearch] = useState('');
  const socket = useIo("http://localhost:3001");
  const [connected, setConnected] = useState<boolean | null>(socket?.connected);
  const searchParams = useSearchParams()
  const typeView = searchParams.get('typeView');
  const roomId = id;

  console.log(roomId);
  console.log(typeView);
  
  async function fetchVersion() {
    const response = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
    const versions: string[] = await response.json();
    setVersion(versions[0]); // Establece la versión más reciente
  }

  useEffect(() => {
    fetchVersion();
  }, []);

  useEffect(() => {
    if (version) {
      const fetchChampions = async () => {
        try {
          const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/es_AR/champion.json`);
          const data: Champions = await response.json();
          setChampions(data.data);
        } catch (error) {
          console.error('Error fetching champions: ', error);
        }
      };
      fetchChampions();
    }
  }, [version]);

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
        socket.emit('joinRoom', roomId);
      });

      // socket.on('chat message server', (mensaje: string) => {
      //   //console.log('Mensaje del servidor:', mensaje);
      //   toast.info(mensaje, {
      //     position: "top-center",
      //     autoClose: 1000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "dark",
      //     transition: Flip,
      //   });
      // });

      socket.on('receiveMessage', (message: string) => {
        toast.info(message, {
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
  }, [roomId, socket]); // La dependencia aquí es el socket mismo

  const enviarMensaje = () => {
    if (socket) {
      socket.emit('sendMessage', roomId, 'Hello from the ' + typeView + '!');
    }
  };

  const filteredChampions = search === ''
    ? champions
    : Object.keys(champions).reduce((filtered, key) => {
        const champ = champions[key];
        if (champ.name.toLowerCase().includes(search.toLowerCase())) {
          filtered[key] = champ;
        }
        return filtered;
      }, {} as { [key: string]: Datum });

  return (
    <div>
      <h1>Team name: {typeView}</h1>
      <button className='button-custom w-fit' onClick={enviarMensaje}>Send message</button>
      <h1>State of conexion: {connected ? 'Connected' : 'Disconnected'}</h1>
      <h1>League of Legends Champions</h1>
      <input
        type="text"
        placeholder="Search champion"
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4" // margen para separar del grid
      />
      <div className="grid grid-cols-6 gap-4">
        {Object.keys(filteredChampions).map((key) => {
          const champ = filteredChampions[key];
          const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champ.id}.png`;
          return (
            <motion.div layout key={key} className="flex flex-col items-center container-champion">
              <Image 
                src={imageUrl}
                alt={champ.name}
                width={100}
                height={100}
                layout="fixed"
                unoptimized={true}
              />
              <span>{champ.name}</span>
            </motion.div>
          );
        })}
      </div>
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

export default ChampionsList;
