import { Box, Stack, Typography } from "@mui/material";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import PhoneTwoToneIcon from "@mui/icons-material/PhoneTwoTone";
import { UserMessageType } from "../../types/MessageType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CredentialType } from "../../types/CredentialType";
import { baseEndpoint, getImage } from "../../utils/constant";

type MessageHeaderProps = {
  userMessage: UserMessageType[];
};

const MessageHeader = ({ userMessage }: MessageHeaderProps) => {
  const { chatPartnerId } = useSelector(
    (state: RootState) => state.chatPartnerId
  );

  const userCredential: CredentialType | undefined = userMessage.find(
    (item) => item.partnerId === chatPartnerId
  )?.userCredential;

  return (
    <Box display="flex" position="relative" justifyContent="space-between">
      {/* Left side */}
      <Box className="leftside" display="flex" gap={2}>
        <Box
          component="img"
          src={getImage(
            baseEndpoint,
            userCredential?.imagePath || "no-avatar.png"
          )}
          alt=""
          sx={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Stack justifyContent="center">
          <Typography variant="body1" fontSize="1.1rem" fontWeight={700}>
            {userCredential?.fullName}
          </Typography>
          <Typography
            variant="body1"
            fontSize="0.9rem"
            sx={{ opacity: 0.8, color: "#34d347" }}
          >
            Online
          </Typography>
        </Stack>
      </Box>

      {/* Left side */}

      {/* Right side */}
      <Box display="flex" justifyContent="center" alignItems="center" gap={3}>
        <PhoneTwoToneIcon />
        <VideocamOutlinedIcon />
      </Box>
      {/* Right side */}
    </Box>
  );
};

export default MessageHeader;
