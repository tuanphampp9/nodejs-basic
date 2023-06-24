import express from 'express'
import homeController from '../controller/homeController'
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/detail/user/:userId', homeController.getDetailUser)
    router.post('/create-new-user', homeController.createNewUser);
    router.get('/about', (req, res) => {
        res.send('Tuan day, hello');
    })
    return app.use('/', router);
}

export default initWebRoute;