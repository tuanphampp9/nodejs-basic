import express from 'express'
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import initApiRoute from './route/api';
var morgan = require('morgan')
import 'dotenv/config'
const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT;
configViewEngine(app);
initWebRoute(app);
initApiRoute(app);

app.use((req, res) => {
    return res.render('pageNotFound.ejs');
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})