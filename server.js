const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const port = 81;

app.use(express.json());

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

wss.on('connection', (ws) => {
  console.log('WebSocket connection established');

  ws.send('Hello from Server!');

  ws.on('message', (message) => {
    const msg = message.toString();
    console.log('Received message from client:', msg);
    ws.send(`Server received: ${msg}`);
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://0.0.0.0:${port}`);
});