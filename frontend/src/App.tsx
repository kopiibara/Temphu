import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom"; // Import useLocation
import LandingPage from "./pages/landing-page/LandingPage";
import CreateAccount from "./pages/login/CreateAccount";
import Signin from "./pages/login/Signin";
import "./index.css";

function App() {
  return (
    <Router>
      {" "}
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
                mass: 1,
              }}
            >
              <LandingPage />
            </motion.div>
          }
        />
        <Route
          path="/login/create-account"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
                mass: 1,
              }}
            >
              <CreateAccount />
            </motion.div>
          }
        />
        <Route
          path="/login/sign-in"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 40,
                mass: 1,
              }}
            >
              <Signin />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
