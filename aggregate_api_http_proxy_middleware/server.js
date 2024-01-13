require('dotenv').config()
const express = require('express')
const router = require('./src/router/routerickmorty.js')
const server = express()

const port = process.env.PORT || 3000
const host = process.env.HOST || 'localhost'
const { createProxyMiddleware } = require('http-proxy-middleware')

const { createServer, Agent } = require('http')
const https = require('https')
const apiurl = `https://rickandmortyapi.com/api/character`

const proxyoptions = {
    target: apiurl,
    changeOrigin: true,
    secure: false,
    agent: new https.Agent({ keepAlive: true }),
    pathRewrite: { ['^rickandmortyapi']: "" }
}

server.use(express.json())
server.use("", (req, res, next) => {
    if (req.headers.authorization) {
        next()
    }
    else {
        res.status(403).send()
    }
})
server.use(createProxyMiddleware(proxyoptions))
server.use(router)


createServer(server).listen(port, function () {
    console.log('Listening on:', this.address())
})

