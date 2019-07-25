require('dotenv').config()
const express = require('express')
const massive = require('massive')
const app = express()
const {SERVER_PORT, CONNECTION_STRING} = process.env
const ctrl = require('./products_controller')

app.use(express.json())

app.get('/api/products/:id', ctrl.getOne)
app.get('/api/products', ctrl.getAll)
app.put('/api/products/:id', ctrl.update)
app.post('/api/products', ctrl.create)
app.delete('/api/products/:id', ctrl.delete)

massive(CONNECTION_STRING)
.then((database) => {
    app.set('db', database)
    app.listen(SERVER_PORT, () => console.log(`Powerman ${SERVER_PORT}`))
})
.catch(err => console.log(err))