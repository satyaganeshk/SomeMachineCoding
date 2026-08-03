import {Route, Routes} from "react-router-dom";
import TodoList from "../Apps/todoList";
import HomePage from "../Apps/HomePage";
import Dashboard from "../Apps/Dashboard";

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/todoList" element={<TodoList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default AppRouter;