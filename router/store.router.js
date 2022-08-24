const router = require('express').Router();
const  Store = require('./../controllers/store.controller');
const  validatorHaldler = require('./../middleware/validator.handler');
const {createStore,getId,UpdateStore ,getUserId} = require('./../validaitors/store.validaitor');
const ct = new Store();

router.get('/',ct.getAll);
router.post('/alone',validatorHaldler(getUserId,'body'),ct.getById);
router.post('/create',validatorHaldler(createStore,'body'),ct.create);
router.put('/update/:id',validatorHaldler(getId,'params'),validatorHaldler(UpdateStore,'body'),ct.update);
router.delete('/delete',validatorHaldler(getId,'body'),ct.delete);

module.exports = router;