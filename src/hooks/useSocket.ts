import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { type Message } from '../types';
import { SOCKET_URL } from '../utils/constants';
import toast from 'react-hot-toast';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    console.log('🔄 Connecting to Socket.IO at:', SOCKET_URL);
    
    socketRef.current = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000,
      path: '/socket.io', // Ensure this matches backend
      forceNew: true,
    });

    socketRef.current.on('connect', () => {
      console.log('✅ Socket connected to:', SOCKET_URL);
      setIsConnected(true);
      toast.success('Connected to chat server');
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('❌ Socket disconnected:', reason);
      setIsConnected(false);
      if (reason !== 'io client disconnect') {
        toast.error('Disconnected from chat server');
      }
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error);
      console.error('📍 Connection URL:', SOCKET_URL);
      setIsConnected(false);
      // Don't show toast for every connection attempt to avoid spam
    });

    socketRef.current.on('reconnect_attempt', (attempt) => {
      console.log(`🔄 Reconnection attempt ${attempt}`);
    });

    socketRef.current.on('reconnect', () => {
      console.log('✅ Socket reconnected');
      toast.success('Reconnected to chat server');
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