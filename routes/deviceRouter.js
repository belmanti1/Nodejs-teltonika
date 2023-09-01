const express= require('express');
const route=express.Router()
const { ensureAuthenticated } = require('../config/checkAuth')


const services = require("../services/deviceRender.js");
const controller=require('../controllers/deviceController.js')




/**
 * @description Root Route
 * @method GET
 */
route.get('/add-device',ensureAuthenticated,services.home);
/**
 * @description Root Route
 * @method GET
 */


route.get('/lister-device',ensureAuthenticated,services.lister_device);

/**
 * @description Root Route
 * @method GET /update-device
 */
route.get('/update-device',ensureAuthenticated,services.update_device);
/**
 * @description Root Route
 * @method GET
 */
route.get('/admin/add-device',services.Adminhome);
/**
 * @description Root Route
 * @method GET
 */


route.get('/admin/lister-device',services.Adminlister_device);

/**
 * @description Root Route
 * @method GET /update-device
 */
route.get('/admin/update-device',services.Adminupdate_device);

// API
route.post('/api/devices',controller.create)
route.get('/api/devices',controller.find)
route.put('/api/devices/:id',controller.update)
route.delete('/api/devices/:id',controller.delete)
module.exports=route;
