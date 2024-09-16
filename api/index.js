const express = require('express')
const cors = require('cors');
const routerApi = require('./routes')

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const http = require('http')

const app = express()

// console.log(process.env)
const startPort = 3000

//
app.use(express.json())
app.use(cors())

//Search a anbusi port
function findAvailablePort(port, callback) {
  const server = http.createServer(app);

  server.listen(port, () => {
    server.once('close', () => {
      callback(port);
    });
    server.close();
  });

  server.on('error', () => {
    findAvailablePort(port + 1, callback);
  });
}


app.get('/api', (req, res) => {
  res.send('Hola mi server en express')
})

routerApi(app)
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

findAvailablePort(startPort, (availablePort) => {

  app.listen(availablePort, ()=> {
    console.log('Server listening on port: http://localhost:'+availablePort+'/api')
  })

})
