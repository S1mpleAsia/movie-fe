import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box, LinearProgress, Paper, Toolbar } from "@mui/material";
import Logo from "./Logo";

const GlobalLoading = () => {
  const { globalLoading } = useSelector(
    (state: RootState) => state.globalLoading
  );

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    console.log("Hello world");
    if (globalLoading) {
      setisLoading(true);
    } else {
      setTimeout(() => {
        setisLoading(false);
      }, 1000);
    }
  }, []);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
        }}
      >
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Logo />
        </Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;
