import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import theme from './theme';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import AdmissionsPage from './pages/AdmissionsPage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import LearnMorePage from './pages/LearnMorePage';

// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminStudentsPage from './pages/AdminStudentsPage';
import AdminTeachersPage from './pages/AdminTeachersPage';
import AdminClassesPage from './pages/AdminClassesPage';
import AdminNewsPage from './pages/AdminNewsPage';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminContactPage from './pages/AdminContactPage';
import AdminAdmissionsPage from './pages/AdminAdmissionsPage';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherClassesPage from './pages/teacher/TeacherClassesPage';
import TeacherAttendancePage from './pages/teacher/TeacherAttendancePage';
import TeacherAssignmentsPage from './pages/teacher/TeacherAssignmentsPage';
import TeacherAssignmentDetailsPage from './pages/teacher/TeacherAssignmentDetailsPage';
import TeacherTimetablePage from './pages/teacher/TeacherTimetablePage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!token) return <Navigate to="/login" />;

  return <>{children}</>;
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/learn-more" element={<LearnMorePage />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute><AdminStudentsPage /></ProtectedRoute>} />
            <Route path="/admin/teachers" element={<ProtectedRoute><AdminTeachersPage /></ProtectedRoute>} />
            <Route path="/admin/classes" element={<ProtectedRoute><AdminClassesPage /></ProtectedRoute>} />
            <Route path="/admin/news" element={<ProtectedRoute><AdminNewsPage /></ProtectedRoute>} />
            <Route path="/admin/events" element={<ProtectedRoute><AdminEventsPage /></ProtectedRoute>} />
            <Route path="/admin/contact" element={<ProtectedRoute><AdminContactPage /></ProtectedRoute>} />
            <Route path="/admin/admissions" element={<ProtectedRoute><AdminAdmissionsPage /></ProtectedRoute>} />

            {/* Teacher Routes */}
            <Route path="/teacher/dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>} />
            <Route path="/teacher/classes" element={<ProtectedRoute><TeacherClassesPage /></ProtectedRoute>} />
            <Route path="/teacher/attendance" element={<ProtectedRoute><TeacherAttendancePage /></ProtectedRoute>} />
            <Route path="/teacher/assignments" element={<ProtectedRoute><TeacherAssignmentsPage /></ProtectedRoute>} />
            <Route path="/teacher/assignments/:id" element={<ProtectedRoute><TeacherAssignmentDetailsPage /></ProtectedRoute>} />
            <Route path="/teacher/timetable" element={<ProtectedRoute><TeacherTimetablePage /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
