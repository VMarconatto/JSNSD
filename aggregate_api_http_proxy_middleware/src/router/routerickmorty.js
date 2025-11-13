/**
** =======================================================
@SECTION  : Router — Rick & Morty Aggregation
@FILE     : JSNSD/aggregate_api_http_proxy_middleware/src/router/routerickmorty.js
@PURPOSE  : Definir rota que agrega dados específicos da API
            Rick & Morty utilizando axios.
@LAST_EDIT : 2022-05-19
** =======================================================
*/

const express = require('express')
const axios = require('axios')

/**
 * Instância de router para endpoints de agregação.
 * @type {import('express').Router}
 */
const router = express.Router()

/**
 * URL utilizada para requisições via axios.
 *
 * @remarks
 *  Este valor ("localhost") é apenas ilustrativo — o lab utiliza o
 *  proxy reverso para resolver a URL verdadeira.
 *
 * @type {string}
 */
const url = 'localhost'

// ---------------------------------------------------------
//  GET /:id — Retorna dados do personagem pelo ID
// ---------------------------------------------------------

/**
 * Agrega dados da API Rick & Morty e retorna campos filtrados.
 *
 * @route GET /:id
 * @param {import('express').Request} req - Contém `req.params.id`.
 * @param {import('express').Response} res - Resposta JSON filtrada.
 * @param {Function} next - Middleware fallback.
 * @returns {Promise<void>}
 *
 * @note Este lab demonstra a extração de dados aninhados a partir
 *       de uma resposta JSON externa.
 */
router.get("/:id", async (req, res, next) => {

    try {
        const response = await axios.get(url, { id: req.params.id })
            .then((element) => res.json({
                name: element.data.results[req.params.id].name,
                status: element.data.results[req.params.id].status,
                species: element.data.results[req.params.id].species,
                location: element.data.results[req.params.id].location
            }))
    }
    catch (e) {
        if (e.response && e.response.status == '404') {
            console.log('Bad_Request')
            res.send('Bad_Request')
        }
        next()
    }
})

module.exports = router
