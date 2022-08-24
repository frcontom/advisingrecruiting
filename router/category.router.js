const router = require('express').Router();
const category = require('./../controllers/category.controller');
const  validatorHaldler = require('./../middleware/validator.handler');
const  categoryValidator = require('./../validaitors/categoty.validator');
const ct = new category();

router.get('/',ct.getAll);
router.post('/add',validatorHaldler(categoryValidator,'body'),ct.create);



module.exports = router;

