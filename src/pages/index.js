// import TaskList from "../components/TaskList";
// import TaskInput from "../components/TaskInput";
// import { useState } from "react";

// export default function Home() {
//   const [tasks, setTasks] = useState([]);

//   const addTask = (text) => {
//     setTasks([...tasks, text]);
//   };

//   return (
//     <div>
//       <h1>Task Manager ✅</h1>
//       <TaskInput onAdd={addTask} />
//       <TaskList />
//     </div>
//   );
// }

import TaskList from "../components/TaskList"; 
export default function Home() {
  return (
    <div>
      <TaskList />
    </div>
  );
}