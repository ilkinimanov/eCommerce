const server = require('./app.js');
const PORT = process.env.PORT || 3000;


server.listen(PORT, () => {
  console.log("Server running...");
});
