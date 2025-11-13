/**
** =======================================================
@SECTION  : API Aggregator — HTTP Proxy Middleware
@FILE     : JSNSD/aggregate_api_http_proxy_middleware/server.js
@PURPOSE  : Subir um servidor com middleware de autenticação,
            proxy reverso para API externa e rotas Express para
            agregação de dados.
@LAST_EDIT : 2022-05-19
** =======================================================
*/

require('dotenv').config()
const express = require('express')
const router = require('./src/router/routerickmorty.js')

/**
 * Instância principal da aplicação Express.
 * @type {import('express').Express}
 */
const server = express()

/**
 * Porta definida via .env ou padrão 3000.
 * @type {number}
 */
const port = process.env.PORT || 3000

/**
 * Host opcional definido via .env.
 * @type {string}
 */
const host = process.env.HOST || 'localhost'

const { createProxyMiddleware } = require('http-proxy-middleware')
const { createServer } = require('http')
const https = require('https')

/**
 * URL base da API Rick & Morty.
 * @type {string}
 */
const apiurl = `https://rickandmortyapi.com/api/character`

// ---------------------------------------------------------
// ⚙ Configuração do Proxy Reverso
// ---------------------------------------------------------

/**
 * Opções do middleware de proxy.
 *
 * @type {import('http-proxy-middleware').Options}
 *
 * @remarks
 *  - `changeOrigin: true`: força host header remoto.
 *  - `secure: false`: ignora certificados inválidos.
 *  - `agent`: mantém conexão keepAlive.
 *  - `pathRewrite`: permite mascarar caminhos locais.
 */
const proxyoptions = {
    target: apiurl,
    changeOrigin: true,
    secure: false,
    agent: new https.Agent({ keepAlive: true }),
    pathRewrite: { ['^rickandmortyapi']: "" }
}

// ---------------------------------------------------------
//  Middlewares Globais
// ---------------------------------------------------------

server.use(express.json())

/**
 * Middleware de autorização simples.
 * Bloqueia requisições sem header Authorization.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {Function} next
 */
server.use("", (req, res, next) => {
    if (req.headers.authorization) {
        next()
    } else {
        res.status(403).send()
    }
})

// Proxy reverso para Rick & Morty API
server.use(createProxyMiddleware(proxyoptions))

// Rotas internas da aplicação
server.use(router)

// ---------------------------------------------------------
//  Inicialização
// ---------------------------------------------------------

createServer(server).listen(port, function () {
    console.log('Listening on:', this.address())
})
