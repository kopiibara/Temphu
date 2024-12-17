import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        py: 4,
        backgroundColor: "background.paper",
        color: "text.primary",
      }}
    >
      <motion.div whileHover={{ scale: 1.1 }}>
        <Link
          href="https://github.com/kopiibara/Temphu.git"
          target="_blank"
          rel="noopener"
          sx={{
            color: "inherit",
            textDecoration: "none",
            "&:hover": { color: "#AA684A" },
          }}
        >
          Github
        </Link>
      </motion.div>

      <Typography variant="body2" sx={{ mt: 2, opacity: 0.7 }}>
        By BSCS - 3A
      </Typography>
    </Box>
  );
};

export default Footer;
