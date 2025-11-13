/**
** =======================================================
@SECTION  : REST API — External Weather Proxy Route
@FILE     : JSNSD/mitigating_attacks_DDoS/src/routers/router.js
@PURPOSE  : Definir rota que faz proxy para API externa de clima
            (como OpenWeather), retornando apenas os dados
            necessários ao cliente, enquanto mantém segurança
            de chaves via .env.
@LAST_EDIT : 2022-05-19
** =======================================================
*/

require('dotenv').config()
const express = require('express')
const axios = require('axios')

/**
 * Instância de router para rotas relacionadas à API externa.
 * @type {import('express').Router}
 */
const router = express.Router()

// ---------------------------------------------------------
//  Variáveis de Ambiente
// ---------------------------------------------------------

/**
 * URL base da API externa do clima.
 * @type {string}
 */
const API_BASE_URL = process.env.API_BASE_URL

/**
 * Nome do parâmetro de chave da API (ex.: "appid").
 * @type {string}
 */
const API_KEY_NAME = process.env.API_KEY_NAME

/**
 * Valor da chave da API.
 * @type {string}
 * @note Deve ser mantido em segredo (.env).
 */
const API_KEY_VALUE = process.env.API_KEY_VALUE

/**
 * Cidade alvo da consulta de clima.
 * @type {string}
 */
const City = process.env.WEATHER_CITY

/**
 * País alvo da consulta.
 * @type {string}
 */
const Country = process.env.WEATHER_COUNTRY

// ---------------------------------------------------------
//  Montagem da URL final de requisição
// ---------------------------------------------------------

/**
 * URL final para consulta à API externa.
 * @type {string}
 * @remarks Exemplo: https://api.openweathermap.org/data/2.5/weather?q=London,UK&appid=XYZ&units=metric
 */
const url = API_BASE_URL + City + Country + '&' + API_KEY_NAME + '=' + API_KEY_VALUE + '&units=metric'

// ---------------------------------------------------------
//  Rota: GET /api — Proxy seguro para a API de clima
// ---------------------------------------------------------

/**
 * Rota que retorna dados climáticos consumidos via axios.
 *
 * @route GET /api
 * @param {import('express').Request} req - Requisição do cliente.
 * @param {import('express').Response} res - Resposta contendo dados filtrados.
 * @returns {Promise<void>}
 */
router.get('/api', async (req, res) => {
    try {
        await axios.get(url).then((data) => {
            res.json({
                temp: data.data.main.temp,
                feels_like: data.data.main.feels_like,
                temp_min: data.data.main.temp_min,
                temp_max: data.data.main.temp_max,
                pressure: data.data.main.pressure,
                humidity: data.data.main.humidity
            })
        })
    }
    catch (e) {
        if (e.response && e.response.status == '404') {
            console.log('Bad_Request')
            res.send('Bad_Request')
        }
    }
})

module.exports = router
