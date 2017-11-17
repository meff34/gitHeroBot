const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')
const querystring = require('querystring')
const notify = require('./push-notifier')

const { hostname = 'localhost', port = 8080 } = require('../config.json')

const handleRequest = (request, response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'application/json; charset=utf-8')

  const {query} = url.parse(request.url)
  const params = querystring.parse(query)

  if (params)
    notify(params)

  response.end()
}

const server = http.createServer(handleRequest)

module.exports = {
    start() {
        server.listen(port, hostname, () => {
            console.log(`Server listening at http://${hostname}:${port}/`)
        })
    }
}
