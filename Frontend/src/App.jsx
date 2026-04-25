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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <Verify>
          <TodoProvider>
            <Dashboard />
          </TodoProvider>
        </Verify>
        } />
      <Route path="/tasks" element={
        <Verify>
          <TodoProvider>
            <Tasks />
          </TodoProvider>
        </Verify>
      } />
      </Routes>
    </ThemeProvider>
  );
}

export default App;