import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Checkbox,
  Button,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const CreateAccount = () => {
  const navigate = useNavigate();

  const theme = useTheme();

  const handleSignUp = () => {
    navigate("/login/create-account");
  };

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const passwordValue = event.target.value;
    setPassword(passwordValue);

    if (passwordValue.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClose = () => {
    navigate("/");
  };

  const handleConfirm = () => {
    navigate("/dashboard");
  };

  return (
    <Box className="flex items-center justify-center h-screen w-full p-10">
      <Stack spacing={4}>
        {/* Close Button */}
        <Stack
          direction={"row"}
          justifyContent={"flex-end"}
          className="-ml-7"
        ></Stack>

        {/* Title */}
        <Stack
          direction={"row"}
          className="flex justify-center items-center"
          spacing={4}
        >
          <Stack className="flex justify-center items-center">
            {" "}
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
              Login your Account
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
              Enter your details to login.
            </Typography>
          </Stack>

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: "white",
              "&:hover": {
                background: "linear-gradient(90deg, #AA684A, #76ABB2)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Stack>

        {/* Input Fields*/}
        <Stack spacing={2} className="w-[21rem]">
          {/* Username Field */}
          <TextField
            id="enter-your-username"
            label="Enter your username"
            variant="outlined"
            size="medium"
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
          {/* Password Field */}
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
              htmlFor="password"
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
              Enter your password
            </InputLabel>
            <OutlinedInput
              id="password"
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
              label="Enter your password"
            />
            {passwordError && (
              <p
                style={{ color: "red", marginTop: "6px", fontSize: "0.75rem" }}
              >
                Password must be at least 8 characters
              </p>
            )}
          </FormControl>

          {/* Terms and Conditions */}
          <Stack direction={"row"} className="flex items-end">
            <Box flexGrow={1}></Box>
            <Button variant="text" size="small" sx={{ textTransform: "none" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#808080",
                  fontFamily: "Questrial", // Apply the same font as in ThemeProvider
                }}
              >
                Forgot Password
              </Typography>
            </Button>
          </Stack>

          {/* Create Account Button */}
          <Stack spacing={1}>
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
              Confirm
            </Button>
            <Divider>or</Divider>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderColor: "#FFFEFE",
                color: "white",
                textTransform: "none",
                fontFamily: "Questrial",
                borderRadius: "0.5rem",
                height: "3rem",
                [theme.breakpoints.down("sm")]: {
                  height: "2.5rem", // Adjust height on smaller screens
                },
                "&:hover": {
                  background: "linear-gradient(90deg, #AA684A, #76ABB2)",
                },
              }}
            >
              <GoogleIcon
                sx={{
                  color: "#FFFEFE",
                  fontSize: "1.2rem",
                  marginRight: "0.75rem",
                }}
              />
              Sign in with Google
            </Button>
          </Stack>

          <Stack
            direction={"row"}
            spacing={1}
            className="flex items-center justify-center"
          >
            <Typography
              variant="subtitle2"
              sx={{
                color: "#808080",
                fontFamily: "Questrial",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "2rem",
                },
              }}
            >
              Dont have an account?
            </Typography>
            <Button
              variant="text"
              sx={{
                color: "#FFFEFE",
                fontFamily: "Questrial",
                textTransform: "none",
              }}
              onClick={handleSignUp}
            >
              Sign up
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreateAccount;
