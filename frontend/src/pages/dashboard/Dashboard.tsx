import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../../components/Header";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/landing-page");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <Header />
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
