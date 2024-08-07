import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminAddTender from "./Views/AdminAddTender";
import Home from "./Views/Home";
import PublicLayout from "./Components/Layouts/PublicLayout";
import { ROUTES_CONFIG } from "./shared/Constants";
import Tender from "./Views/Tender";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminAllTenders from "./Views/AdminAllTenders";

function App() {
  return (
    <BrowserRouter basename="/">
      <PublicLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminAllTenders />} />
          <Route path="/admin/add-tender" element={<AdminAddTender />} />
          <Route
            path={ROUTES_CONFIG.TENDER.path + ":tenderId"}
            element={<Tender />}
          />
        </Routes>
      </PublicLayout>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
