import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
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
import { verifyPasswordResetCode, confirmPasswordReset, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../../firebase/config"; // Adjust the path as needed
import { collection, query, where, getDocs } from "firebase/firestore";

const ResetPassword = ({ onClose, oobCode }: { onClose: () => void; oobCode?: string }) => {
  const theme = useTheme();

  // State variables
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(!!oobCode); // Show loading only if oobCode is present
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);

  // Verifying the reset code if `oobCode` is provided
  useEffect(() => {
    if (oobCode) {
      const validateCode = async () => {
        try {
          await verifyPasswordResetCode(auth, oobCode);
          setIsCodeValid(true); // Code is valid
        } catch (err) {
          setError("The password reset link is invalid or expired.");
        } finally {
          setLoading(false);
        }
      };
      validateCode();
    }
  }, [oobCode]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleVerifyEmail = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      setEmailError("Email does not exist.");
    } else {
      setEmailError("");
    }
  };

  const handleSendResetEmail = async () => {
    setEmailError("");
    if (emailError) return;

    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setEmailError("Account does not exist.");
        return;
      }

      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:5173/account/sign-in?mode=resetPassword",
        handleCodeInApp: true,
      });
      alert("Password reset email sent successfully. Please check your inbox.");
    } catch (error) {
      setError("Error sending password reset email. Please try again.");
      console.error("Error sending password reset email:", error);
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

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlePasswordReset = async () => {
    if (!oobCode) {
      setError("Invalid or missing reset code.");
      return;
    }

    if (!password || !confirmPassword) {
      setError("Password and confirm password fields cannot be empty.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, password);
      alert("Password successfully reset! You can now log in with your new password.");
      onClose();
    } catch (err) {
      setError("Failed to reset the password. Please try again.");
      console.error("Error resetting password:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

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
                        options: { offset: [0, -5] },
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
                    "&:hover": { background: "linear-gradient(90deg, #AA684A, #76ABB2)" },
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
                  [theme.breakpoints.down("sm")]: { fontSize: "2rem" },
                }}
              >
                {oobCode ? "Set Your New Password" : "Reset your Password"}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "#FFFEFE",
                  fontFamily: "Questrial",
                  [theme.breakpoints.down("sm")]: { fontSize: "1rem" },
                }}
              >
                {oobCode
                  ? "Enter your new password to reset it."
                  : "Enter your email to receive a password reset link."}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Input Fields */}
        <Stack spacing={2} className="w-[21rem]">
          {!oobCode ? (
            // Email form for sending reset link
            <>
              <TextField
                id="enter-email"
                label="Enter your email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
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
              />
              <Box flexGrow={1}></Box>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSendResetEmail}
                sx={{
                  background: "linear-gradient(90deg, #AA684A, #76ABB2)",
                  color: "white",
                  textTransform: "none",
                  fontFamily: "Questrial",
                  borderRadius: "0.5rem",
                  height: "3rem",
                  [theme.breakpoints.down("sm")]: { height: "2.5rem" },
                  "&:hover": { scale: 1.01 },
                }}
              >
                Send Reset Link
              </Button>
            </>
          ) : (
            // Password reset form
            <>
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
                  inputProps={{ minLength: 8 }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "hide the password" : "display the password"}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        sx={{
                          color: "#808080",
                          zIndex: 1,
                          marginRight: "0.1rem",
                          "&:hover": { color: "#FFFEFE" },
                        }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Enter your new password"
                />
                {passwordError && (
                  <p style={{ color: "red", marginTop: "6px", fontSize: "0.75rem" }}>
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
                  inputProps={{ minLength: 8 }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showConfirmPassword ? "hide the password" : "display the password"}
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                        sx={{
                          color: "#808080",
                          zIndex: 1,
                          marginRight: "0.1rem",
                          "&:hover": { color: "#FFFEFE" },
                        }}
                      >
                        {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {confirmPasswordError && (
                  <p style={{ color: "red", marginTop: "6px", fontSize: "0.75rem" }}>
                    Passwords do not match
                  </p>
                )}
              </FormControl>

              <Button
                fullWidth
                variant="contained"
                onClick={handlePasswordReset}
                sx={{
                  background: "linear-gradient(90deg, #AA684A, #76ABB2)",
                  color: "white",
                  textTransform: "none",
                  fontFamily: "Questrial",
                  borderRadius: "0.5rem",
                  height: "3rem",
                  [theme.breakpoints.down("sm")]: { height: "2.5rem" },
                  "&:hover": { scale: 1.01 },
                }}
              >
                Reset Password
              </Button>
              {error && (
                <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: "center" }}>
                  {error}
                </Typography>
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ResetPassword;
