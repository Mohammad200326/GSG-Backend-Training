# Backend Heroes Task: Node.js Core Modules Comparison

Hello Backend Heroes 👋💻

## 📌 Your Task:

Prepare a concise and well-structured summary comparing the following Node.js core modules:

- `http` module
- `http2` module
- `https` module

---

## What to include in your summary:

### 1. Purpose of Each Module

- **http module**  
  Provides functionality to create HTTP servers and clients using the HTTP/1.1 protocol. It is the foundation for building web servers that handle requests and responses in Node.js.

- **http2 module**  
  Implements the HTTP/2 protocol, which offers improvements over HTTP/1.1 such as multiplexing, header compression, and server push. This module supports both client and server-side HTTP/2 features.

- **https module**  
  Extends the `http` module by adding TLS/SSL encryption, allowing you to create secure HTTPS servers and clients.

---

### 2. Key Technical Differences Between HTTP/1.1 and HTTP/2

| Feature               | HTTP/1.1                                | HTTP/2                                                   |
| --------------------- | --------------------------------------- | -------------------------------------------------------- |
| Protocol              | Text-based                              | Binary                                                   |
| Multiplexing          | No (one request per TCP connection)     | Yes (multiple requests/responses on a single connection) |
| Header Compression    | None                                    | HPACK header compression                                 |
| Server Push           | No                                      | Yes (server can push resources proactively)              |
| Connection Management | Multiple TCP connections often required | Single TCP connection per origin                         |
| Prioritization        | No                                      | Yes (requests can be prioritized)                        |

---

### 3. When to Use Each Module in Real-World Applications

- Use **`http` module** for simple or legacy applications where HTTP/1.1 is sufficient and TLS is not required.
- Use **`https` module** when you need secure communication over HTTPS, commonly for production web servers.
- Use **`http2` module** when you want to leverage HTTP/2 features such as multiplexing and server push to improve performance, especially for modern web applications with complex resource loading.

---

Feel free to enhance this summary with examples or references.

Good luck! 🚀
