// Entry point for the backend server
// This file starts the Express server and listens for incoming requests

import app from './server';

// Get the port from environment variables
// If not set, default to 3001 (backend uses 3001, frontend uses 3000 to avoid conflict)
const PORT = process.env.PORT || 3001;

// Start the server listening on the specified port
const server = app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║  🚀 Sentinel Backend Started                     ║
║  📍 Running on: http://localhost:${PORT}          
║  🔗 Frontend: http://localhost:3000             ║
║  📊 Health Check: http://localhost:${PORT}/health ║
╚══════════════════════════════════════════════════╝
  `);
});

// Handle graceful shutdown
// When the process is terminated, close the server properly
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

export default server;
