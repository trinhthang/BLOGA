'use strict';
const index_Controller = require('../controller/')

module.exports = function(app) {
    app.route('/api/test').get(index_Controller.test); 
    app.route('/').get(index_Controller.home); 
}