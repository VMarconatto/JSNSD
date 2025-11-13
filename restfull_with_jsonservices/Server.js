/**
** =======================================================
@SECTION  : REST API — Server Bootstrap
@FILE     : JSNSD/restfull_with_jsonservices/Server.js
@PURPOSE  : Inicializar o servidor Express, carregar variáveis
            de ambiente e registrar as rotas principais.
@LAST_EDIT : 2022-05-19
** =======================================================
*/

require('dotenv').config()
const fs = require('fs')
const express = require('express')

/**
 * Instância principal da aplicação Express.
 * @type {import('express').Express}
 */
const server = express()

/**
 * Conjunto de rotas relacionadas a "profile".
 * @type {import('express').Router}
 */
const routeprofile = require('./routers/routeprofile.js')

/**
 * Porta TCP em que o servidor HTTP irá escutar.
 * @type {number}
 * @remarks Poderia ser obtida de process.env.PORT em ambientes de produção.
 */
const port = 3000

// Middleware para parsear JSON no corpo das requisições.
server.use(express.json())

// Registro do router principal de profiles.
server.use(routeprofile)

/**
 * Inicializa o listener HTTP na porta configurada.
 * @note O callback é executado apenas uma vez, quando o servidor começa a escutar.
 */
server.listen(port, () => {
    console.log(`Servidor comunicando pela porta ${port}`)
})
