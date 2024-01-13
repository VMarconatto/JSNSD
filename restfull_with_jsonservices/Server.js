require('dotenv').config()
const fs = require('fs')
const express = require('express')

const server = express()
const routeprofile = require('./routers/routeprofile.js')
const port = 3000

server.use(express.json())
server.use(routeprofile)
server.listen(port,()=>{
    console.log(`Servidor comunicando pela porta ${port}`)
})
