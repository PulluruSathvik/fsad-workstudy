import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import Hours from "./pages/Hours";
import Admin from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";

/* ================= PROTECTED ROUTE ================= */

function Protected({ children, role }) {

  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/student"} replace />;
  }

  return children;
}

/* ================= LAYOUT ================= */

function Layout({ children }) {

  const loc = useLocation();
  const hide = loc.pathname === "/login" || loc.pathname === "/register";

  return (
    <>
      {!hide && <Navbar />}
      <div className="container">{children}</div>
    </>
  );
}

/* ================= MAIN APP ================= */

export default function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* Landing */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* STUDENT */}
        <Route
          path="/student"
          element={
            <Protected role="student">
              <Layout>
                <StudentDashboard />
              </Layout>
            </Protected>
          }
        />

        <Route
          path="/jobs"
          element={
            <Protected role="student">
              <Layout>
                <Jobs />
              </Layout>
            </Protected>
          }
        />

        <Route
          path="/hours"
          element={
            <Protected role="student">
              <Layout>
                <Hours />
              </Layout>
            </Protected>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <Protected role="admin">
              <Layout>
                <Admin />
              </Layout>
            </Protected>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />

      </Routes>

    </BrowserRouter>
  );
}
