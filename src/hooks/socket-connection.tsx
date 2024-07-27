import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useIo = (url: string) => {
    // Define explícitamente que el estado puede ser una instancia de Socket o null
    const [socket, setSocket] = useState<any | null>(null);

    useEffect(() => {
        const socketInstance = io(url);
        setSocket(socketInstance);
        
        // Limpieza al desmontar el componente
        return () => {
            socketInstance.disconnect();
        };
    }, [url]); // Dependencias del useEffect, solo depende de la URL

    return socket;
};

export default useIo;