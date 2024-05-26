import { Box, Stack, Typography } from "@mui/material";
import { UserMessageType } from "../../types/MessageType";
import { useDispatch } from "react-redux";
import { setChatPartnerId } from "../../redux/features/chatPartnerSlice";

type InboxBoxProps = {
  message: UserMessageType;
  setDefaultScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const InboxBox = ({ message, setDefaultScreen }: InboxBoxProps) => {
  const dispatch = useDispatch();

  return (
    <Box
      display="flex"
      alignItems="center"
      paddingY="5px"
      paddingX="8px"
      gap={2}
      sx={{
        borderRadius: "10px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "red",
        },
      }}
      onClick={() => {
        setDefaultScreen(false);
        dispatch(setChatPartnerId(message.partnerId));
      }}
    >
      <Box
        component="img"
        src={require("../../assets/no-avatar.png")}
        alt="Avatar"
        sx={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
        }}
      />

      <Stack>
        <Typography>{message.userCredential.fullName}</Typography>
        <Typography
          maxWidth="200px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
        >
          {
            message.messageDtoList.at(message.messageDtoList.length - 1)
              ?.content
          }
        </Typography>
      </Stack>
    </Box>
  );
};

export default InboxBox;
