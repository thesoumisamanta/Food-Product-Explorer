import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductList from "./components/products/ProductList";
import ProductDetail from "./components/products/ProductDetail";
import Layout from "./components/homePage/Layout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: "",
        element: <ProductList />
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
    ]
  },
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}