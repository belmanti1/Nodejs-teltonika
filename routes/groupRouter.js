const express= require('express');
const route=express.Router()


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

route.get('/add_group',services.add_group);
/**
 * @description Root Route
 * @method GET /update-group
 */
route.get('/update_group',services.update_group);

// API
route.post('/api/groupes',controller.create)
route.get('/api/groupes',controller.find)
route.put('/api/groupes/:id',controller.update)
route.delete('/api/groupes/:id',controller.delete)
module.exports=route;
