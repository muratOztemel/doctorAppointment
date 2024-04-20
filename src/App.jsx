import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { mainRoutes } from "./routes/mainRoutes";
import { authRoutes } from "./routes/authRoutes";
import { adminRoutes } from "./routes/adminRoutes";
import { doctorRoutes } from "./routes/doctorRoutes";
import { patientRoutes } from "./routes/patientRoutes";
import { useRestoreSession } from "./components/hooks/useRestoreSession";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", // Ana rota
      element: <AppContent />, // AppContent burada çağrılıyor ve tüm alt rotaları içeriyor
      children: [
        ...mainRoutes,
        ...authRoutes,
        ...adminRoutes,
        ...doctorRoutes,
        ...patientRoutes,
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

const AppContent = () => {
  useRestoreSession(); // Oturumu geri yükleme hook'u

  // AppContent içerisindeki Outlet, alt rotaları render edecek
  return (
    <div>
      <Outlet /> {/* Çocuk rotalar bu noktada render edilir */}
    </div>
  );
};

export default App;
