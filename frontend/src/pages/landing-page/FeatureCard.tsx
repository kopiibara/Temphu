import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  titleColor?: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  titleColor,
}) => {
  return (
    <Box className="h-full flex justify-between items-center w-full">
      <Stack spacing={4}>
        <Box>{icon}</Box>
        <Stack spacing={1}>
          <Typography variant="h4" sx={{ color: titleColor }}>
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: "24rem",
            }}
          >
            {description}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default FeatureCard;
