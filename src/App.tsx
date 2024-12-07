import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Pages
import LandingPage from "./pages/landing-page/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
