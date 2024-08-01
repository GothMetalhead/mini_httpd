# mini_httpd

Inspired by [mini_httpd](https://www.acme.com/software/mini_httpd/).

## Overview

This project aims to create a minimalistic and extremely fast HTTP daemon server. It is designed to be simple, lightweight, and easy to use.

## Features

- GET, HEAD, and POST methods.
- CGI support.
- Basic authentication.
- Security against ".." filename snooping.
- Common MIME types.
- Trailing-slash redirection.
- index.html, index.htm, index.cgi support.
- Directory listings.
- Multihoming / virtual hosting.
- Standard logging.
- Custom error pages.
- SSL/HTTPS support.
- IPv6 support.

## Installation

```bash
npm install mini_httpd
```

## Usage

```javascript
const httpDaemon = require('mini_httpd');

const server = httpDaemon.createServer({
  port: 8080,
  ssl: false, // Set to true for HTTPS
  ipv6: false, // Set to true for IPv6
});

server.start();
```
