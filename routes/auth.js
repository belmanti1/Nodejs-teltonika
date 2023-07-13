const express = require('express');
const router = express.Router();
const services = require("../services/userRender.js");
const controller=require('../controllers/authController.js')
//------------ Importing Controllers ------------//
const authController = require('../controllers/authController')

//------------ Login Route -------------//
router.get('/login', (req, res) => res.render('login'));
//-------------LoginAdmin Route ----------//
router.get('/loginAdmin', (req, res) => res.render('loginadmin'));
//------------ Forgot Password Route ------------//
router.get('/forgot', (req, res) => res.render('forgot'));

//------------ Reset Password Route ------------//
router.get('/reset/:id', (req, res) => {
    // console.log(id)
    res.render('reset', { id: req.params.id })
});
//------------ Register Route ------------//
router.get('/register', (req, res) => res.render('register'));

//------------ Register POST Handle ------------//
router.post('/register', authController.registerHandle);

//------------ Email ACTIVATE Handle ------------//
router.get('/activate/:token', authController.activateHandle);

//------------ Forgot Password Handle ------------//
router.post('/forgot', authController.forgotPassword);

//------------ Reset Password Handle ------------//
router.post('/reset/:id', authController.resetPassword);

//------------ Reset Password Handle ------------//
router.get('/forgot/:token', authController.gotoReset);

//------------ Login POST Handle ------------//
router.post('/login', authController.loginHandle);
//------------ Login POST Handle ------------//
router.post('/loginadmin', authController.loginAdmin);

//------------ Logout GET Handle ------------//
router.get('/logout', authController.logoutHandle);

/**
 * @description Root Route
 * @method GET
 */
router.get('/lister_user',services.lister_user);
/**
 * @description Root Route
 * @method GET /add-canal
 */

router.get('/add_user',services.add_user);
/**
 * @description Root Route
 * @method GET /update-canal
 */
router.get('/update_user',services.update_user);

// API
router.post('/api/users',controller.create)
router.get('/api/users',controller.find)
router.put('/api/users/:id',controller.update)
router.delete('/api/users/:id',controller.delete)


module.exports = router;