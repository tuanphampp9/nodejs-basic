import express from 'express'
import homeController from '../controller/homeController'
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage)
    router.get('/detail/user/:userId', homeController.getDetailUser)
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/update-user/:id', homeController.updateUser)
    router.post('/save-user/:id', homeController.saveUser);
    router.get('/upload', homeController.uploadFile)
    router.post('/upload-profile-pic', homeController.handleFileUpload)
    return app.use('/', router);
}

export default initWebRoute;