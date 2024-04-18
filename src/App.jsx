import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "./routes/mainRoutes";
import { authRoutes } from "./routes/authRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { doctorRoutes } from "./routes/doctorRoutes";
import { patientRoutes } from "./routes/patientRoutes";
const App = () => {
  const router = createBrowserRouter([
    ...mainRoutes,
    ...authRoutes,
    ...adminRoutes,
    ...doctorRoutes,
    ...patientRoutes,
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
