import { Route, Routes } from "react-router-dom";
import ApplicationListPage from "./pages/ApplicationList";
import ApplicationDetail from "./pages/ApplicationDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationListPage />} />
      <Route path="/applications/:reference" element={<ApplicationDetail />} />
    </Routes>
  );
}

export default App;
