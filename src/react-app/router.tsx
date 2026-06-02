import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
 
import Home from './home';          // New file
import { FitnessPlan } from './FitnessPlan';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,                 // Layout
    children: [
      {
        index: true,
        element: <Home />,            // Form page (was App)
      },
      {
        path: "plan",
        element: <FitnessPlan />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);