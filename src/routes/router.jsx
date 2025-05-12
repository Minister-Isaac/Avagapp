import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ErrorPage from "../ErrorPage";
import HomePage from "../HomePage";
import Forgotpassword from "../pages/auth/ForgotPassword";
import Generate from "../pages/teacher/Generate";
import Institute from "../pages/teacher/Institute";
import Knowledge from "../pages/teacher/Knowledge";
import TeachLayout from "../pages/teacher/TeachLayout";
import THome from "../pages/teacher/THome";
import TSetting from "../pages/teacher/TSetting";
import UserMangement from "../pages/teacher/UserMangement";
import UserRegistration from "../pages/teacher/UserRegistration";
import Otp from "../pages/auth/Otp";
import ResetPassword from "../pages/auth/ResetPassword";
import Ranking from "../pages/teacher/Ranking";
import Game from "../pages/teacher/Game";
import GameDetails from "../pages/teacher/GameDetails";
import GameCreate from "../pages/teacher/GameCreate";
import AdminLayout from "../pages/admin/AdminLayout";
import AdminHome from "../pages/teacher/AdminHome";
import TeacherManagement from "../pages/admin/TeacherManagement";
import TeacherRegistration from "../pages/admin/TeacherRegistration";
import AdminKnowledge from "../pages/admin/AdminKnowledge";
import AdminRanking from "../pages/admin/AdminRanking";
import StudentLayout from "../pages/student/StudentLayout";
import SHome from "../pages/student/SHome";
import ClassOverView from "../pages/student/ClassOverView";
import ClassOverViewDetails from "../pages/student/ClassOverViewDetails";
import StudentKnowledge from "../pages/student/StudentKnowledge";
import Activity from "../pages/student/Activity";
import StudentProfile from "../pages/student/StudentProfile";
import StudentGame from "../pages/student/StudentGame";
import StudentGameDetails from "../pages/student/StudentGameDetails";
import ClassDetails from "../pages/student/ClassDetails";
import StudentRanking from "../pages/student/StudentRanking";
import SignIn from "../pages/auth/sign_in";
import Signup from "../pages/auth/sign_up";
import RoleRoute from "./RoleRoute";
import PublicRoute from "./PublicRoute";

export default function RouterComponent() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/auth/sign_in" element={<PublicRoute><SignIn /></PublicRoute>} />
        <Route path="/auth/sign_up" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/auth/forgot-password" element={<PublicRoute><Forgotpassword /></PublicRoute>} />
        <Route path="/auth/reset-password" element={<PublicRoute><ResetPassword /></PublicRoute>} />
        <Route path="/auth/verify-otp" element={<PublicRoute><Otp /></PublicRoute>} />

        {/* Home */}
        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />

        {/* Student routes */}
        <Route
          path="/student/dashboard"
          element={
            <RoleRoute
              allowedRoles={["student"]}
              redirectTo="/auth/sign_in?role=student"
            >
              <StudentLayout />
            </RoleRoute>
          }
        >
          <Route index element={<SHome />} />
          <Route path="class-overview" element={<ClassOverView />} />
          <Route path="class-overview/:id" element={<ClassDetails />} />
          <Route path="student-knowledge" element={<StudentKnowledge />} />
          <Route path="student-knowledge/details" element={<ClassOverViewDetails />} />
          <Route path="activty" element={<Activity />} />
          <Route path="student-ranking" element={<StudentRanking />} />
          <Route path="student-profile" element={<StudentProfile />} />
          <Route path="student-game" element={<Game />} />
          <Route path="student-game/:gameType" element={<StudentGameDetails />} />
          <Route path="setting" element={<TSetting />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <RoleRoute
              allowedRoles={["admin"]}
              redirectTo="/auth/sign_in?role=admin"
            >
              <AdminLayout />
            </RoleRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="register-teacher" element={<TeacherRegistration />} />
          <Route path="teacher-management" element={<TeacherManagement />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="knowledge/Know-details" element={<ClassOverViewDetails />} />
          <Route path="ranking" element={<AdminRanking />} />
          <Route path="game" element={<Game />} />
          <Route path="game/:gameType" element={<StudentGameDetails />} />
          <Route path="setting" element={<TSetting />} />
        </Route>

        {/* Teacher routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <RoleRoute
              allowedRoles={["teacher"]}
              redirectTo="/auth/sign_in?role=teacher"
            >
              <TeachLayout />
            </RoleRoute>
          }
        >
          <Route index element={<THome />} />
          <Route path="register-user" element={<UserRegistration />} />
          <Route path="management" element={<UserMangement />} />
          <Route path="institute" element={<Institute />} />
          <Route path="generate" element={<Generate />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="game" element={<Game />} />
          <Route path="game/:gameType" element={<StudentGameDetails />} />
          <Route path="setting" element={<TSetting />} />
          <Route path="knowledge/Know-details" element={<ClassOverViewDetails />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}
