const express= require('express');
const route=express.Router()
const { ensureAuthenticated } = require('../config/checkAuth')


const services = require("../services/streamRender.js");
const controller=require('../controllers/streamController.js')
/**
 * @description Root Route
 * @method GET /lister-stream
 */
route.get('/lister_stream',services.log);
/**
 * @description Root Route
 * @method GET /admin/lister-stream
 */
route.get('/admin/lister_stream',services.Adminlog);
/**
 * @description Root Route
 * @method GET /admin/lister-stream
 */
route.get('/add_stream',services.add_stream);
// API
route.post('/api/streams',controller.create);
//route.get('/api/streams',controller.find)
route.get('/api/streams/:id',controller.find);
route.get('/api/streams',controller.findAll);
//route.put('/api/streams/:id',controller.update)
//route.delete('/api/streams/:id',controller.delete)
module.exports=route;
