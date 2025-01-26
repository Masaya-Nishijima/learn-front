import { useState } from 'react';
import { useImmer } from 'use-immer';
import AddTodo from './AddTodo';
import TaskList from './TaskList';

let nextId = 3;
const initialTodos = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, updateTodos] = useImmer(
    initialTodos
  );

  function handleAddTodo(title) {
    updateTodos((draftTodos) => {
      draftTodos.push({
        id: nextId++,
        title: title,
        done: false
      })
    }
    )
  }

  function handleChangeTodo(nextTodo) {
    updateTodos((draftTodos) => {
      const todo = draftTodos.find(t =>
        t.id === nextTodo.id
      );
      todo.title = nextTodo.title;
      todo.done = nextTodo.done;
    })
  }

  function handleDeleteTodo(todoId) {
    updateTodos((draftTodos) => {
      const index = draftTodos.findIndex(t =>
        t.id === todoId
      );
      draftTodos.splice(index, 1);
    })
  }

  return (
    <>
      <AddTodo
        onAddTodo={handleAddTodo}
      />
      <TaskList
        todos={todos}
        onChangeTodo={handleChangeTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </>
  );
}
