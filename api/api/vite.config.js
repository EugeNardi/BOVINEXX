// vite.config.js
export default {
    server: {
      proxy: {
        '/getguia': 'http://localhost:4000',
        '/postguia': 'http://localhost:4000',
        '/uploads': 'http://localhost:4000',
      },
    },
  };
  