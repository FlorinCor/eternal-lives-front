import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { AdminLayout } from '../components/layout/AdminLayout';
import { ProtectedRoute, AdminRoute } from '../components/auth/ProtectedRoute';

// Lazy loaded page components for optimal performance and code splitting
const HomePage = lazy(() => import('../pages/HomePage').then(m => ({ default: m.HomePage })));
const ExplorePage = lazy(() => import('../pages/ExplorePage').then(m => ({ default: m.ExplorePage })));
const PersonPage = lazy(() => import('../pages/PersonPage').then(m => ({ default: m.PersonPage })));
const CategoryPage = lazy(() => import('../pages/CategoryPage').then(m => ({ default: m.CategoryPage })));
const SearchPage = lazy(() => import('../pages/SearchPage').then(m => ({ default: m.SearchPage })));
const LoginPage = lazy(() => import('../pages/LoginPage').then(m => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
const ProfilePage = lazy(() => import('../pages/ProfilePage').then(m => ({ default: m.ProfilePage })));
const FavoritesPage = lazy(() => import('../pages/FavoritesPage').then(m => ({ default: m.FavoritesPage })));
const ContributePage = lazy(() => import('../pages/ContributePage').then(m => ({ default: m.ContributePage })));
const AboutPage = lazy(() => import('../pages/AboutPage').then(m => ({ default: m.AboutPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Admin Pages
const AdminDashboardPage = lazy(() =>
  import('../pages/admin/AdminDashboardPage').then(m => ({ default: m.AdminDashboardPage }))
);
const AdminPeoplePage = lazy(() =>
  import('../pages/admin/AdminPeoplePage').then(m => ({ default: m.AdminPeoplePage }))
);
const AdminGravesPage = lazy(() =>
  import('../pages/admin/AdminGravesPage').then(m => ({ default: m.AdminGravesPage }))
);
const AdminQuotesPage = lazy(() =>
  import('../pages/admin/AdminQuotesPage').then(m => ({ default: m.AdminQuotesPage }))
);
const AdminContributionsPage = lazy(() =>
  import('../pages/admin/AdminContributionsPage').then(m => ({ default: m.AdminContributionsPage }))
);

const PageLoader: React.FC = () => (
  <div className="min-h-screen bg-forest-950 flex items-center justify-center pt-20">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
      <p className="font-serif text-sm text-ivory-300 italic">Entering sanctuary archives...</p>
    </div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public / Main Sanctuary Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="people/:slug" element={<PersonPage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="contribute" element={<ContributePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Administrative Protected Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="people" element={<AdminPeoplePage />} />
          <Route path="graves" element={<AdminGravesPage />} />
          <Route path="quotes" element={<AdminQuotesPage />} />
          <Route path="contributions" element={<AdminContributionsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
