const express = require('express')
const route = express.Router()
const { loadFiles,readProfile,deleteProfile,createProfile } = require('../models/datamodels.js')

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
}
)

route.get('/profile', async (req, res) => {
    const profile = await readProfile(req.body.name)
    console.log(profile)
    res.send(profile)
})

route.get('/profiles', async (req, res) => {
    const profiles = await loadFiles()
    res.send(profiles)
})

route.delete('/profile/delete',async (req,res)=>{
    const profiles = await deleteProfile(req.body.name)
    res.status(200).send(profiles)
})


module.exports = route
