import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Details from "./pages/Details";
import "./styles.css";

const qc = new QueryClient();
const router = createBrowserRouter([
  { element: <App />, children: [
    { path: "/", element: <Home /> },
    { path: "/pokemon/:idOrName", element: <Details /> },
  ]},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={qc}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
