// Replace with your actual server URL
export const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3000';

export const SOCKET_URL = import.meta.env.REACT_APP_SOCKET_URL || API_URL;

export const STORAGE_KEYS = {
  USER: 'chat_user',
};

export const MESSAGE_LIMIT = 50;