import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import theme from './theme';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AppLayout from './components/Layout/AppLayout';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import ContactPage from './pages/ContactPage';
import ApplicationPage from './pages/ApplicationPage';
import LearnMorePage from './pages/LearnMorePage';
import NewsPage from './pages/NewsPage';
import AdminNewsPage from './pages/AdminNewsPage';
import AdminEventsPage from './pages/AdminEventsPage';
import AdminAdmissionsPage from './pages/AdminAdmissionsPage';
import AdminContactPage from './pages/AdminContactPage';

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

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/students" element={
              <ProtectedRoute>
                <AdminStudentsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/teachers" element={
              <ProtectedRoute>
                <AdminTeachersPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/classes" element={
              <ProtectedRoute>
                <AdminClassesPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/news" element={
              <ProtectedRoute>
                <AdminNewsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/events" element={
              <ProtectedRoute>
                <AdminEventsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/contact" element={
              <ProtectedRoute>
                <AdminContactPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/admissions" element={
              <ProtectedRoute>
                <AdminAdmissionsPage />
              </ProtectedRoute>
            } />
            <AdminContactPage />
          </ProtectedRoute>
            } />
        </Routes>
      </Router>
    </AuthProvider>
    </ChakraProvider >
  );
}

export default App;
