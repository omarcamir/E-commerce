import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import { Detector } from "react-detect-offline";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import { CartContextProvider } from "./context/CartContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "products/:id",
            element: <ProductDetails />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "categories/:id",
            element: <CategoryDetails />,
          },
          {
            path: "brands",
            element: <Brands />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "*",
            element: <PageNotFound />,
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
function App() {
  const query = new QueryClient();
  return (
    <div className="App relative">
      <div>
        <Detector
          render={({ online , polling }) => (
            <Alert
              variant={`${ online ? "success" : "danger"}`}
              className="position-fixed bottom-0 start-0 ms-3 z-2"
            >
              <FontAwesomeIcon icon={faWifi} className="me-2" />
              You are currently {online ? "online" : "offline"}
            </Alert>
          )}polling={{interval: 2000}}
        />
      </div>
      <QueryClientProvider client={query}>
        <AuthContextProvider>
          <CartContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
