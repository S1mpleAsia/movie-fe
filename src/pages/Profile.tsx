import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ProfileActivePage } from "../types/profile.type";
import ProfileLeftbar from "../components/common/ProfileLeftbar";
import PersonalInfo from "../components/common/PersonalInfo";
import ChangePassword from "./ChangePassword";
import uiConfigs from "../configs/ui.config";
import Container from "../components/common/Container";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { routesGen } from "../routes/route";

const Profile = () => {
  const [active, setActive] = useState<ProfileActivePage>(
    ProfileActivePage.PERSONAL
  );
  const { user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate(routesGen.home);
  }, [user]);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Profile">
        <Box display="flex" flexDirection="row" gap={2}>
          <ProfileLeftbar active={active} setActive={setActive} />

          {active === ProfileActivePage.PERSONAL && user && <PersonalInfo />}
          {active === ProfileActivePage.PASSWORD && user && <ChangePassword />}
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
