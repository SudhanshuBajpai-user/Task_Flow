import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Verify from "./components/Verify"
import Dashboard from "./pages/dashboard";
import { TodoProvider } from "./context/listContext";
import Tasks from "./pages/tasks";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Verify />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<TodoProvider>
        <Dashboard />
      </TodoProvider>} />
      <Route path="/tasks" element={<TodoProvider>
        <Tasks />
      </TodoProvider>} />

      </Routes>
    </ThemeProvider>
  );
}

export default App;