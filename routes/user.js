const { Router } = require ('express');
const { check } = require ('express-validator');
const {getUser,
    postUser, 
    deleteUser, 
    putUser, 
    patchUser} = require('../controllers/user');
const { validateField } = require('../middleware/validateField');
const { isValidRole, mailExist, existUserById } = require('../helpers/db-validators');


const router = Router();

            router.get('/', getUser)

            router.put('/:id',
            
            check('id', 'Invalid ID').isMongoId(),
            check('id').custom( existUserById ),
            check('role').custom( isValidRole ),
            validateField,
            putUser)

            router.post('/',[
                check('name','name required').not().isEmpty(),
                check('password','length password must be 8 character').isLength({ min: 8}),
                check('email').custom( mailExist ),
                // check('role','role invalid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
                check('role').custom( isValidRole ),
                validateField
            ], postUser)

            router.delete('/:id', [
                 check('id', 'Invalid ID').isMongoId(),
                 check('id').custom( existUserById ),
                 validateField
            ],deleteUser)

            router.patch('/', patchUser)



module.exports =  router;