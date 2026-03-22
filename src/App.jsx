import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/CreateAccount";
import AdminDashboard from "./pages/AdminDashboard";
import Result from "./pages/Result";
import AdminResponses from "./pages/AdminResponses";
import AdminQuestionInsights from "./pages/AdminQuestionInsights";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/result/:category" element={<Result />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/responses" element={<AdminResponses />} />
        <Route path="/admin/question-insights" element={<AdminQuestionInsights />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;