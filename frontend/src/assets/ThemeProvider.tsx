import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

function ThemeProvider(mode: PaletteMode = "light") {
  let theme = createTheme({
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
      fontFamily: "Questrial",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
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

  theme = responsiveFontSizes(theme);

  return theme;
}

export default ThemeProvider;
