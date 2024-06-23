import React, { useEffect, useRef, useState } from "react";
import { ProfileActivePage } from "../../types/profile.type";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { baseEndpoint, getImage } from "../../utils/constant";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { GeneralType } from "../../types/GeneralType";
import { storageAPI } from "../../api/modules/upload.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userAPI } from "../../api/modules/user.api";
import {
  AvatarUpdateRequest,
  CredentialType,
} from "../../types/CredentialType";
import { updateInfo } from "../../redux/features/userSlice";
import { preferenceAPI } from "../../api/modules/preference.api";
import { feedbackAPI } from "../../api/modules/feedback.api";

type ProfileLeftbarProps = {
  active: ProfileActivePage;
  setActive: React.Dispatch<React.SetStateAction<ProfileActivePage>>;
};

const ProfileLeftbar = ({ active, setActive }: ProfileLeftbarProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [hoverAvatar, setHoverAvatar] = useState(false);
  const [totalFavourite, setTotalFavourite] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef();

  const handleMouseLeave = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        setHoverAvatar(false);
      }
    }
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg"
      ) {
        const formData = new FormData();
        formData.set("file", e.target.files[0]);

        const response: GeneralType<any> = await (
          await storageAPI.uploadFile(formData)
        ).data;

        console.log(response);

        if (response.status.statusCode !== 200)
          toast.error("Upload avatar failed. Please try again");
        else {
          const request: AvatarUpdateRequest = {
            id: user?.id || "",
            path: e.target.files[0].name,
          };

          const credentialResponse: GeneralType<CredentialType> = (
            await userAPI.updateAvatar(request)
          ).data;

          if (credentialResponse.status.statusCode !== 200) {
            toast.error("Update failed");
          } else {
            toast.success("Update info successfully");
            dispatch(updateInfo(credentialResponse.data));
          }
        }
      }
    }
  };

  useEffect(() => {
    const getTotalFavourite = async () => {
      const response: GeneralType<number> = (
        await preferenceAPI.getPreferenceSummary(user?.id || "0")
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else setTotalFavourite(response.data);
    };

    const getTotalFeedback = async () => {
      const response: GeneralType<number> = (
        await feedbackAPI.getFeedbackSummary(user?.id || "0")
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else setTotalFeedback(response.data);
    };

    getTotalFavourite();
    getTotalFeedback();
  }, []);

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
        position="relative"
        sx={{
          cursor: "pointer",
        }}
        ref={containerRef}
        onMouseEnter={() => setHoverAvatar(true)}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          component="img"
          src={getImage(baseEndpoint, user?.imagePath || "download.jpg")}
          sx={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />

        <Box
          position="absolute"
          width="100%"
          height="100%"
          borderRadius="50%"
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: hoverAvatar ? "block" : "none",
          }}
        ></Box>

        <Box
          component="label"
          sx={{
            cursor: "pointer",
            display: hoverAvatar ? "block" : "none",
          }}
        >
          <Box
            component="input"
            type="file"
            sx={{
              display: "none",
              width: "100%",
              height: "100%",
            }}
            ref={fileRef}
            onChange={handleChangeImage}
          />

          <CameraAltIcon
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "rgba(255, 255, 255, 0.8)",
              width: "2.3rem",
              height: "2.3rem",
            }}
          />
        </Box>
      </Box>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Typography fontSize="1.4rem" fontWeight="700">
          {user?.fullName}
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
            {totalFavourite}
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
            {totalFeedback}
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
