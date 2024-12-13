import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Zoom,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ResetPassword = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();

  const theme = useTheme();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);

    if (passwordValue.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const confirmPasswordValue = event.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (confirmPasswordValue !== password) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleConfirm = () => {
    navigate("/dashboard");
  };

  return (
    <Box className="flex items-center justify-center w-full pl-16 pr-16 pb-16 pt-12 bg-[#121212]">
      <Stack spacing={4}>
        {/* Title */}
        <Box>
          <Stack spacing={2}>
            {" "}
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
                Reset your Password{" "}
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

        {/* Input Fields*/}
        <Stack spacing={3} className="w-[21rem]">
          {/* Username Field */}
          <FormControl
            variant="outlined"
            error={passwordError}
            sx={{
              m: 1,
              width: "100%",
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
            }}
          >
            <InputLabel
              htmlFor="new-password"
              sx={{
                color: "#808080",
                zIndex: 1,
                paddingX: "0.5rem",
                fontFamily: "Questrial",
                "&.Mui-focused": {
                  color: "#FFFEFE",
                  padding: "0rem",
                },
              }}
            >
              Enter your new password
            </InputLabel>
            <OutlinedInput
              id="new-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              inputProps={{
                minLength: 8,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseDownPassword}
                    edge="end"
                    sx={{
                      color: "#808080",
                      zIndex: 1,
                      marginRight: "0.1rem",
                      "&:hover": {
                        color: "#FFFEFE",
                      },
                    }}
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Enter your new password"
            />
            {passwordError && (
              <p
                style={{ color: "red", marginTop: "6px", fontSize: "0.75rem" }}
              >
                Password must be at least 8 characters
              </p>
            )}
          </FormControl>

          <FormControl
            variant="outlined"
            error={confirmPasswordError}
            sx={{
              m: 1,
              width: "100%",
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
            }}
          >
            <InputLabel
              htmlFor="confirm-password"
              sx={{
                color: "#808080",
                zIndex: 1,
                paddingX: "0.5rem",
                fontFamily: "Questrial",
                "&.Mui-focused": {
                  color: "#FFFEFE",
                  padding: "0rem",
                },
              }}
            >
              Confirm your password
            </InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              inputProps={{
                minLength: 8,
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    onMouseUp={handleMouseDownConfirmPassword}
                    edge="end"
                    sx={{
                      color: "#808080",
                      zIndex: 1,
                      marginRight: "0.1rem",
                      "&:hover": {
                        color: "#FFFEFE",
                      },
                    }}
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Confirm your password"
            />
            {confirmPasswordError && (
              <p
                style={{ color: "red", marginTop: "6px", fontSize: "0.75rem" }}
              >
                Passwords do not match
              </p>
            )}
          </FormControl>

          {/* Create Account Button */}
          <Stack>
            {" "}
            <Button
              fullWidth
              variant="contained"
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
              onClick={handleConfirm}
            >
              Confrim
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ResetPassword;
