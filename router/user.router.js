const router = require('express').Router();
const  User = require('./../controllers/user.controller');
const  validatorHaldler = require('./../middleware/validator.handler');
const {createUser,getId,UpdateUser} = require('./../validaitors/user.validaitor');
const ct = new User();

router.get('/',ct.getAll);
router.get('/:id',validatorHaldler(getId,'params'),ct.getById);
router.post('/create',validatorHaldler(createUser,'body'),ct.create);
router.put('/update/:id',validatorHaldler(getId,'params'),validatorHaldler(UpdateUser,'body'),ct.update);
router.delete('/delete',validatorHaldler(getId,'body'),ct.delete);



module.exports = router;

