import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../../components/Header";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { signOutUser } from "../../firebase/config";

const Dashboard = () => {
  const handleSignOut = async () => {
    try {
      await signOutUser(auth);
      navigate("/landing-page"); // Redirect to login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/landing-page");
      } else if (!user.emailVerified) {
        setOpenDialog(true);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Header />
      <h1>Dashboard</h1>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Verify your Email First
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleCloseDialog(); handleSignOut(); window.location.href = "https://mail.google.com"; }} color="primary">
            Check your Email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
