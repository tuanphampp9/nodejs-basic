import express from 'express'
import configViewEngine from './configs/viewEngine';
import initWebRoute from './route/web';
import 'dotenv/config'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = process.env.PORT;
configViewEngine(app);
initWebRoute(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})