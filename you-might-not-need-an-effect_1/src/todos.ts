let nextId = 0;
type TTodo = {
  id: number,
  text: string,
  completed: boolean
}
export function createTodo(text: string, completed = false) {
  return {
    id: nextId++,
    text,
    completed
  };
}

export const initialTodos: Array<TTodo> = [
  createTodo('Get apples', true),
  createTodo('Get oranges', true),
  createTodo('Get carrots'),
];
