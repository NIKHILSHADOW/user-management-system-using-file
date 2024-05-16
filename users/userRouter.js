
const userService = require('./userService')
const express = require('express')

const userRouter = express.Router();

// userRouter.get('/', userService.getAllUsers)


userRouter
    .route('/')
    .get(userService.getAllUsers)
    .post(userService.addUser)


userRouter
    .route('/:id')
    .patch(userService.updateUserById)
    .get(userService.getUserById)
    .delete(userService.deleteUserById)


module.exports = userRouter