import server from './app.js';

const PORT = process.env.PORT || 3000;
const args = process.argv.slice(2);

server.listen(PORT, () => {
  console.log("Server running...");
});
