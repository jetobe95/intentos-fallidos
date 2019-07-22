const express = require('express')
const app = express()
require('dotenv').config()

const mongodbConnection = require('./database/mongodb.connection')
const routes = require('./routes')
const port = process.env.PORT || 4000
/* 
    Middlewares
*/
app.use(express.json())


app.listen(port, () => console.log(`Server on port ${port}`))
mongodbConnection
    .then(() => {
        console.log('db connection success!');
    })
    .catch(error => console.log('connection fail!', error))

/**
 * Routes
 */
app.use('/api',routes)



