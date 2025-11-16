import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import GalaxyScene from "../components/GalaxyScene";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
    <div id="home">
      <Paper elevation={3} sx={{ height: "75vh", overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%" }}>
          {/* Canvas MUST wrap GalaxyScene */}
          <Canvas camera={{ position: [0, 12, 70], fov: 50 }}>
            <GalaxyScene />
          </Canvas>
        </div>
      </Paper>
    </div>
  );
}
