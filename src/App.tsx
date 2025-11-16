import { AppBar, Box, Button, Container, styled, Toolbar } from "@mui/material";
import Home from "./pages/Home";
import PlanetHeader from "./components/PlanetHeader";

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Meteora", href: "#meteora" },
  { label: "Galaxies", href: "#galaxies" },
  { label: "Solar System", href: "#solar-system" },
  { label: "Earth", href: "#earth" },
];

export default function App() {
  return (
    <Box className="app-wrapper">
      <AppBar
        position="static"
        sx={{
          background: "transparent",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {navItems.map((item) => (
            <Button key={item.label} color="inherit" href={item.href}>
              {item.label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 3, background: "transparent" }}>
        <PlanetHeader />
        <Home />
      </Container>
    </Box>
  );
}
