import { useState } from 'react';
import AddTodo from './AddTodo';
import TaskList from './TaskList';

type TTodo = {
  id: number,
  title: string,
  done: boolean
}

let nextId = 3;
const initialTodos: TTodo[] = [
  { id: 0, title: 'Buy milk', done: true },
  { id: 1, title: 'Eat tacos', done: false },
  { id: 2, title: 'Brew tea', done: false },
];

export default function TaskApp() {
  const [todos, setTodos] = useState(
    initialTodos
  );

  function handleAddTodo(title: string) {
    setTodos(
      [
        ...todos,
        {
          id: nextId++,
          title: title,
          done: false
        }
      ]
    )
  }

  function handleChangeTodo(changeTodo: TTodo) {
    setTodos(todos.map((todo) => {
      if (todo.id !== changeTodo.id) return todo;

      return changeTodo;
    }))
  }

  function handleDeleteTodo(todoId: number) {
    setTodos(todos.filter((todo) => {
      return todo.id !== todoId
    }))
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
