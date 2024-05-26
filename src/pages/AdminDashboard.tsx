import { Box } from "@mui/material";
import React from "react";
import uiConfigs from "../configs/ui.config";
import Container from "../components/common/Container";
import CardList from "../components/common/CardList";
import DashboardChart from "../components/common/DashboardChart";

const AdminDashboard = () => {
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Dashboard">
        <Box display="flex" flexDirection="column" gap={3}>
          <CardList />
          <DashboardChart />
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
