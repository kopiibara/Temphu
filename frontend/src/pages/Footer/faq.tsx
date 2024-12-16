import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider, CssBaseline, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThemeProvide from "../../assets/ThemeProvider";

const FAQPage = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the \"Sign Up\" button at the top of the homepage and fill in your name, email address, and password. After signing up, you'll receive a confirmation email to verify your account."
    },
    {
      question: "I forgot my password. What should I do?",
      answer: "Go to the login page and click on the \"Forgot Password?\" link. Enter your registered email address, and we'll send you instructions to reset your password."
    },
    {
      question: "Can I update my profile information?",
      answer: "Yes, log in to your account and navigate to the \"Profile Settings\" page to update your details."
    },
    {
      question: "How do I delete my account?",
      answer: "If you wish to delete your account, please contact our support team at support@temphu.com. Note that deleting your account will remove all your data permanently."
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
            Frequently Asked Questions
          </Typography>
          <Box sx={{ width: '100%', maxWidth: 800 }}>
            {faqs.map((faq, index) => (
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
                      {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{ fontSize: '1.1rem' }}>
                      {faq.answer}
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

export default FAQPage;

