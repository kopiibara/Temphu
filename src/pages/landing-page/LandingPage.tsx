import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion"; // Import necessary Framer Motion utilities
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ThemeProvider, CssBaseline } from "@mui/material";

import ThemeProvide from "../../assets/ThemeProvider";
import FeatureCard from "./FeatureCard";
import ToolsCard from "./ToolsCard";
import Footer from "./Footer";

import RealTimeOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import DataOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import CloudDoneOutlinedIcon from "@mui/icons-material/CloudDoneOutlined";

const LandingPage = () => {
  const [mode, setMode] = useState("dark");

  const theme = ThemeProvide(mode as "light" | "dark");

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const features = [
    {
      icon: (
        <RealTimeOutlinedIcon
          sx={{
            fontSize: 80,
            color: "#AA684A",
          }}
        />
      ),
      title: "Real-Time Monitoring",
      description:
        "Get instant access to live temperature and humidity readings from your environment, updated in real-time through a web interface. ",
    },
    {
      icon: (
        <DataOutlinedOutlinedIcon
          sx={{
            fontSize: 80,
            color: "#76ABB2",
          }}
        />
      ),
      title: "Interactive Data Visualization",
      description:
        "Easily view and analyze environmental trends with intuitive monitoring.",
    },
    {
      icon: (
        <CloudDoneOutlinedIcon
          sx={{
            fontSize: 80,
            color: "#AA684A",
          }}
        />
      ),
      title: "Remote Accessibility",
      description:
        "Monitor your environment from any device, anytime, with easy access to real-time data.",
    },
  ];

  const tools = [
    {
      image: "/placeholder.png",
      description: (
        <>
          <span style={{ color: "#AA684A" }}>ESP8266</span> a low-cost
          microcontroller capable of WiFi connectivity. Used to send the data to
          the website in real-time.
        </>
      ),
    },
    {
      image: "/placeholder.png",
      description: (
        <>
          <span style={{ color: "#76ABB2" }}>DHT22</span> a digital sensor that
          measures temperature and humidity with high accuracy and reliability.
        </>
      ),
    },
  ];

  // Reference for the feature section
  const featureSectionRef = useRef(null);
  const toolSectionRef = useRef(null);
  // Initialize isInView for each section
  const featureSectionInView = useInView(featureSectionRef);
  const toolSectionInView = useInView(toolSectionRef);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack className="flex justify-center items-center">
        <Stack spacing={14}>
          {/* Logo */}
          <Stack
            direction={"row"}
            spacing={1.5}
            className="flex items-center sticky top-0 z-10 pt-10 pb-5 transition-all"
            sx={{
              backgroundColor: mode === "light" ? "#FDFBFB" : "#0A0A0A",
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <img src="/temphu-logo.png" alt="temphu" />
            <Typography variant="h5">Temphu</Typography>
            <Box flexGrow={1} />
            <Button
              variant="text"
              onClick={toggleMode}
              sx={{
                color: "gray",
                borderRadius: "8px",
                py: 1,
                px: 3,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              {mode === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
          </Stack>

          {/* Hero Section */}
          <Box className="flex items-center justify-center">
            <Stack direction={"row"} spacing={14}>
              <Stack spacing={6}>
                <Typography variant="h1">
                  Stay in Control <br />
                  of Your Environment, <br /> Always.
                </Typography>
                <Typography variant="h4" sx={{ lineHeight: 2 }}>
                  Track <span style={{ color: "#DD8261" }}>temperature</span>{" "}
                  and
                  <span style={{ color: "#75ABB2" }}> humidity</span>{" "}
                  effortlessly <br />
                  with real-time monitoring.
                </Typography>

                <Stack direction={"row"} spacing={2}>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "#DD8261",
                      color: "#DD8261",
                      "&:hover": {
                        backgroundColor: "#DD8261",
                        color: "#FFFEFE",
                      },
                      borderRadius: "8px",
                      py: 1,
                      px: 3,
                      textTransform: "none",
                      fontSize: "1.2rem",
                    }}
                  >
                    Get Started
                  </Button>

                  <Button
                    variant="text"
                    sx={{
                      color: "#75ABB2",
                      "&:hover": {
                        backgroundColor: "#75ABB2",
                        color: "#FFFEFE",
                      },
                      borderRadius: "8px",

                      py: 1,
                      px: 3,
                      textTransform: "none",
                      fontSize: "1.2rem",
                    }}
                  >
                    Login
                  </Button>
                </Stack>
              </Stack>
              <Box>
                <img src="/placeholder.png" alt="hero" />
              </Box>
            </Stack>
          </Box>

          {/* Features Section */}
          <Box
            className="flex items-center justify-center"
            ref={featureSectionRef} // Attach reference
          >
            <Stack spacing={10} className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  featureSectionInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                <Typography variant="h3" textAlign="center">
                  Features{" "}
                </Typography>
              </motion.div>
              <Stack direction={"row"} spacing={10}>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      featureSectionInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.9 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: index * 0.4,
                      ease: "easeOut",
                    }}
                  >
                    <Box>
                      <FeatureCard
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        titleColor={
                          index === 0 || index === 2
                            ? "#AA684A"
                            : index === 1
                            ? "#76ABB2"
                            : "inherit"
                        }
                      />
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* Tools Section */}
          <Box
            className="flex items-center justify-center"
            ref={toolSectionRef} // Attach reference
          >
            <Stack spacing={10} className="flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  toolSectionInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                <Typography variant="h3" textAlign="center">
                  Powered by these Tools
                </Typography>
              </motion.div>
              <Stack direction={"row"} spacing={10}>
                {tools.map((tools, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      toolSectionInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.9 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: index * 0.4,
                      ease: "easeOut",
                    }}
                  >
                    <Box>
                      <ToolsCard
                        image={tools.image}
                        description={tools.description}
                      />
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* Footer */}
          <Footer />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default LandingPage;
