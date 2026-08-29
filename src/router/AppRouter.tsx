import { BrowserRouter, Route, Routes } from "react-router-dom";
import ApplicationListPage from "../pages/ApplicationList";
import ApplicationDetail from "../pages/ApplicationDetail";
import NotFound from "../pages/NotFound";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ApplicationListPage />} />
        <Route
          path="/applications/:reference"
          element={<ApplicationDetail />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
