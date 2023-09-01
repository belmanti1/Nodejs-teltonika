const express= require('express');
const route=express.Router()
const { ensureAuthenticated } = require('../config/checkAuth')


const services = require("../services/canalRender.js");
const controller=require('../controllers/canalController.js')
/**
 * @description Root Route
 * @method GET
 */
route.get('/lister_canal',ensureAuthenticated,services.lister_canal);
/**
 * @description Root Route
 * @method GET /add-canal
 */

route.get('/add_canal',ensureAuthenticated,services.add_canal);
/**
 * @description Root Route
 * @method GET /update-canal
 */
route.get('/update_canal',ensureAuthenticated,services.update_canal);
/**
 * @description Root Route
 * @method GET
 */
route.get('/start_tcp_server',controller.startTCPServer);
/**
 * @description Root Route
 * @method GET
 */
route.get('/stop_tcp_server',controller.stopTCPServer);

/**
 * @description Root Route
 * @method GET
 */

route.get('/admin/lister_canal',services.Adminlister_canal);
/**
 * @description Root Route
 * @method GET /Admin/add-canal
 */


route.get('/admin/add_canal',services.Adminadd_canal);
/**
 * @description Root Route
 * @method GET /Admin/update-canal
 */
route.get('/admin/update_canal',services.Adminupdate_canal);

// API

route.post('/api/canaux',controller.create)
route.get('/api/canaux',controller.find)
route.put('/api/canaux/:id',controller.update)
route.delete('/api/canaux/:id',controller.delete)

module.exports=route;
