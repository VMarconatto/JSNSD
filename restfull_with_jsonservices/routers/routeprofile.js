/**
** =======================================================
@SECTION  : REST API — Profile Routes
@FILE     : JSNSD/restfull_with_jsonservices/routers/routeprofile.js
@PURPOSE  : Definir rotas REST para criação, leitura, listagem
            e remoção de perfis armazenados em arquivo JSON.
@LAST_EDIT : 2022-05-19
** =======================================================
*/

const express = require('express')

/**
 * Router principal para operações relacionadas a profiles.
 * @type {import('express').Router}
 */
const route = express.Router()

const {
    loadFiles,
    readProfile,
    deleteProfile,
    createProfile
} = require('../models/datamodels.js')

/**
 * Cria um novo profile.
 *
 * @route POST /post
 * @param {import('express').Request} req - Requisição HTTP contendo o profile em `req.body`.
 * @param {import('express').Response} res - Resposta HTTP para envio do resultado.
 * @returns {Promise<void>}
 * @remarks Em caso de sucesso, retorna o próprio objeto de profile com status 200.
 */
route.post('/post', async (req, res) => {
    const profile = new Object(req.body)
    console.log(profile)
    try {
        await createProfile(profile)
        res.status(200).send(profile)
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

/**
 * Busca um único profile com base no campo `name` enviado no corpo.
 *
 * @route GET /profile
 * @param {import('express').Request} req - Requisição HTTP com `req.body.name` definindo o nome do profile.
 * @param {import('express').Response} res - Resposta HTTP com o profile encontrado (array filtrado).
 * @returns {Promise<void>}
 * @note O filtro é feito no backend; o retorno é um array (mesmo que haja apenas um match).
 */
route.get('/profile', async (req, res) => {
    const profile = await readProfile(req.body.name)
    console.log(profile)
    res.send(profile)
})

/**
 * Retorna todos os profiles existentes.
 *
 * @route GET /profiles
 * @param {import('express').Request} req - Requisição HTTP (sem parâmetros específicos).
 * @param {import('express').Response} res - Resposta HTTP com a lista de profiles.
 * @returns {Promise<void>}
 */
route.get('/profiles', async (req, res) => {
    const profiles = await loadFiles()
    res.send(profiles)
})

/**
 * Remove um profile com base no campo `name` enviado no corpo.
 *
 * @route DELETE /profile/delete
 * @param {import('express').Request} req - Requisição HTTP com `req.body.name` indicando o profile a ser excluído.
 * @param {import('express').Response} res - Resposta HTTP com a lista atualizada de profiles.
 * @returns {Promise<void>}
 */
route.delete('/profile/delete', async (req, res) => {
    const profiles = await deleteProfile(req.body.name)
    res.status(200).send(profiles)
})

module.exports = route
