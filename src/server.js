import express from 'express'
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import 'dotenv/config'
const path = require('path');
const app = express()
const port = process.env.PORT;
configViewEngine(app);
initWebRoute(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})