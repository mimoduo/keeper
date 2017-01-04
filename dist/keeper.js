'use strict';

var Keeper = function () {

  /* Shortcut for selecting an element */
  var el = function el(className) {
    var newEl = document.querySelector(className);

    return newEl;
  };

  /* Shortcut for creating a new element */
  var newEl = function newEl(type, className) {
    var newEl = document.createElement(type);
    newEl.classList.add(className);

    return newEl;
  };

  /* Variables scoped to Keeper */
  var db = new PouchDB('todos');

  var todos = el('.todos');

  /* Initialize Keeper */
  var init = function init() {
    console.log(todos);
  };

  /* Add a todo to the database */
  var addTodo = function addTodo(text) {
    var todo = {
      _id: new Date().toISOString(),
      title: text,
      completed: false
    };

    db.put(todo, function callback(err, res) {
      if (!err) console.log('Successfully posted a todo');
    });
  };

  /* Remove a todo from the database */
  var removeTodo = function removeTodo() {};

  /* Edit a todo in the database */
  var editTodo = function editTodo() {};

  return {
    init: init
  };
}();