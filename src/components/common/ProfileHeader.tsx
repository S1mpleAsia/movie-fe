import { Box } from "@mui/material";
import { IconContext } from "react-icons";
import { MdPhotoCamera } from "react-icons/md";

const ProfileHeader = () => {
  return (
    <>
      <Box position="relative">
        <Box
          component="img"
          position="relative"
          sx={{
            width: "100%",
            height: "350px",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "8px",
          }}
          src={require("../../assets/cinema-bg.jpg")}
        />

        <Box
          component="label"
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          right="50px"
          bottom="40px"
          sx={{
            backgroundColor: "rgb(0 0 0 / 0.5)",
            paddingX: "10px",
            paddingY: "12px",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          <input type="file" style={{ display: "none" }} />
          <IconContext.Provider value={{ size: "1.4rem" }}>
            <MdPhotoCamera style={{ marginRight: "0.5rem" }} />
          </IconContext.Provider>
          Change cover image
        </Box>

        <Box
          component="img"
          position="absolute"
          bottom="-90px"
          left="50px"
          src={require("../../assets/no-avatar.png")}
          width="180px"
          height="180px"
          sx={{
            borderRadius: "14px",
            border: "3px solid white",
          }}
        />
      </Box>
    </>
  );
};

export default ProfileHeader;
