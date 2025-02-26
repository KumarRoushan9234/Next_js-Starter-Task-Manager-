import { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheckCircle } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import styles from "../styles/TaskList.module.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // Default: Show all tasks
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const getTimeLeft = (deadline) => {
    const now = new Date();
    const targetTime = new Date(deadline);
    const diff = targetTime - now;
    if (diff <= 0) return "Expired";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${hours}h ${minutes}m left`;
  };

  const addTask = () => {
    if (!newTaskText.trim()) return toast.error("Task cannot be empty!");
    const creationDate = new Date().toISOString();
    const deadline = new Date();
    deadline.setHours(deadline.getHours() + 5); // Default: 5 hours from now
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      createdAt: creationDate,
      deadline: deadline.toISOString(),
    };
    setTasks([...tasks, newTask]);
    setNewTaskText(""); // Clear input
    toast.success("Task added!");
  };

  const editTask = (id) => {
    setEditTaskId(id);
    const taskToEdit = tasks.find((task) => task.id === id);
    setEditText(taskToEdit.text);
  };

  const saveEditTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editText } : task)));
    setEditTaskId(null);
    toast.success("Task updated!");
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    toast.success("Task updated!");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast.success("Task deleted!");
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "remaining") return !task.completed;
    return true; // "all" filter shows everything
  });

  return (
    <div className={styles.taskContainer}>
      <Toaster position="top-right" />
      <h2>Task Manager ✅</h2>

      {/* Add Task Input */}
      <div className={styles.taskInput}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
      </div>

      {/* Task Filters */}
      <div className={styles.filters}>
        <button onClick={() => setFilter("all")} className={filter === "all" ? styles.activeFilter : ""}>All</button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? styles.activeFilter : ""}>Completed</button>
        <button onClick={() => setFilter("remaining")} className={filter === "remaining" ? styles.activeFilter : ""}>Remaining</button>
      </div>

      {/* Task List */}
      <ul className={styles.taskList}>
        {filteredTasks.length === 0 ? (
          <p>No tasks to show.</p>
        ) : (
          filteredTasks.map((task) => (
            <li key={task.id} className={task.completed ? styles.completedTask : styles.taskItem}>
              {editTaskId === task.id ? (
                <>
                  <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                  <button onClick={() => saveEditTask(task.id)}>Save</button>
                </>
              ) : (
                <>
                  <div>
                    <strong>{task.text}</strong> <br />
                    <small>Created: {new Date(task.createdAt).toLocaleString()}</small> <br />
                    <small>Deadline: {new Date(task.deadline).toLocaleString()}</small> <br />
                    <small>⏳ {getTimeLeft(task.deadline)}</small>
                  </div>
                  <div className={styles.icons}>
                    <AiOutlineEdit onClick={() => editTask(task.id)} className={styles.editIcon} />
                    <AiOutlineDelete onClick={() => deleteTask(task.id)} className={styles.deleteIcon} />
                    <AiOutlineCheckCircle onClick={() => toggleTaskCompletion(task.id)} className={styles.completeIcon} />
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
