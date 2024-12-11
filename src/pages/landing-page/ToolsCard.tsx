import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type ToolProps = {
  image: string;
  description: React.ReactNode;
};

const ToolCard: React.FC<ToolProps> = ({ image, description }) => {
  return (
    <Box className="h-full flex justify-center items-center w-full">
      <Stack spacing={4} alignItems="center">
        {/* Display the image */}
        <img
          src={image}
          alt="Tool"
          style={{
            maxWidth: "100%",
            maxHeight: "15rem",
            objectFit: "contain",
          }}
        />

        {/* Display the description */}
        <Typography
          variant="h5"
          textAlign="left"
          sx={{
            maxWidth: "25rem",
          }}
        >
          {description}
        </Typography>
      </Stack>
    </Box>
  );
};

export default ToolCard;
