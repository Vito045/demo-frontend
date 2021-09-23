const { BACKEND_SERVER_IP } = window._env_;

export const apiAddress = BACKEND_SERVER_IP
  ? BACKEND_SERVER_IP
  : 'http://localhost:4000';
