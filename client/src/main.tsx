import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import Board from './pages/Board.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import EditTicket from './pages/EditTicket.tsx';
import CreateTicket from './pages/CreateTicket.tsx';
import Login from './pages/Login.tsx';
import NewUser from './pages/NewUser.tsx';
import ProtectedRoute from "./components/ProtectedRoute.tsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Board />
      }, 
      {
        path: '/edit',
        element: <ProtectedRoute />,
        children: [{ index: true, element: <EditTicket /> }],
      },
      {
        path: '/create',
        element: <ProtectedRoute />,
        children: [{ index: true, element: <CreateTicket /> }],
      },
      {
        path: '/login',
        element: <Login />,
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
