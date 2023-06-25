import express from 'express'
import APIController from '../controller/APIController'
let router = express.Router();

const initApiRoute = (app) => {
    router.get('/users', APIController.getAllUser)
    router.post('/create-user', APIController.createNewUser)
    router.put('/update-user/:id', APIController.updateUser)
    router.delete('/delete-user/:id', APIController.deleteUser)
    router.get('/user/:id', APIController.getOneUser)
    return app.use('/api/v1', router);
}

export default initApiRoute;