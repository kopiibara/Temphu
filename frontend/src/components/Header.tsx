import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThemeProvide from "../assets/ThemeProvider";
import SettingsIcon from "@mui/icons-material/Settings";
import { auth, signOutUser } from "../firebase/config";

const Header = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState("dark");
  const theme = ThemeProvide(mode as "light" | "dark");

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="px-16 py-8 w-full">
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
          <Button variant="contained" color="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
          <Tooltip
            title="Settings"
            slots={{ transition: Zoom }}
            placement="bottom"
            arrow
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -5],
                    },
                  },
                ],
              },
            }}
          >
            <IconButton
              aria-label="Edit"
              className="rounded-full min-w-auto min-h-auto"
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </ThemeProvider>
  );
};

export default Header;
