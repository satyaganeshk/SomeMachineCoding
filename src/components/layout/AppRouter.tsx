import {Route, Routes} from "react-router-dom";
import TodoList from "../Apps/todoList";
import HomePage from "../Apps/HomePage";
import Dashboard from "../Apps/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./login";


const AppRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<HomePage />} />
        </Route>
    </Routes>
  );
}

export default AppRouter;
