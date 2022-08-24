const router = require('express').Router();
const  Store = require('./../controllers/product.controller');
const  validatorHaldler = require('./../middleware/validator.handler');
const {createProduct ,getId,UpdateProduct ,getUserId} = require('./../validaitors/product.validaitor');
const ct = new Store();

router.get('/',ct.getAll);
router.get('/me',validatorHaldler(getUserId,'body'),ct.getmeAll);
router.post('/alone',validatorHaldler(getUserId,'body'),ct.getById);
router.post('/stores',validatorHaldler(getUserId,'body'),ct.getByIdStore);
router.post('/create',validatorHaldler(createProduct,'body'),ct.create);
router.put('/update/:id',validatorHaldler(getId,'params'),validatorHaldler(UpdateProduct,'body'),ct.update);
router.delete('/delete',validatorHaldler(getId,'body'),ct.delete);

module.exports = router;