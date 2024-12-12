import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskForm({ task, onSubmit }) {
  const [title, setTitle] = useState(task?.title || "");
  const [completed, setCompleted] = useState(task?.completed || false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...task, title, completed });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label>Status:</label>
      <select
        value={completed}
        onChange={(e) => setCompleted(e.target.value === "true")}
      >
        <option value="false">Pending</option>
        <option value="true">Completed</option>
      </select>
      <button type="submit">Save Task</button>
    </form>
  );
}

export default TaskForm;
