import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { logout } from "../features/auth/authSlice";
import { fetchTasks, createTask, updateTask, deleteTask } from "../features/tasks/taskSlice";

export default function TaskList() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div style={{ width: 500, margin: "30px auto" }}>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <h2>Your Tasks</h2>

      <TaskForm onCreate={(task) => dispatch(createTask(task))} />

      {loading && <p>Loading...</p>}

      {list.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={(id, updates) => dispatch(updateTask({ id, updates }))}
          onDelete={(id) => dispatch(deleteTask(id))}
        />
      ))}
    </div>
  );
}
