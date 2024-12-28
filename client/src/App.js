import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get("http://localhost:5001/api/todos");
      setTodos(response.data);
    };
    fetchTodos();
  }, []);

  // Add a new todo
  const addTodo = async (text) => {
    const response = await axios.post("http://localhost:5001/api/todos", { text });
    setTodos([...todos, response.data]);
  };

  // Toggle completion status
  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t._id === id);
    const response = await axios.put(`http://localhost:5001/api/todos/${id}`, {
      completed: !todo.completed,
    });
    setTodos(
      todos.map((t) => (t._id === id ? { ...t, completed: response.data.completed } : t))
    );
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5001/api/todos/${id}`);
    setTodos(todos.filter((t) => t._id !== id));
  };

  return (
    <div className="App">
      <h1>To-Do App</h1>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
};

export default App;