const express = require('express')
const axios = require('axios')  
const router = express.Router()
const url = 'localhost'

router.get("/:id" , async (req, res,next) => {
    
    try {
        const response = await axios.get(url,{ id: req.params.id })
            .then((element)=>res.json({
                name:element.data.results[req.params.id].name,
                status:element.data.results[req.params.id].status,
                species:element.data.results[req.params.id].species,
                location:element.data.results[req.params.id].location
            }))
    }
    catch (e) {
        if(e.response.status=='404'){
            console.log('Bad_Request')
            res.send('Bad_Request')
        }
        next()
    }
})

module.exports = router