const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const createServer = ({ port = 8080, ssl = false, ipv6 = false } = {}) => {
  const requestHandler = (req, res) => {
    // Implement GET, HEAD, and POST methods
    if (req.method === 'GET' || req.method === 'HEAD') {
      handleGetHead(req, res);
    } else if (req.method === 'POST') {
      handlePost(req, res);
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
    }
  };

  const handleGetHead = (req, res) => {
    // Basic implementation of GET and HEAD methods
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': getMimeType(filePath) });
        if (req.method === 'GET') {
          res.end(data);
        } else {
          res.end();
        }
      }
    });
  };

  const handlePost = (req, res) => {
    // Basic implementation of POST method
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('POST data received');
    });
  };

  const getMimeType = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html',
      '.htm': 'text/html',
      '.txt': 'text/plain',
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
    };
    return mimeTypes[ext] || 'application/octet-stream';
  };

  const start = () => {
    const server = ssl ? https.createServer(requestHandler) : http.createServer(requestHandler);
    server.listen(port, ipv6 ? '::' : '0.0.0.0', () => {
      console.log(`Server running at ${ssl ? 'https' : 'http'}://${ipv6 ? '[::]' : '0.0.0.0'}:${port}/`);
    });
  };

  return { start };
};

module.exports = {
  createServer
};
