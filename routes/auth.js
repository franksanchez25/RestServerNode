const { Router } = require ('express');
const { check } = require ('express-validator');

const { validateToken } = require('../middleware/validateToken');

const { login } = require('../controllers/auth');
const { validateField } = require('../middleware/validateField');



const router = Router();

      router.post('/login',[
        
        check('email','must be a valid email').isEmail(),
        check('password', 'password required').not().isEmpty(),
        validateField
      ], login)







module.exports = router;