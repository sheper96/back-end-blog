const express = require('express');

const router = express.Router();
const authController = require('../controllers/auth');
const { authenticate } = require('../middleware/authMiddleware')
const {validateRequest} = require('../middleware/validateRequest')
const registerSchema = require('../validators/authValidators')

router.post('/login', authController.signIn)
router.post('/register', validateRequest(registerSchema), authController.createUser)
router.get('/users', authenticate, authController.getAllUsers)
router.get('/me', authController.authMe)
router.delete('/users', authController.deleteUser)
router.put('/users', authController.updateUserPassword)


module.exports = router;