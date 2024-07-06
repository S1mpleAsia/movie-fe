import { Box, Divider, Stack, Typography } from "@mui/material";
import InboxBox from "./InboxBox";
import { UserMessageType } from "../../types/MessageType";

type ChatSidebarProps = {
  userMessage: UserMessageType[];
  setDefaultScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatSidebar = ({ userMessage, setDefaultScreen }: ChatSidebarProps) => {
  return (
    <Box width="25%" height="100vh" paddingTop="2rem">
      <Stack>
        <Typography variant="body1" fontSize="1.3rem" fontWeight="400">
          Messages
        </Typography>
        <Typography
          variant="body1"
          fontSize="0.9rem"
          sx={{ opacity: 0.8 }}
          fontStyle="italic"
        >
          Keep in touch with friends and clients
        </Typography>
      </Stack>

      <Box marginTop="1.5rem">
        {/* Search */}
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          size="small"
          sx={{ width: "100%", paddingRight: "40px", marginBottom: "1.5rem" }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        /> */}
        <Divider sx={{ height: "3px", marginBottom: "1rem" }} />
        {/* Search */}

        {/* Inbox list */}

        <Box display="flex" flexDirection="column" gap={2}>
          {userMessage.map((message) => (
            <InboxBox message={message} setDefaultScreen={setDefaultScreen} />
          ))}
        </Box>
        {/* Inbox list */}
      </Box>
    </Box>
  );
};

export default ChatSidebar;
