import React from "react";
import { ProfileActivePage } from "../../types/profile.type";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { baseEndpoint, getImage } from "../../utils/constant";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

type ProfileLeftbarProps = {
  active: ProfileActivePage;
  setActive: React.Dispatch<React.SetStateAction<ProfileActivePage>>;
};

const ProfileLeftbar = ({ active, setActive }: ProfileLeftbarProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      padding="20px"
      sx={{
        backgroundColor: "#1e1e1e",
        minWidth: "380px",
      }}
      gap={3}
      borderRadius="8px"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component="img"
        src={getImage(baseEndpoint, "download.jpg")}
        sx={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Typography fontSize="1.4rem" fontWeight="700">
          Vu Tung Duong
        </Typography>
        <Chip
          label="Standard"
          sx={{
            fontSize: "0.8rem",
            fontWeight: "600",
            paddingY: "8px",
            paddingX: "4px",
          }}
        />
      </Stack>

      <Box display="flex" gap={5}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontSize="1.4rem" fontWeight="700">
            40
          </Typography>
          <Typography fontWeight="500">LIKE MOVIE</Typography>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontSize="1.4rem" fontWeight="700">
            4.5K
          </Typography>
          <Typography fontWeight="500">FEEDBACK</Typography>
        </Box>
      </Box>

      <Box width="100%" marginTop="10px">
        <Box
          display="flex"
          gap={2}
          padding="12px"
          sx={{
            backgroundColor:
              active === ProfileActivePage.PERSONAL ? "#1d2a3c" : "inherit",
            cursor: "pointer",
            color: active === ProfileActivePage.PERSONAL ? "#1958d0" : "white",
            "&:hover": {
              backgroundColor:
                active === ProfileActivePage.PERSONAL ? "#1d2a3c" : "#303030",
            },
          }}
          onClick={() => setActive(ProfileActivePage.PERSONAL)}
        >
          <PersonOutlineOutlinedIcon />
          <Typography>Personal Information</Typography>
        </Box>

        <Box
          display="flex"
          gap={2}
          padding="12px"
          sx={{
            cursor: "pointer",
            backgroundColor:
              active === ProfileActivePage.PASSWORD ? "#1d2a3c" : "inherit",
            color: active === ProfileActivePage.PASSWORD ? "#1958d0" : "white",
            "&:hover": {
              backgroundColor:
                active === ProfileActivePage.PASSWORD ? "#1d2a3c" : "#303030",
            },
          }}
          onClick={() => setActive(ProfileActivePage.PASSWORD)}
        >
          <LockOutlinedIcon />
          <Typography>Change password</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileLeftbar;
