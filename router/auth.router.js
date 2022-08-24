const router = require('express').Router();
const  Store = require('./../controllers/authController');
const  validatorHaldler = require('./../middleware/validator.handler');
const {authUser} = require('./../validaitors/auth.validaitor');
const ct = new Store();

router.post('/',validatorHaldler(authUser,'body'),ct.auth);

module.exports = router;