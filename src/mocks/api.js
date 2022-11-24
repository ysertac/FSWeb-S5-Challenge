const express = require('express')
const { konular, makaleler } = require('./data')
const cors = require('cors')

const api = express()

api.use(express.json())

api.use(cors())

api.get('/api/makaleler', (req, res) => {
  res.json(makaleler)
})

api.get('/api/konular', (req, res) => {
  res.json(konular)
})

api.listen(5001, () => {
  console.log('5001 dinleniyor')
})
