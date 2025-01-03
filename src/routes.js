import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import AnonymousLayout from './layouts/anonymous';
// import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import DashboardAdminPage from './pages/DashboardAdminPage';
import PackageAuditPage from './pages/PackageAuditPage';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
import TermsAndConditonsPage from './pages/TermsAndConditonsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import RefundPolicyPage from './pages/RefundPolicyPage';
import ProfilePage from './pages/ProfilePage';
import ViewPackagesPage from './pages/ViewPackagesPage';
import AddPackage from './pages/AddPackage';
import UploadInvoicePage from './pages/UploadInvoicePage';
import CalculatorPage from './pages/CalculatorPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <AnonymousLayout />,
      children: [
        { element: <Navigate to="/Home" />, index: true },
        { path: 'Home', element: <HomePage /> },
        {
          path: 'terms',
          element: <TermsAndConditonsPage />,
        },
        {
          path: 'privacy',
          element: <PrivacyPolicyPage />,
        },
        {
          path: 'refund',
          element: <RefundPolicyPage />,
        },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/signup',
      element: <SignupPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'uploadinvoice', element: <UploadInvoicePage /> },
        { path: 'calculator', element: <CalculatorPage /> },
        { path: 'packages', element: <ViewPackagesPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/admindashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/admindashboard/app" /> },
        { path: 'app', element: <DashboardAdminPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'profile', element: <ProfilePage /> },
        { path: 'addpackage', element: <AddPackage /> },
        { path: 'auditpackage', element: <PackageAuditPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/dashboard/app" />, index: true },
    //     { path: '404', element: <Page404 /> },
    //     { path: '*', element: <Navigate to="/404" /> },
    //   ],
    // },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
