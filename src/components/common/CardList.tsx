import { Box } from "@mui/material";
import React from "react";
import CardComponent from "./CardComponent";

const CardList = () => {
  return (
    <Box display="flex" gap={5}>
      <CardComponent title="Total Revenue" value={4000} extraValue={4000} />
      <CardComponent title="Total Revenue" value={4000} extraValue={4000} />
      <CardComponent title="Total Revenue" value={4000} extraValue={4000} />
    </Box>
  );
};

export default CardList;
