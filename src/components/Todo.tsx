import React, { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: number; 
}

function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState<string>('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const addTodo = () => {
    if (!todoName.trim()) return; 
    const newTodo: Todo = {
      id: Date.now(), 
      title: todoName,
      completed: false,
      createdAt: Date.now(), 
    };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoName('');
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const checkTodo = (id: number) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div className='h-full w-full flex justify-center items-center flex-col space-y-10'>
      <div className='p-4 flex flex-col space-y-2 text-black'>
        <div className='text-white text-xl p-2'>
          You can see my projects by clicking on the&nbsp;
          <a href='https://github.com/AnarNasibov85/next.js-todo-app' target='_blank' rel='noopener noreferrer'>
            <FaGithub />
          </a>
        </div>
        <textarea
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          className='p-4 rounded border border-solid border-gray-800'
          placeholder="Enter your todo here"
        />
        <button
          className='p-4 ml-4 bg-violet-700 rounded hover:bg-violet-900 text-white font-bold'
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <div className='flex flex-col w-full justify-center items-center'>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex justify-between items-center w-full my-2 bg-gray-600 p-4 bg-opacity-30 border border-solid border-gray-800 rounded ${todo.completed ? 'line-through' : ''}`}
          >
            <div className='flex flex-row items-center'>
              <input
                type='checkbox'
                checked={todo.completed}
                onChange={() => checkTodo(todo.id)}
                className='h-6 w-6 mr-2'
              />
              <div className='text-xl font-semibold'>
                {todo.title}
              </div>
            </div>
            <div className="text-sm text-gray-400">{new Date(todo.createdAt).toLocaleString()} </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className='bg-red-600 p-2 rounded hover:bg-red-800 text-white font-bold'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
