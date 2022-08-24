const router = require('express').Router();
const  User = require('./../controllers/user.controller');
const  validatorHaldler = require('./../middleware/validator.handler');
const {getId,UpdateUser} = require('./../validaitors/user.validaitor');
const ct = new User();

router.get('/:id',validatorHaldler(getId,'params'),ct.getById);
router.put('/update/:id',validatorHaldler(getId,'params'),validatorHaldler(UpdateUser,'body'),ct.update);

module.exports = router;

