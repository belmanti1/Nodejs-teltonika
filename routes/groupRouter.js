const express= require('express');
const route=express.Router()
const { ensureAuthenticated } = require('../config/checkAuth')


const services = require("../services/groupRender.js");
const controller=require('../controllers/groupController.js')
/**
 * @description Root Route
 * @method GET
 */
route.get('/lister_group',services.lister_group);
/**
 * @description Root Route
 * @method GET /add-group
 */

route.get('/add_group',ensureAuthenticated,services.add_group);
/**
 * @description Root Route
 * @method GET /update-group
 */
route.get('/update_group',ensureAuthenticated,services.update_group);
/**
 * @description Root Route
 * @method GET
 */
route.get('/admin/lister_group',services.Adminlister_group);
/**
 * @description Root Route
 * @method GET /add-group
 */

route.get('/admin/add_group',services.Adminadd_group);
/**
 * @description Root Route
 * @method GET /update-group
 */
route.get('/admin/update_group',services.Adminupdate_group);

// API
route.post('/api/groupes',controller.create)
route.get('/api/groupes',controller.find)
route.put('/api/groupes/:id',controller.update)
route.delete('/api/groupes/:id',controller.delete)
module.exports=route;
