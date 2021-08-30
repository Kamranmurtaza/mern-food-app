const express = require('express');
const { validate } = require('../middlewares/validator');
const { getCart, editCart } = require('../controllers/cart');
const { auth, permit } = require('../middlewares/auth');
const { BUYER } = require('../constants/user-types');
const { cartSchema } = require('../validations/cart');
const router = express.Router({ mergeParams: true });

router.get('/:cartId', auth, permit(BUYER), getCart);
router.patch('/', validate(cartSchema), auth, permit(BUYER), editCart);

module.exports = router;
