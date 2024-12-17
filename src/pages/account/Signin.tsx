import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Tooltip,
  Zoom,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ResetPassword from "./ResetPassword";
import {
  auth,
  signIn,
  sendEmail,
  googleProvider,
  db,
} from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";

const Signin = () => {
  console.log(auth);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [signInError, setSignInError] = useState("");
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [oobCode, setOobCode] = useState("");

  // Check for oobCode on page load and trigger reset modal
  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (code) {
      setOobCode(code);
      setOpenResetDialog(true);
    }
  }, [searchParams]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    if (!emailValue.includes("@")) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

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

  const handleSignUp = () => {
    navigate("/account/create-account");
  };

  const handleClose = () => {
    navigate("/landing-page");
  };

  const handleConfirm = () => {
    if (email && password) {
      signIn(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user.emailVerified) {
            navigate("/dashboard");
          } else {
            sendEmail(user)
              .then(() => {
                setSignInError(
                  "Please verify your email. A verification email has been sent."
                );
              })
              .catch((error) => {
                setSignInError(
                  "Error sending verification email: " + error.message
                );
              });
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          setSignInError(errorMessage);
        });
    } else {
      setSignInError("Please enter both email and password.");
    }
  };

  const handleOpenResetPassword = () => {
    setOpenResetDialog(true);
  };

  const handleCloseResetPassword = () => {
    setOpenResetDialog(false);
    setOobCode(""); // Clear oobCode
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const user = result.user;
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // Add user document to Firestore
          await setDoc(userDocRef, {
            username: user.displayName,
            email: user.email,
            dateCreated: serverTimestamp(),
          });
        }

        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.

        const errorMessage = error.message;
        setSignInError(errorMessage);
      });
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
          {/* Email Field */}
          <TextField
            id="enter-your-email"
            label="Enter your email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailError ? "Please enter a valid email address." : ""}
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

          {signInError && (
            <Typography color="error" variant="body2">
              {signInError}
            </Typography>
          )}

          {/* Forgot Password */}
          <Stack direction={"row"} className="flex items-end">
            <Box flexGrow={1}></Box>
            <Button
              variant="text"
              size="small"
              sx={{ textTransform: "none" }}
              onClick={handleOpenResetPassword}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#808080",
                  fontFamily: "Questrial",
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
              onClick={handleGoogleSignIn}
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

      {/* Reset Password Dialog */}
      <Dialog
        open={openResetDialog}
        onClose={handleCloseResetPassword}
        aria-labelledby="reset-password-dialog"
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#1e293b",

            borderRadius: "0.5rem",
          },
        }}
      >
        <DialogContent
          sx={{
            padding: 0, // Remove all padding
          }}
        >
          <ResetPassword oobCode={oobCode} onClose={handleCloseResetPassword} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Signin;