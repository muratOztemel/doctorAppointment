import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "./routes/mainRoutes";
import { authRoutes } from "./routes/authRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { doctorRoutes } from "./routes/doctorRoutes";
import { patientRoutes } from "./routes/patientRoutes";
import { useAuthHandler } from "./components/hooks/useAuthHandler";
import useTokenExpirationHandler from "./components/hooks/useTokenExpirationHandler";
import "tippy.js/dist/tippy.css";

const App = () => {
  const isCheckingToken = useAuthHandler();
  useTokenExpirationHandler();

  const router = createBrowserRouter([
    ...mainRoutes,
    ...authRoutes,
    ...adminRoutes,
    ...doctorRoutes,
    ...patientRoutes,
  ]);

  if (isCheckingToken) {
    return <div>Loading...</div>; // veya bir yükleme spinner'ı
  }

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
