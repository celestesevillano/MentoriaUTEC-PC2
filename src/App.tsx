import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./pages/LoginPage";
//import RegisterPage from "./pages/RegisterPage";
import MentorsPage from "./pages/MentorsPage";
import MentorsRequestsDetailPage from "./pages/MentorsDetailPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/mentors" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
      <Route path="/mentors" element={<MentorsPage />} />
      <Route path="/mentors/:id" element={<MentorsRequestsDetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;