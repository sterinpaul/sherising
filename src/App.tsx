import { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loader from "./components/Loader.tsx";

const Home = lazy(() => import("./pages/Home.tsx"));
const Article = lazy(() => import("./pages/Article.tsx"));
const Impact = lazy(() => import("./pages/Impact.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader/>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/article",
    element: (
      <Suspense fallback={<Loader/>}>
        <Article />
      </Suspense>
    ),
  },
  {
    path: "/impact",
    element: (
      <Suspense fallback={<Loader/>}>
        <Impact />
      </Suspense>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
