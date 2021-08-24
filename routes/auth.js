const express = require('express');
const authController = require('../controllers/auth');
const { validate } = require('../middlewares/validator');
const { registerSchema, loginSchema } = require('../validations/auth');
const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
