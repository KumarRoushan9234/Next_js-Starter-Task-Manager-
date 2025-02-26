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
import Navbar from "../components/Navbar"; 
export default function Home() {
  return (
    <div>
      <Navbar/>
      <TaskList />
    </div>
  );
}