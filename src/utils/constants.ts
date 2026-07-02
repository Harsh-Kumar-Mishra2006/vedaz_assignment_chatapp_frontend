// For development
export const API_URL = import.meta.env.VITE_API_URL;
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || API_URL;


export const STORAGE_KEYS = {
  USER: 'chat_user',
};

export const MESSAGE_LIMIT = 50;

console.log('🔗 API URL:', API_URL);
console.log('🔌 Socket URL:', SOCKET_URL);