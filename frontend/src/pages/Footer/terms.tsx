import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider, CssBaseline, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThemeProvide from "../../assets/ThemeProvider";

const TermsPage = () => {
  const termsSection = [
    {
      title: "1. Acceptance of Terms",
      content: "By using our website, including creating an account, using our services, or interacting with our content, you agree to these Terms of Service and any other terms and conditions that may apply to specific services."
    },
    {
      title: "2. User Accounts",
      content: "To access certain features, you may need to create an account. You agree to provide accurate and complete information during the registration process and to keep your account details up to date. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account."
    },
    {
      title: "3. Use of Services",
      content: "You agree to use our website and services only for lawful purposes and in accordance with these Terms. You may not violate any applicable laws, upload harmful content, or interfere with our services."
    },
    {
      title: "4. Data Collection and Privacy",
      content: "We respect your privacy and are committed to protecting your personal information. Please refer to our Privacy Policy for details on how we collect, use, and protect your information. By using our services, you consent to the collection and use of your data as described in our Privacy Policy."
    },
    {
      title: "5. Intellectual Property",
      content: "All content on the website is the property of Temphu or its licensors and is protected by copyright and intellectual property laws. You may not copy, reproduce, modify, or distribute any content from the website without explicit permission from us."
    },
    {
      title: "6. Service Availability",
      content: "We strive to provide reliable and uninterrupted access to our website and services. However, we cannot guarantee that our services will always be available or error-free. We reserve the right to suspend, modify, or discontinue any service at any time without notice."
    },
    {
      title: "7. Limitation of Liability",
      content: "To the fullest extent permitted by law, Temphu is not liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, errors or omissions in the content, or any unauthorized access to your data. You use our website and services at your own risk."
    },
    {
      title: "8. Termination",
      content: "We reserve the right to suspend or terminate your account if you violate these Terms of Service or engage in activities that harm the integrity of the website or our services. You may terminate your account at any time by contacting us."
    },
    {
      title: "9. Changes to the Terms",
      content: "We may update or revise these Terms of Service at any time. Any changes will be posted on this page with an updated 'Last Updated' date. Your continued use of the website after such changes will constitute your acceptance of the revised Terms."
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
            Terms of Service
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            {termsSection.map((section, index) => (
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

export default TermsPage;

