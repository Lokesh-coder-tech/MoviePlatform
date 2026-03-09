import "./styles/main.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Components & Pages
import Navbar from "./components/Common/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./components/Common/Footer";
import Dashboard from "./pages/Admin/Dashboard";
import AdminRoute from "./components/Common/AdminRoute";
import AddMovie from "./pages/Admin/AddMovies";
import EditMovie from "./pages/Admin/EditMovie";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* Auth Routes: Agar logged in hai toh home par bhej do */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          {/* Protected Routes: Sirf logged in users ke liye */}
          <Route
            path="/favorites"
            element={user ? <Favorites /> : <Navigate to="/login" />}
          />

          {/* 404 Page (Optional) */}
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", marginTop: "50px" }}>
                Page Not Found
              </h2>
            }
          />
          <Route
            path="/admin/add-movie"
            element={
              <AdminRoute>
                <AddMovie />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <AdminRoute>
                <EditMovie />
              </AdminRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
