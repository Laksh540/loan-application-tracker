import { Route, Routes } from "react-router-dom";
import ApplicationListPage from "./pages/ApplicationList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationListPage />} />
    </Routes>
  );
}

export default App;
