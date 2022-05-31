require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const {SERVER_PORT} = process.env
const {seed, getCountries, getCities, createCity, deleteCity, getCity} = require('./controller.js')

app.use(express.json())
app.use(cors())
app.use('/home/js', express.static(path.join(__dirname, '../public/home.js')))
app.use('/home/css', express.static(path.join(__dirname, '../public/home.css')))

app.use('/add/js', express.static(path.join(__dirname, '../public/add.js')))
app.use('/add/css', express.static(path.join(__dirname, '../public/add.css')))

app.get('/',  (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home.html'))
})

app.get('/add',  (req, res) => {
  res.sendFile(path.join(__dirname, '../public/add.html'))
})

// DEV
app.post('/seed', seed)

// COUNTRIES
app.get('/countries', getCountries)

// CITIES
app.post('/cities', createCity)
app.get('/cities', getCities)
app.get('/cities/:id', getCity)
app.delete('/cities/:id', deleteCity)

app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}`))
