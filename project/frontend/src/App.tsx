import React, { Suspense, ReactNode } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './contexts/AuthContext';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loading from './components/ui/Loading';
import Navbar from './components/layout/Navbar';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import GiftCardDetails from './pages/GiftCardDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

// Auth protection
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Set page title based on current route
  React.useEffect(() => {
    const pageName = location.pathname.split('/').pop();
    if (pageName) {
      document.title = `${t('welcome_message')} - ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`;
    } else {
      document.title = t('welcome_message');
    }
  }, [location, t]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/catalog/:id" element={<GiftCardDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/order-success" 
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/orders" 
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;