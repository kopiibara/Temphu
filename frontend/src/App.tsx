import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom"; // Import useLocation
import LandingPage from "./pages/landing-page/LandingPage";
import CreateAccount from "./pages/account/CreateAccount";
import Signin from "./pages/account/Signin";
import Dashboard from "./pages/dashboard/Dashboard";
import AboutPage from "./pages/Footer/About";
import PrivacyPage from "./pages/Footer/privacy";
import TermsPage from "./pages/Footer/terms";
import FAQPage from "./pages/Footer/faq";
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
          path="*"
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
          path="/landing-page"
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
          path="/account/create-account"
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
          path="/account/sign-in"
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

        <Route
          path="/dashboard"
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
              <Dashboard />
            </motion.div>
          }
        />
        <Route
          path="/about"
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
              <AboutPage />
            </motion.div>
          }
        />
        <Route
          path="/privacy"
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
              <PrivacyPage />
            </motion.div>
          }
        />
        <Route
          path="/terms"
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
              <TermsPage />
            </motion.div>
          }
        />
        <Route
          path="/faq"
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
              <FAQPage />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;

