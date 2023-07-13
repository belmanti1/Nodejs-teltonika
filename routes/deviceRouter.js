const express= require('express');
const route=express.Router()


const services = require("../services/deviceRender.js");
const controller=require('../controllers/deviceController.js')
/**
 * @description Root Route
 * @method GET
 */
route.get('/add-device',services.home);
/**
 * @description Root Route
 * @method GET
 */


route.get('/lister-device',services.lister_device);
/**
 * @description Root Route
 * @method GET /update-user
 */
route.get('/update-device',services.update_device);

// API
route.post('/api/devices',controller.create)
route.get('/api/devices',controller.find)
route.put('/api/devices/:id',controller.update)
route.delete('/api/devices/:id',controller.delete)
module.exports=route;
