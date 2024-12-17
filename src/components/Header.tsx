import { Box, Stack, Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { auth, signOutUser } from "../firebase/config";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/landing-page");
  };

  const handleSignOut = async () => {
    try {
      await signOutUser(auth);
      navigate("/landing-page"); // Redirect to login page after sign out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Box className="px-40 py-12 w-full">
      <Stack direction="row" spacing={2} className="flex items-center ">
        <Stack direction={"row"} alignItems="center">
          <Button
            variant="text"
            onClick={handleLogoClick}
            sx={{
              p: 0,
              textTransform: "none",
            }}
          >
            {" "}
            <img src="/temphu-logo.png" alt="temphu" width={40} />
          </Button>
          <Typography variant="h6">Temphu</Typography>
        </Stack>

        <Box flexGrow={1} />
        <Stack direction={"row"}>
          <Button
            variant="text"
            color="primary"
            onClick={handleSignOut}
            sx={{
              textTransform: "none",
              color: "#FFFEFE",
              fontSize: "1.1rem",
            }}
          >
            Log out
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
