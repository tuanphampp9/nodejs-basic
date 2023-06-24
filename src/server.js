import express from 'express'
import configViewEngine from './configs/viewEngine';
import 'dotenv/config'
const path = require('path');
const app = express()
const port = process.env.PORT;
configViewEngine(app);
app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/about', (req, res) => {
    res.send('Tuan day, hello');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})