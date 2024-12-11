import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

function ThemeProvider(mode: PaletteMode = "light") {
  return createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: {
              default: "#FDFBFB",
            },
            text: {
              primary: "#0A0A0A",
              secondary: "#0A0A0A",
            },
          }
        : {
            background: {
              default: "#0A0A0A",
            },
            text: {
              primary: "#FFFEFE",
              secondary: "#FFFEFE",
            },
          }),
    },
    typography: {
      fontFamily: "Questrial, sans-serif",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
        },
      },
    },
  });
}

export default ThemeProvider;
