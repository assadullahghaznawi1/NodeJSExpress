'use strict';
module.exports = function(app) {
  var agenda = require('../controllers/agenda.controller');
  var verified = require("../middleware/authorization.js");
  // todoList Routes

  app.use('/tasks' , verified);
  app.route('/').get(agenda.default_response);

  app.route('/tasks')
    .get(agenda.list_all_tasks)
    .post(agenda.create_a_task);


  app.route('/tasks/:taskId')
    .get(agenda.read_a_task)
    .put(agenda.update_a_task)
    .delete(agenda.delete_a_task);

    app.route('/login').put(shoppingList.login);

    app.route('/signup').put(shoppingList.create_a_task_signup);

    app.route('/allLogin').get(shoppingList.list_all_login);
};