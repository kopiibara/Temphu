import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider, CssBaseline, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThemeProvide from "../../assets/ThemeProvider";

const PrivacyPage = () => {
  const privacySections = [
    {
      title: "Introduction",
      content: "Welcome to Temphu. We prioritize protecting your privacy, and it is very important to us. This Privacy Policy explains how we collect, use, and protect the information you provide while using our website, which offers humidity-related data, services, and features, including login and registration functionalities."
    },
    {
      title: "Information We Collect",
      content: "We collect personal information such as your name, email address, and usage data when you use our services. This information helps us provide and improve our services."
    },
    {
      title: "How We Use Your Information",
      content: "We use your information to provide and improve our services, communicate with you, and ensure the security of our platform. We do not sell your personal information to third parties."
    },
    {
      title: "Data Security",
      content: "We implement industry-standard security measures to protect your data from unauthorized access, disclosure, alteration, and destruction."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You can also opt-out of certain data collection practices. Contact us for any privacy-related requests."
    }
  ];

  return (
    <ThemeProvider theme={ThemeProvide("dark")}>
      <CssBaseline />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 40,
          mass: 1,
        }}
      >
        <Box 
          sx={{ 
            p: 4, 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #1a1a1a, #2a2a2a)'
          }}
        >
          <Typography 
            variant="h2" 
            gutterBottom 
            sx={{ 
              mb: 4, 
              color: '#FFFFFF',
              textAlign: 'center',
              fontWeight: 'bold',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Privacy Policy
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            {privacySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Accordion 
                  sx={{ 
                    mb: 2, 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#FFFFFF',
                    '&:before': {
                      display: 'none',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: '#AA684A' }} />}
                    aria-controls={`panel${index}a-content`}
                    id={`panel${index}a-header`}
                  >
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {section.title}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ fontSize: '1.1rem' }}>
                      {section.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </Box>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
};

export default PrivacyPage;

