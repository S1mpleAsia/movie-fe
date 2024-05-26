import { Box } from "@mui/material";
import Container from "../components/common/Container";
import PlanCompare from "../components/common/PlanCompare";
import PlanDetail from "../components/common/PlanDetail";
import uiConfigs from "../configs/ui.config";

const Subscription = () => {
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Subscription">
        <Box display="flex" flexDirection="column" gap={3}>
          <PlanDetail />
          <PlanCompare />
        </Box>
      </Container>
    </Box>
  );
};

export default Subscription;
