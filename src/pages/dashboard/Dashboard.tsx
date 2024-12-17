import { useEffect, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { auth, database, db } from "../../firebase/config";
import { onAuthStateChanged, User } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { doc, addDoc, collection, getDoc } from "firebase/firestore";
import Header from "../../components/Header";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { ThemeProvider, CssBaseline } from "@mui/material";
import ThemeProvide from "../../assets/ThemeProvider";
import { signOutUser } from "../../firebase/config";
import { LineChart } from "@mui/x-charts/LineChart";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ShowChartIcon from "@mui/icons-material/ShowChart";

const Dashboard = () => {
  const mode = "dark";
  const theme = ThemeProvide(mode as "light" | "dark");
  interface SensorData {
    id: number;
    temperature: number;
    humidity: number;
    timestamp: string;
  }

  const [sensorData, setSensorData] = useState<SensorData[]>([]); // Array to store all sensor readings
  const [user, setUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [alignment, setAlignment] = React.useState("left"); // State to manage toggle between table and chart
  const navigate = useNavigate();

  // Fetch username from Firestore
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData && userData.username) {
              console.log("Username:", userData.username);
            } else {
              console.log("No username found for this user.");
            }
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching username:", error);
        }
      }
    };

    fetchUsername();
  }, [user]);

  // Save data to Firestore for the signed-in user
  const saveDataToFirestore = async (data: SensorData) => {
    if (user) {
      try {
        // Reference to the user document in Firestore
        const userDocRef = doc(db, "users", user.uid);
        const sensorDataRef = collection(userDocRef, "sensorData");

        // Add sensor data to the collection
        await addDoc(sensorDataRef, {
          humidity: data.humidity,
          temperature: data.temperature,
          timestamp: data.timestamp,
        });
        console.log("Sensor data saved to Firestore");
      } catch (error) {
        console.error("Error saving sensor data to Firestore:", error);
      }
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOutUser(auth);
      navigate("/landing-page");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Fetch sensor data and append it to the table, then save it to Firestore
  useEffect(() => {
    const sensorRef = ref(database, "sensor");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();

        // Construct a new sensor reading object
        const latestReading: SensorData = {
          id: sensorData.length + 1, // Incremental ID for each row
          humidity: data.humidity,
          temperature: data.temperature,
          timestamp: new Date().toLocaleString(),
        };

        // Check if the current reading is different from the last one (to avoid duplication)
        const isDuplicate =
          sensorData.length > 0 &&
          sensorData[sensorData.length - 1].timestamp ===
            latestReading.timestamp &&
          sensorData[sensorData.length - 1].temperature ===
            latestReading.temperature &&
          sensorData[sensorData.length - 1].humidity === latestReading.humidity;

        // Only update state and Firestore if the reading is new
        if (!isDuplicate) {
          setSensorData((prevData) => [...prevData, latestReading]);
          saveDataToFirestore(latestReading);
        }
      }
    });

    return () => unsubscribe();
  }, [user]);

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/landing-page");
      } else if (!currentUser.emailVerified) {
        setOpenDialog(true);
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Handle dialog close
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Disable scroll for the entire page
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  // Prepare data for LineChart
  const temperatureData = sensorData.map((data) => data.temperature);
  const humidityData = sensorData.map((data) => data.humidity);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack>
        <Header />
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ paddingX: 10 }}
        >
          <Stack spacing={2}>
            {user && (
              <Typography variant="h4" gutterBottom>
                Welcome, {user.displayName || "User"} !
              </Typography>
            )}

            {/* Toggle Button Group */}
            <Stack
              direction={"row"}
              className="flex items-center justify-center"
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                Sensor Data
              </Typography>
              <Box flexGrow={1} />
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                size="small"
              >
                <ToggleButton value="left" aria-label="left aligned">
                  <TableRowsIcon />
                </ToggleButton>
                <ToggleButton value="center" aria-label="centered">
                  <ShowChartIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Stack>

            {/* Conditional Rendering of Table or LineChart */}
            {alignment === "left" && (
              <Box className="flex justify-center items-center">
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: 650,
                    overflowY: "auto",
                    width: 1250,
                    "&::-webkit-scrollbar": {
                      width: 4,
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "#f0f0f0",
                      borderRadius: 4,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#D9D9D9",
                      borderRadius: 4,
                      "&:hover": {
                        backgroundColor: "#909090",
                      },
                    },
                  }}
                >
                  <Table
                    sx={{
                      backgroundColor: "background.paper",
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Temperature (°C)</TableCell>
                        <TableCell align="center">Humidity (%)</TableCell>
                        <TableCell align="center">Date and Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sensorData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell align="center">
                            {row.temperature} &#x00b0;C
                          </TableCell>
                          <TableCell align="center">
                            {row.humidity} &#x0025;
                          </TableCell>
                          <TableCell align="center">{row.timestamp}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {alignment === "center" && (
              <Box
                className="flex justify-center items-center"
                sx={{ width: 1250, height: 650 }}
              >
                <LineChart
                  xAxis={[
                    {
                      data: Array.from(
                        { length: sensorData.length },
                        (_, i) => i + 1
                      ),
                    },
                  ]}
                  series={[
                    {
                      data: temperatureData,
                      color: "#DD8261",
                      label: "Temperature (°C)",
                    },
                    {
                      data: humidityData,
                      color: "#75ABB2",
                      label: "Humidity (%)",
                    },
                  ]}
                  width={700}
                  height={500}
                />
              </Box>
            )}
          </Stack>
        </Stack>

        {/* Email Verification Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Warning</DialogTitle>
          <DialogContent>
            <DialogContentText>Verify your Email First</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                handleCloseDialog();
                handleSignOut();
                window.location.href = "https://mail.google.com";
              }}
              color="primary"
            >
              Check your Email
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </ThemeProvider>
  );
};

export default Dashboard;
