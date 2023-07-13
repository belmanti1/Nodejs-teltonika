const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth')

//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('welcome');
});

//------------ Dashboard Route ------------//
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dash', {
    name: req.user.name
}));

//--------------- Dashboard Admin ------------------//
router.get('/dashadmin', (req, res) => res.render('dashadmin', {
    name: "administrateur"
}));



module.exports = router;