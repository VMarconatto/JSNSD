require('dotenv').config()
const express = require('express')
const axios = require('axios')

const router = express.Router()
//Env vars
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE
const City = process.env.WEATHER_CITY 
const Country = process.env.WEATHER_COUNTRY 

//URL CONNECT
const url = API_BASE_URL + City + Country + '&' + API_KEY_NAME + '=' + API_KEY_VALUE + '&units=metric'

router.get('/api',async (req, res) => {
    try {
        const response = await axios.get(url).then((data) => {
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
        if(e.response.status=='404'){
            console.log('Bad_Request')
            res.send('Bad_Request')
        }

    }
})

module.exports = router
