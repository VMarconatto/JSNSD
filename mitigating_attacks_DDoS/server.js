/**
** =======================================================
@SECTION  : REST API — Mitigation: DDoS & IP Filtering
@FILE     : JSNSD/mitigating_attacks_DDoS/server.js
@PURPOSE  : Subir servidor Express protegido com rate-limiting,
            filtragem de IP e proxy trust para mitigar ataques
            de negação de serviço e abuso de endpoints.
@LAST_EDIT : 2022-05-19
** =======================================================
*/

require('dotenv').config()
const express = require('express')
const { createServer } = require('http')

const rateLimit = require('express-rate-limit')
const router = require('./src/routers/router.js')

// ---------------------------------------------------------
// 🔐 Mitigação por IP — express-ipfilter
// ---------------------------------------------------------

/**
 * Lista de IPs bloqueados ou permitidos, dependendo do modo.
 * @type {string[]}
 * @remarks
 *  - Aqui o modo está como "deny": estes IPs serão bloqueados.
 *  - "::ffff:127.0.0.1" = IPv6 mapped localhost.
 */
const ips = ["192.168.0.171", "::ffff:127.0.0.1"]

/**
 * Middleware de filtragem de IP (deny-list).
 * @type {import('express').RequestHandler}
 */
const ipFilter = require('express-ipfilter').IpFilter
const ipfilterMiddleware = ipFilter(ips, { mode: 'deny' })

// ---------------------------------------------------------
// ⚙ Configurações HTTP / Express
// ---------------------------------------------------------

/**
 * Porta onde o servidor vai escutar.
 * @type {number}
 */
const port = process.env.PORT || 3000

/**
 * Instância principal da aplicação Express.
 * @type {import('express').Express}
 */
const server = express()

// ---------------------------------------------------------
// 🛡 Rate Limit — mitigar DDoS básico
// ---------------------------------------------------------

/**
 * Middleware de limitação de requisições.
 *
 * @remarks
 *  - `windowMs = 10*60*100` → Janela de 1 minuto (1000 seria 1s).
 *  - `max = 5` → Máximo de 5 requisições por janela.
 */
const limiter = rateLimit({
    windowMs: 10 * 60 * 100,
    max: 5
})

// ---------------------------------------------------------
//  Middlewares Globais
// ---------------------------------------------------------

server.use(express.json())
server.use(limiter)
server.use(ipfilterMiddleware)
/**
 * Necessário em ambientes com proxy reverso (NGINX ou Heroku),
 * permitindo identificar corretamente o IP original do cliente.
 */
server.set('trust proxy', 1)

// Rotas principais
server.use(router)

// ---------------------------------------------------------
//  Inicialização do Servidor HTTP
// ---------------------------------------------------------

createServer(server).listen(port, () => {
    console.log(`Servidor escutando pela porta ${port}`)
})
