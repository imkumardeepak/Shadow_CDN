import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import RoutesComponent from "./routes/RoutesComponent";

const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Layout>
        <RoutesComponent />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
