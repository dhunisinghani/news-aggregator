import { createBrowserRouter, Navigate  } from 'react-router-dom';

import App from '../App';
import HomePage from '../pages/HomePage/HomePage';
import { NotRouteFound } from '../components';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
		children: [
			{
				path: "/",
				element: <Navigate to="/home" replace={true} />,
			},
			{
				path: "/home",
				element: <HomePage />
			},
			{
				path: "*",
				element: <NotRouteFound />
			}
		]
	}
]);

export default appRouter;