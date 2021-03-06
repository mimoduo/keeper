var Keeper = (function() {

  /* Shortcut for selecting an element */
  var el = function(className) {
    var newEl = document.querySelector(className);

    return newEl;
  }

  /* Shortcut for creating a new element */
  var newEl = function(type, className) {
    var newEl = document.createElement(type);
    newEl.classList.add(className);

    return newEl;
  }

  /* Variables scoped to Keeper */
  var db = new PouchDB('todos');

  var todos = el('.todo-tool');
  var todosList = el('.todos-list');

  /* Initialize Keeper */
  var init = function() {
    db.changes({
      since: 'now',
      live: true
    }).on('change', showTodos);

    createEntryField();
  };

  /* Create the first entry field to enter in todos */
  var createEntryField = function() {
    var entryContainer = newEl('div', 'todo-entry');
    todos.appendChild(entryContainer);

    var entry = newEl('input', 'todo-entry-input');
    entry.type = 'text';
    entry.placeholder = 'Enter a todo';
    entry.addEventListener('keypress', entryKeypress.bind(null, entry));

    var confirmation = newEl('button', 'todo-entry-confirmation');
    confirmation.innerHTML = "Confirm Todo";
    confirmation.addEventListener('click', confirmClick.bind(null, entry));

    entryContainer.appendChild(entry);
    entryContainer.appendChild(confirmation);
  };

  var entryKeypress = function(entry, event) {
    if(event.keyCode == 13) {
      addTodo(entry.value);
      clearValue(entry);
    }
  };

  var confirmClick = function(entry) {
    addTodo(entry.value);
    clearValue(entry);
  }

  var clearValue = function(entry) {
    entry.value = '';
  };

  /* Add a todo to the database */
  var addTodo = function(text) {
    var todo = {
      _id: new Date().toISOString(),
      title: text,
      completed: false
    }

    db.put(todo, function callback(err, res) {
      if(!err) console.log('Successfully posted todo: ' + todo.title);
    });
  };

  /* Remove a todo from the database */
  var removeTodo = function(todo) {
    db.remove(todo);
  };

  /* Edit a todo in the database */
  var editTodo = function(todo) {};

  /* Grab all todos from the database */
  var showTodos = function() {
    db.allDocs({
      include_docs: true,
      descending: true
    }, function(err, doc) {
      redrawTodosUI(doc.rows);
    });
  };

  /* Create a Todo List */
  var redrawTodosUI = function(todos) {
    todosList.innerHTML = '';

    todos.forEach(function(todo) {
      createTodo(todo.doc);
    });
  };

  var createTodo = function(todo) {
    var todoItem = newEl('div', 'todo-item');

    var title = newEl('h4', 'todo-title');
    title.innerHTML = todo.title;
    todoItem.appendChild(title);

    var del = newEl('button', 'todo-delete');
    del.innerHTML = 'Delete Todo';
    del.addEventListener('click', removeTodo.bind(null, todo), false);
    todoItem.appendChild(del);

    todosList.appendChild(todoItem);
  };

  showTodos();

  return {
    init: init
  };

})();
