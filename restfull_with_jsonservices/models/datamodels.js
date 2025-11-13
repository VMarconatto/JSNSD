/**
** =======================================================
@SECTION  : Data Layer — Profiles JSON Store
@FILE     : JSNSD/restfull_with_jsonservices/models/datamodels.js
@PURPOSE  : Implementar operações de persistência em arquivo JSON
            para leitura, gravação, criação e remoção de perfis.
@LAST_EDIT : 2022-05-19
** =======================================================
*/

const fs = require('fs')

/**
 * Carrega todos os profiles a partir do arquivo `profiles.json`.
 *
 * @async
 * @returns {Promise<Array<Object>>} Lista de perfis carregados, ou array vazio em caso de erro.
 * @note Usa `fs.readFileSync` internamente, encapsulado em uma função async apenas para padronizar a API.
 */
const loadFiles = async () => {
    try {
        const profilesjson = await fs.readFileSync('./profiles.json', { encoding: 'utf-8', flag: 'r' })
        const profiles = profilesjson.toString()
        return JSON.parse(profiles)
    }
    catch (e) {
        return []
    }
}

/**
 * Lê e filtra profiles pelo nome informado.
 *
 * @async
 * @param {string} name - Nome do profile a ser buscado.
 * @returns {Promise<Array<Object>>} Lista de profiles cujo campo `name` coincide com o parâmetro.
 * @remarks O retorno é um array, permitindo múltiplos perfis com o mesmo nome.
 */
const readProfile = async (name) => {

    const read = await loadFiles()
    const object = Object.values(read)
    const readprofile = object.filter((profile) => profile.name === name)

    return readprofile
}

/**
 * Cria um novo profile e persiste no arquivo JSON.
 *
 * @async
 * @param {Object} profile - Objeto de profile a ser criado.
 * @returns {Promise<Object|undefined>} O profile criado em caso de sucesso, ou `undefined` em caso de erro/duplicidade.
 * @remarks A função evita criar um profile se já existir um com o mesmo nome.
 */
const createProfile = async function (profile) {

    const profiles = await loadFiles()
    const object = Object.values(profiles)
    const isvalidOperation = object.includes(profile.name)

    if (isvalidOperation) {
        console.log('Profile already exists')
        return
    }
    try {
        profiles.push(profile)
        saveProfile(profiles)
        return profile
    } catch (e) {
        console.log(e)
    }
}

/**
 * Persiste a lista de profiles no arquivo `profiles.json`.
 *
 * @param {Array<Object>} profiles - Lista de profiles a ser serializada e salva em disco.
 * @returns {void}
 * @note Sobrescreve completamente o conteúdo anterior do arquivo.
 */
const saveProfile = (profiles) => {

    const dataJson = JSON.stringify(profiles)
    try {
        fs.writeFileSync('./profiles.json', dataJson,)

    } catch (e) {
        console.log(e)
        return e
    }
}

/**
 * Remove um profile com base no nome informado.
 *
 * @async
 * @param {string} name - Nome do profile a ser removido.
 * @returns {Promise<Array<Object>>} Lista de profiles após a remoção.
 */
const deleteProfile = async (name) => {

    const files = await loadFiles()
    const profiles = await files.filter((profile) => { profile.name != name })
    saveProfile(profiles)
    return profiles
}

module.exports = { loadFiles, readProfile, createProfile, deleteProfile }
