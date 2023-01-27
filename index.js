require('dotenv/config');
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const app = express()
const port = process.env.PORT || 8080
const connectDatabase = require('./src/database')
const apiRoute = require('./src/api')

app.use(cors())
app.use(express.json());

app.use('/api', apiRoute)

app.listen(port, () => {
    console.log(`quick-client running on ${port}`);
    connectDatabase().then(() => console.log(`quick-client database connected`)).catch(() => console.log(`quick-client database connection failed`))
})