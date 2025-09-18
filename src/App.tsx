import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ErrorBoundary, NotFound } from "./components";
import Loader from "./components/Loader.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Article = lazy(() => import("./pages/Article.tsx"));
const Impact = lazy(() => import("./pages/Impact.tsx"));
const AdminLogin = lazy(() => import("./components/AdminLogin.tsx"));

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
