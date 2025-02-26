// src/components/TaskList.js
import { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheckCircle } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/TaskList.module.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks([]); 
        }
      })
      .catch(() => setTasks([]));
  }, []);
  

  const addTask = async (text) => {
    if (!text.trim()) return toast.error("Task cannot be empty!");

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    toast.success("Task added!");
  };

  const toggleTaskCompletion = async (id, completed) => {
    await fetch("/api/tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, completed }),
    });

    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed } : task)));
    toast.success("Task updated!");
  };

  const deleteTask = async (id) => {
    await fetch("/api/tasks", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted!");
  };

  return (
    <div className={styles.taskContainer}>
      <Toaster />
      <h2>Task Manager ✅</h2>

      {/* Add Task */}
      <div className={styles.taskInput}>
        <input
          type="text"
          placeholder="Add a new task..."
          onKeyDown={(e) => e.key === "Enter" && addTask(e.target.value)}
        />
      </div>

      {/* Task List */}
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? styles.completedTask : styles.taskItem}>
            <span onClick={() => toggleTaskCompletion(task.id, !task.completed)}>
              {task.text}
            </span>
            <div className={styles.icons}>
              <AiOutlineDelete onClick={() => deleteTask(task.id)} className={styles.deleteIcon} />
              <AiOutlineCheckCircle
                onClick={() => toggleTaskCompletion(task.id, !task.completed)}
                className={styles.completeIcon}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
