//hooks/useSocket.ts
import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { type Message } from '../types';
import { SOCKET_URL } from '../utils/constants';
import toast from 'react-hot-toast';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => {
      console.log('✅ Socket connected');
      setIsConnected(true);
      toast.success('Connected to chat server');
    });

    socketRef.current.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      setIsConnected(false);
      toast.error('Disconnected from chat server');
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
      toast.error('Failed to connect to chat server');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const sendMessage = useCallback((messageData: Message) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit('new_message', messageData);
      return true;
    } else {
      toast.error('Not connected to server');
      return false;
    }
  }, [isConnected]);

  const emitEvent = useCallback((event: string, data: any) => {
    if (socketRef.current && isConnected) {
      socketRef.current.emit(event, data);
      return true;
    }
    return false;
  }, [isConnected]);

  const onEvent = useCallback((event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
      return () => {
        socketRef.current?.off(event, callback);
      };
    }
    return () => {};
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    sendMessage,
    emitEvent,
    onEvent,
  };
};