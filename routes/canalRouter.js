const express= require('express');
const route=express.Router()


const services = require("../services/canalRender.js");
const controller=require('../controllers/canalController.js')
/**
 * @description Root Route
 * @method GET
 */
route.get('/lister_canal',services.lister_canal);
/**
 * @description Root Route
 * @method GET /add-canal
 */

route.get('/add_canal',services.add_canal);
/**
 * @description Root Route
 * @method GET /update-canal
 */
route.get('/update_canal',services.update_canal);

// API
route.post('/api/canaux',controller.create)
route.get('/api/canaux',controller.find)
route.put('/api/canaux/:id',controller.update)
route.delete('/api/canaux/:id',controller.delete)
module.exports=route;
