import { Box } from "@mui/material";
import { useState } from "react";
import { ProfileActivePage } from "../types/profile.type";
import ProfileLeftbar from "../components/common/ProfileLeftbar";
import PersonalInfo from "../components/common/PersonalInfo";
import ChangePassword from "./ChangePassword";
import uiConfigs from "../configs/ui.config";
import Container from "../components/common/Container";

const Profile = () => {
  const [active, setActive] = useState<ProfileActivePage>(
    ProfileActivePage.PERSONAL
  );

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Profile">
        <Box display="flex" flexDirection="row" gap={2}>
          <ProfileLeftbar active={active} setActive={setActive} />

          {active === ProfileActivePage.PERSONAL && <PersonalInfo />}
          {active === ProfileActivePage.PASSWORD && <ChangePassword />}
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
