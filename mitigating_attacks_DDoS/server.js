require('dotenv').config()
const express = require('express')
const {createServer}=require('http')

const rateLimit = require('express-rate-limit')
const router = require('./src/routers/router.js')

//Mitigating IP
const ipFilter = require('express-ipfilter').IpFilter
const ips = ["192.168.0.171","::ffff:127.0.0.1"]
const ipfilterMiddleware = ipFilter(ips,{mode:'deny'})


const port = process.env.PORT ||3000

const server = express()

//Limit Requests
const limiter = rateLimit({
    windowMs:10*60*100,
    max:5
})

server.use(express.json())
server.use(limiter)
server.use(ipfilterMiddleware)

server.set('trust proxy',1)

server.use(router)


createServer(server).listen(port,()=>{
    console.log(`Servidor escutando pela porta ${port}`)
})


