import { Box } from "@mui/material";
import ProfileDetail from "../components/common/ProfileDetail";
import ProfileHeader from "../components/common/ProfileHeader";
import UserActivity from "../components/common/UserActivity";
import backgroundImage from "../assets/profile.jpg";

const Profile = () => {
  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
      }}
    >
      <Box paddingTop="6rem" paddingX="9rem">
        {/* Header */}
        <ProfileHeader />
        {/* Header */}

        {/* Detail */}
        <ProfileDetail />
        {/* Detail */}

        {/* Activify */}
        <UserActivity />
        {/* Activify */}
      </Box>
    </Box>
  );
};

export default Profile;
