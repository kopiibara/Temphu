import { useState, useEffect } from "react";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ReactNode } from "react";

interface TransitionProps {
  children: ReactNode;
  to: string;
}

const Transition = ({ children, to }: TransitionProps) => {
  const navigate = useNavigate();
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (fade) {
      setTimeout(() => navigate(to), 500); // Delay to allow fade transition
    }
  }, [fade, to, navigate]);

  const handleClick = () => {
    setFade(true); // Trigger fade transition
  };

  return (
    <>
      <Fade in={!fade} timeout={500}>
        <div onClick={handleClick}>{children}</div>
      </Fade>
    </>
  );
};

export default Transition;
