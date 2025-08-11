import http from "node:http";

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.method === "GET" && req.url === "/") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Welcome to the server" }));
  } else if (req.method === "GET" && req.url === "/about") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "This is the about route" }));
  } else if (req.method === "GET" && req.url === "/dashboard") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "This is the dashboard route" }));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
