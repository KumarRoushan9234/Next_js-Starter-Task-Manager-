import { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineCheckCircle } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/TaskList.module.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage on app start
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (!text.trim()) return toast.error("Task cannot be empty!");

    const newTask = { id: Date.now(), text, completed: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    toast.success("Task added!");
  };

  const toggleTaskCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
    toast.success("Task updated!");
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task deleted!");
  };

  return (
    <div className={styles.taskContainer}>
      <Toaster />
      <h2>Task Manager ✅</h2>

      {/* Add Task Input */}
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
            <span onClick={() => toggleTaskCompletion(task.id)}>{task.text}</span>
            <div className={styles.icons}>
              <AiOutlineDelete onClick={() => deleteTask(task.id)} className={styles.deleteIcon} />
              <AiOutlineCheckCircle onClick={() => toggleTaskCompletion(task.id)} className={styles.completeIcon} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
