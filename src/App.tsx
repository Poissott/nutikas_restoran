import ReservationPage from "./pages/ReservationPage";
import StartPage from "./pages/StartPage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// React router äpi lehtede seostamiseks.
const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <StartPage />,
    },
    {
      path: "/reservations",
      element: <ReservationPage />,
}]);
    
function App() {
    return <RouterProvider router={appRouter} />;
}

export default App;