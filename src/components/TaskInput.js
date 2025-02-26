import { useState } from "react";

const TaskInput = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;

    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const newTask = await res.json();
    onAdd(newTask.text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New Task" />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskInput;
