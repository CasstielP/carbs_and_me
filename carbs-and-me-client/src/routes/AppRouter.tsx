import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import UserProfilePage from "../pages/UserProfilePage";
import UploadVideoPage from "../pages/UploadVideoPage";
import VideoDetailPage from "../pages/VideoDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/users/:userId" element={<UserProfilePage />} />
        <Route path="/upload" element={<UploadVideoPage />} />
        <Route path="/videos/:videoId" element={<VideoDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;