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
  Tooltip,
  Zoom,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  auth,
  googleProvider,
  sendEmail,
  db,
  createUserEmail,
} from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const CreateAccount = () => {
  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState(false);

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

  const handleSignIn = () => {
    navigate("/account/sign-in");
  };

  const handleClose = () => {
    navigate("/landing-page");
  };

  const handleCreateAccount = async () => {
    if (!termsChecked) {
      setTermsError(true);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    try {
      const userCredential = await createUserEmail(auth, email, password);
      await sendEmail(userCredential.user);

      // Add user document to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: username,
        email: email,
        dateCreated: serverTimestamp(),
      });

      setSnackbarOpen(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Add user document to Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        email: user.email,
        dateCreated: serverTimestamp(),
      });

      setSnackbarOpen(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up with Google:", error);
    }
  };

  return (
    <Box className="flex items-center justify-center h-screen w-full p-10 bg-[#121212]">
      <Stack spacing={4}>
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
              Create your Account
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
              Enter your details to sign up
            </Typography>
          </Stack>

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
          </Tooltip>
        </Stack>

        {/* Input Fields*/}
        <Stack spacing={2} className="w-[21rem]">
          <TextField
            id="enter-your-username"
            label="Enter your username"
            variant="outlined"
            size="medium"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <TextField
            id="enter-your-email"
            label="Enter your email"
            variant="outlined"
            size="medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          {/* Confirm Password Field */}
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

          {/* Terms and Conditions */}
          <Stack direction={"row"} className="flex items-center ">
            <Checkbox
              {...label}
              size="small"
              checked={termsChecked}
              onChange={(e) => {
                setTermsChecked(e.target.checked);
                setTermsError(false);
              }}
              sx={{
                "& .MuiSvgIcon-root": {
                  fill: "none",
                },
              }}
              icon={
                <span
                  style={{
                    display: "inline-block",
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "0.25rem",
                    border: "0.06rem solid #FFFEFE",
                  }}
                />
              }
              checkedIcon={
                <span
                  style={{
                    display: "inline-block",
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "0.25rem",
                    background: "linear-gradient(90deg, #D98863, #76ABB2)",
                  }}
                />
              }
            />
            <Button variant="text" size="small" sx={{ textTransform: "none" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#FFFEFE",
                  fontFamily: "Questrial", // Apply the same font as in ThemeProvider
                }}
              >
                I agree to <span style={{ color: "#AA684A" }}>Terms</span> and{" "}
                <span style={{ color: "#76ABB2" }}>Conditions</span>
              </Typography>
            </Button>
          </Stack>
          {termsError && (
            <p style={{ color: "red", marginTop: "6px", fontSize: "0.75rem" }}>
              You must agree to the terms and conditions
            </p>
          )}

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
              onClick={handleCreateAccount}
            >
              Create your Account
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
              onClick={handleGoogleSignUp}
            >
              <GoogleIcon
                sx={{
                  color: "#FFFEFE",
                  fontSize: "1.2rem",
                  marginRight: "0.75rem",
                }}
              />
              Sign up with Google
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
                color: "#FFFEFE",
                fontFamily: "Questrial",
              }}
            >
              Already have an account?
            </Typography>
            <Button
              variant="text"
              size="small"
              sx={{
                color: "#AA684A",
                textTransform: "none",
                fontFamily: "Questrial",
              }}
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </Stack>
        </Stack>

        {/* Snackbar for Account Creation Confirmation */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Account created successfully!
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
};

export default CreateAccount;
