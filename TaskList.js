import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../features/tasksSlice";
import { Link } from "react-router-dom";

function TaskList() {
  const { tasks, status } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Task List</h2>
      <Link to="/add">Add New Task</Link>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.completed ? "Completed" : "Pending"}</p>
            <Link to={`/edit/${task.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
