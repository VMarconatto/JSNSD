const fs = require('fs')

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
const readProfile = async (name) => {

    const read = await loadFiles()
    const object = Object.values(read)
    const readprofile = object.filter((profile) => profile.name === name)

    return readprofile
}
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
const saveProfile = (profiles) => {

    const dataJson = JSON.stringify(profiles)
    try {
        fs.writeFileSync('./profiles.json', dataJson,)

    } catch (e) {
        console.log(e)
        return e
    }
}

const deleteProfile = async (name) => {

    const files = await loadFiles()
    const profiles = await files.filter((profile) => { profile.name != name })
    saveProfile(profiles)
    return profiles
}

module.exports = { loadFiles, readProfile, createProfile, deleteProfile }

