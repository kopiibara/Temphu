import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import NewPassword from "./NewPassword";

const ResetPassword = ({ onClose }: { onClose: () => void }) => {
  const theme = useTheme();
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleConfirm = () => {
    setShowNewPassword(true); // Show NewPassword dialog
  };

  if (showNewPassword) {
    return <NewPassword onClose={onClose} />;
  }

  return (
    <Box className="flex items-center justify-center w-full pl-16 pr-16 pb-16 pt-12 bg-[#121212]">
      <Stack spacing={4}>
        {/* Title */}
        <Box>
          <Stack spacing={2}>
            <Stack direction={"row"}>
              <Box flexGrow={1}></Box>
              <Tooltip
                title="Close"
                slots={{ transition: Zoom }}
                placement="top"
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
                  aria-label="close"
                  onClick={onClose}
                  sx={{
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(90deg, #AA684A, #76ABB2)",
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            <Stack justifyContent={"center"} alignItems={"center"}>
              <Typography
                variant="h4"
                sx={{
                  color: "#FFFEFE",
                  fontFamily: "Questrial",
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "2rem",
                  },
                }}
              >
                Reset your Password
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#FFFEFE",
                  fontFamily: "Questrial",
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "1rem",
                  },
                }}
              >
                Enter your email to reset password.
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Input Fields */}
        <Stack spacing={2} className="w-[21rem]">
          <TextField
            id="enter-email"
            label="Enter your email"
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#FFFEFE",
                  borderRadius: "0.5rem",
                },
                "&:hover fieldset": {
                  borderColor: "#FFFEFE",
                  borderRadius: "0.5rem",
                  background: "linear-gradient(90deg, #D98863, #76ABB2)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFFEFE",
                  borderRadius: "0.5rem",
                  background: "linear-gradient(90deg, #D98863, #76ABB2)",
                },
                "& input": {
                  color: "#FFFEFE",
                  zIndex: 1,
                  paddingX: "1.3rem",
                  fontFamily: "Questrial",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#808080",
                zIndex: 1,
                paddingX: "0.5rem",
                fontFamily: "Questrial",
                "&.Mui-focused": {
                  color: "#FFFEFE",
                  padding: "0rem",
                },
              },
              [theme.breakpoints.down("sm")]: {
                width: "100%", // Full width on small screens
              },
            }}
          />

          <Stack direction={"row"} className="flex items-end">
            <Box flexGrow={1}></Box>
            <Button variant="text" size="small" sx={{ textTransform: "none" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#808080",
                  fontFamily: "Questrial",
                }}
              >
                Verify email
              </Typography>
            </Button>
          </Stack>

          <Stack>
            <Button
              fullWidth
              variant="contained"
              onClick={handleConfirm}
              sx={{
                background: "linear-gradient(90deg, #AA684A, #76ABB2)",
                color: "white",
                textTransform: "none",
                fontFamily: "Questrial",
                borderRadius: "0.5rem",
                height: "3rem",
                [theme.breakpoints.down("sm")]: {
                  height: "2.5rem",
                },
                "&:hover": {
                  scale: 1.01,
                },
              }}
            >
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ResetPassword;
