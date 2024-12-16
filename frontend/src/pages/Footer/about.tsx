import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ThemeProvider, CssBaseline, Grid, Card, CardContent, CardMedia } from "@mui/material";
import ThemeProvide from "../../assets/ThemeProvider";

const AboutPage = () => {
  const teamMembers = [
    { 
      name: "Jhediael Ramboyong",
      image: "/jhed.jpg",
      role: "Team Member"
    },
    { 
      name: "Lyniel Aya-ay",
      image: "/niel.jpg",
      role: "Team Member"
    },
    { 
      name: "Emannuel Pabua",
      image: "/pabua.jpg",
      role: "Team Member"
    },
    { 
      name: "Justine Peralta",
      image: "/jb.jpg",
      role: "Team Member"
    },
  ];

  const projectManager = { 
    name: "Carl James Juliane",
    image: "/cj.jpg",
    role: "Project Manager"
  };

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
        <Box sx={{ p: 4, minHeight: '100vh', background: 'linear-gradient(to bottom, #1a1a1a, #2a2a2a)' }}>
          <Typography variant="h2" gutterBottom sx={{ color: '#FFFFFF', textAlign: 'center', mb: 6, fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            About Us
          </Typography>
          
          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#AA684A', mb: 3 }}>
              Mission Statement
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '2.0rem', color: '#FFFFFF', lineHeight: 1.6 }}>
              At Temphu, our mission is to provide straightforward and reliable humidity monitoring tools for everyone. As a new, self-made platform, we are committed to delivering accurate, real-time humidity data in an easy-to-use format. Our goal is to help individuals and small businesses better understand and manage their environments with a focus on simplicity and accessibility.
            </Typography>
          </Box>

          <Box sx={{ mb: 8 }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#AA684A', mb: 3 }}>
              Vision Statement
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: '2.0rem', color: '#FFFFFF', lineHeight: 1.6 }}>
              Our vision is to grow Temphu into a trusted, user-friendly resource for humidity data, empowering people to take control of their environment. We aspire to continually improve and expand our features, providing even more value to our users as we learn and grow together.
            </Typography>
          </Box>

          <Typography variant="h3" gutterBottom sx={{ color: '#FFFFFF', textAlign: 'center', mb: 6 }}>
            Our Team
          </Typography>

          <Grid container spacing={4} justifyContent="center" sx={{ mb: 8 }}>
  {teamMembers.map((member, index) => (
    <Grid item key={index} xs={12} sm={6} md={3}>
      <motion.div 
        whileHover={{ scale: 1.05 }} 
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <Card sx={{ 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          color: '#FFFFFF',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <CardMedia
            component="img"
            height="300"
            image={member.image}
            alt={member.name}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ textAlign: 'center', mb: 1, fontSize: '1.5rem' }} // Larger font size
            >
              {member.name}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ textAlign: 'center', color: '#AA684A', fontSize: '1.2rem' }} // Larger font size
            >
              {member.role}
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  ))}
</Grid>

<Typography 
  variant="h4" 
  gutterBottom 
  sx={{ color: '#FFFFFF', textAlign: 'center', mb: 4, fontSize: '2rem' }} // Larger font size
>
  Project Manager
</Typography>
<Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
  <motion.div 
    whileHover={{ scale: 1.05 }} 
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <Card sx={{ 
      maxWidth: 400, 
      backgroundColor: 'rgba(255,255,255,0.1)', 
      color: '#FFFFFF'
    }}>
      <CardMedia
        component="img"
        height="400"
        image={projectManager.image}
        alt={projectManager.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ textAlign: 'center', mb: 1, fontSize: '2rem' }} // Larger font size
        >
          {projectManager.name}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ textAlign: 'center', color: '#AA684A', fontSize: '1.5rem' }} // Larger font size
        >
          {projectManager.role}
        </Typography>
      </CardContent>
    </Card>
  </motion.div>
</Box>


        </Box>
      </motion.div>
    </ThemeProvider>
  );
};

export default AboutPage;

