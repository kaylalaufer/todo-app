import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li>
      <span
        onClick={() => onToggle(todo._id)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer",
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo._id)}>Delete</button>
    </li>
  );
};

export default TodoItem;
