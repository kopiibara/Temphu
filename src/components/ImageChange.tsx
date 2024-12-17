import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

const ImageChange = () => {
  // Array of image URLs
  const images = ["heat.jpg", "humid.jpg"];

  // State to keep track of the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // useEffect hook to change the image every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once when component mounts

  return (
    <Box className=" max-w-[28rem] h-full">
      <img
        src={images[currentImageIndex]}
        alt="Slideshow"
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
};

export default ImageChange;
