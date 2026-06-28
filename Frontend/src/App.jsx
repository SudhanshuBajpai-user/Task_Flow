import { Routes, Route } from "react-router-dom";

import Signup from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Tasks from "./pages/tasks";
import Profile from "./pages/profile";
import VerifyEmail from "./pages/verifyEmail";
import Verifying from "./pages/verifying";

import Verify from "./components/Verify";

import { ThemeProvider } from "./context/ThemeContext";
import { TodoProvider } from "./context/listContext";
import { ProfileProvider } from "./context/userContext";


function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <ProfileProvider>

          <Routes>
            <Route path="/signup" element={<Signup />} />

            <Route path="/login" element={<Login />} />

            <Route path="/verify-email" element={<VerifyEmail />} />

            <Route
              path="/verify-email/:token"
              element={<Verifying />}
            />

            <Route
              path="/"
              element={
                <Verify>
                  <Dashboard />
                </Verify>
              }
            />

            <Route
              path="/tasks"
              element={
                <Verify>
                  <Tasks />
                </Verify>
              }
            />

            <Route
              path="/profile"
              element={
                <Verify>
                  <Profile />
                </Verify>
              }
            />
          </Routes>
        </ProfileProvider>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;