import { env } from 'process';
import { createServer } from 'http';

const envPort = env.PORT;
const port = envPort? parseInt(envPort, 10) : 3000;
const host = '127.0.0.1'

const server = createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.end('Hello World!')
});
server.listen(port, () => {
  console.log(`Server running at http://${host}:${port}`);
});

