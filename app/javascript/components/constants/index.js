export const API_ROOT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api'
    : 'https://secret-retreat-97516.herokuapp.com/api/';
export const API_WS_ROOT = 'ws://localhost:3000/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};