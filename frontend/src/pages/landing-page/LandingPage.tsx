import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [mode, setMode] = useState("dark");
  const theme = ThemeProvide(mode as "light" | "dark");
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const handleLogoClick = () => {
    navigate("/landing-page");
  };

  const handleGetStarted = () => {
    navigate("/account/create-account");
  };

  const handleLogin = () => {
    navigate("/account/sign-in");
  };

  const features = [
    {
      icon: <RealTimeOutlinedIcon sx={{ fontSize: 80, color: "#AA684A" }} />,
      title: "Real-Time Monitoring",
      description:
        "Get instant access to live temperature and humidity readings from your environment, updated in real-time through a web interface. ",
    },
    {
      icon: (
        <DataOutlinedOutlinedIcon sx={{ fontSize: 80, color: "#76ABB2" }} />
      ),
      title: "Interactive Data Visualization",
      description:
        "Easily view and analyze environmental trends with intuitive monitoring.",
    },
    {
      icon: <CloudDoneOutlinedIcon sx={{ fontSize: 80, color: "#AA684A" }} />,
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

  const featureSectionRef = useRef(null);
  const toolSectionRef = useRef(null);
  const featureSectionInView = useInView(featureSectionRef);
  const toolSectionInView = useInView(toolSectionRef);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack className="flex justify-center items-center">
        <Stack spacing={12}>
          {/* Logo */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            className="flex items-center sticky top-0 z-10 pt-10 pb-5"
            sx={{
              backgroundColor:
                mode === "light" ? "#F0F0F0" : "background.paper",
              transition: "background-color 0.3s ease, box-shadow 0.3s ease",
              paddingX: { xs: 2, md: 6 },
            }}
            alignItems="center"
          >
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
          <Stack
            className="flex items-center justify-center w-full"
            sx={{ px: { xs: 2, md: 6 } }}
          >
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 6, md: 14 }}
              alignItems="center"
            >
              <Stack spacing={6} textAlign={{ xs: "center", md: "left" }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                  }}
                >
                  Stay in Control of <br />
                  Your Environment, <br /> Always.
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                  }}
                >
                  Track <span style={{ color: "#DD8261" }}>temperature</span>{" "}
                  and
                  <span style={{ color: "#75ABB2" }}> humidity</span> <br />
                  effortlessly with real-time monitoring.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent={{ xs: "center", md: "flex-start" }}
                >
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
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                    }}
                    onClick={handleGetStarted}
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
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                    }}
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Stack>
              </Stack>
              <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                <img
                  src="/placeholder.png"
                  alt="hero"
                  style={{ width: "100%", objectFit: "contain" }}
                />
              </Box>
            </Stack>
          </Stack>

          {/* Features Section */}
          <Box
            className="flex items-center justify-center"
            ref={featureSectionRef}
            sx={{ px: { xs: 2, md: 6 } }}
          >
            <Stack spacing={10} alignItems="center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  featureSectionInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
              >
                <Typography variant="h3" textAlign="center">
                  Features
                </Typography>
              </motion.div>
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={10}
                alignItems="center"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={
                      featureSectionInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.7 }
                    }
                    transition={{
                      duration: 0.6,
                      delay: index * 0.4,
                      ease: "easeOut",
                    }}
                  >
                    <FeatureCard
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  </motion.div>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* Tools Section */}
          <Stack
            className="flex items-center justify-center"
            ref={toolSectionRef}
            sx={{ px: { xs: 2, md: 6 } }}
          >
            <Stack spacing={10}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  toolSectionInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.7 }
                }
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                <Typography variant="h3" textAlign="center">
                  Tools Used
                </Typography>
              </motion.div>
              <Stack direction={{ xs: "column", md: "row" }} spacing={16}>
                {tools.map((tool, index) => (
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
                    <ToolsCard
                      image={tool.image}
                      description={tool.description}
                    />
                  </motion.div>
                ))}
              </Stack>
            </Stack>
          </Stack>

          {/* Footer */}
          <Footer />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default LandingPage;
