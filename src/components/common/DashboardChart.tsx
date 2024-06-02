import { Box } from "@mui/material";
import UserChart from "./UserChart";
import RevenueChart from "./RevenueChart";

const DashboardChart = () => {
  return (
    <Box display="flex" gap={3}>
      <RevenueChart />
      <UserChart />
    </Box>
  );
};

export default DashboardChart;
