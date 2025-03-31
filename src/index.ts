import { HttpClient } from './modules/HttpClient/HttpClient';

const server = new HttpClient()

server.get('/ping', (req, res) => { 
  res.send('pong')
})

server.post('/ping', (req, res) => { 
  res.send({
    status: 200,
    body: {
      result: 'pong'
    }
  })
})

server.listen(8080)
