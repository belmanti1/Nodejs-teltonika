const express= require('express');
const route=express.Router()


const services = require("../services/streamRender.js");
const controller=require('../controllers/streamController.js')
/**
 * @description Root Route
 * @method GET
 */
route.get('/lister_stream',services.homeStream);
/**
 * @description Root Route
 * @method GET /add-stream
 */

route.get('/add_stream',services.add_stream);
/**
 * @description Root Route
 * @method GET /update-stream
 */
route.get('/update_stream',services.update_stream);

// API
route.post('/api/streams',controller.create)
route.get('/api/streams',controller.find)
route.put('/api/streams/:id',controller.update)
route.delete('/api/streams/:id',controller.delete)
module.exports=route;
