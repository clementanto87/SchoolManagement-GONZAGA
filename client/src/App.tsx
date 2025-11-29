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
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/admissions" element={<AdmissionsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/apply" element={<ApplicationPage />} />
            <Route path="/learn-more" element={<LearnMorePage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
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
            <Route path="/admin/admissions" element={
              <ProtectedRoute>
                <AdminAdmissionsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/messages" element={
              <ProtectedRoute>
                <AdminContactPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
