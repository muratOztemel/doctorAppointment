import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardHome from "./components/pages/Dashboard/DashboardHome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardHome />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
