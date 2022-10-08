const WebSocket = require('ws')

// Accepts an HTTP server
const setupWebSocket = server => {
  // ws instance
  const wss = new WebSocket.Server({ noServer: true })

  // Handle upgrade of the request
  server.on('upgrade', (request, socket, head) => {
    try {
      wss.handleUpgrade(request, socket, head, ws => {
        wss.emit('connection', ws, request)
      })
    } catch (e) {
      console.log('Upgrade exception', e)
      socket.write('HTTP/1.1 401 500 Internal Server Error')
      socket.destroy()
    }
  })

  server.on('request', (req, res) => {
    // If something will be changed in DB, send a websocket message to clients to inform them
    if (req.method === 'PATCH' || req.method === 'PUT' || req.method === 'POST') {
      for (const client of wss.clients.values()) {
        client.send('Update')
      }
    }
  })

  // What to do after a connection is established
  wss.on('connection', ctx => {
    // Print number of active connections
    console.log('Connected', wss.clients.size)

    // Handle message events
    // Receive a message and echo it back
    ctx.on('message', message => {
      console.log(`Received message => ${message}`)
      ctx.send(`You said ${message}`)
    })

    // Handle close event
    ctx.on('close', () => {
      console.log('Closed', wss.clients.size)
    })

    // Send a message that we're good to proceed
    ctx.send('Websocket connection established')
  })
}

module.exports = setupWebSocket
