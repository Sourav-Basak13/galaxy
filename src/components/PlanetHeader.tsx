import React from "react";
import { Box, Typography, Grid } from "@mui/material";

export default function PlanetHeader() {
  return (
    <Box
      sx={{
        width: "100%",
        py: 6,
        background: "transparent",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          letterSpacing: "0.4rem",
          fontWeight: 300,
          mb: 4,
        }}
      >
        ETHERON
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ maxWidth: 900, mx: "auto" }}
      >
        {[
          { label: "GALAXY", value: "Andromeda-IV" },
          { label: "DIAMETER", value: "16,400 km" },
          { label: "DAY LENGTH", value: "26 Earth hours" },
          { label: "AVG TEMPERATURE", value: "-20°C to 0°C" },
          { label: "CLIMATE", value: "Polar" },
        ].map((item, i) => (
          <Grid item xs={12} sm={6} md={2.4} key={i}>
            <Box>
              <Typography
                variant="caption"
                sx={{ letterSpacing: "0.15rem", opacity: 0.7 }}
              >
                {item.label}
              </Typography>
              <Typography variant="body1" sx={{ mt: 0.5 }}>
                {item.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
