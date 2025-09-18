import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorBoundary, NotFound } from "./components";
import Loader from "./components/Loader.tsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Article = lazy(() => import("./pages/Article.tsx"));
const Impact = lazy(() => import("./pages/Impact.tsx"));
const AdminLogin = lazy(() => import("./components/AdminLogin.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const ArticlesList = lazy(() => import("./components/dashboard/ArticlesList.tsx"));
const ArticleEditor = lazy(() => import("./components/dashboard/ArticleEditor.tsx"));
const ImpactsList = lazy(() => import("./components/dashboard/ImpactsList.tsx"));
const ImpactEditor = lazy(() => import("./components/dashboard/ImpactEditor.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader/>}>
        <Home />
      </Suspense>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/article/:id",
    element: (
      <Suspense fallback={<Loader/>}>
        <Article />
      </Suspense>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/impact/:id",
    element: (
      <Suspense fallback={<Loader/>}>
        <Impact />
      </Suspense>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader/>}>
        <AdminLogin />
      </Suspense>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<Loader/>}>
        <DashboardLayout title="Dashboard" subtitle="Welcome" />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader/>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "articles",
        element: (
          <Suspense fallback={<Loader/>}>
            <ArticlesList />
          </Suspense>
        ),
      },
      {
        path: "articles/new",
        element: (
          <Suspense fallback={<Loader/>}>
            <ArticleEditor />
          </Suspense>
        ),
      },
      {
        path: "articles/:id/edit",
        element: (
          <Suspense fallback={<Loader/>}>
            <ArticleEditor />
          </Suspense>
        ),
      },
      {
        path: "impacts",
        element: (
          <Suspense fallback={<Loader/>}>
            <ImpactsList />
          </Suspense>
        ),
      },
      {
        path: "impacts/new",
        element: (
          <Suspense fallback={<Loader/>}>
            <ImpactEditor />
          </Suspense>
        ),
      },
      {
        path: "impacts/:id/edit",
        element: (
          <Suspense fallback={<Loader/>}>
            <ImpactEditor />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}
