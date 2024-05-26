import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import InboxBox from "./InboxBox";
import { UserMessageType } from "../../types/MessageType";

type ChatSidebarProps = {
  userMessage: UserMessageType[];
  setDefaultScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatSidebar = ({ userMessage, setDefaultScreen }: ChatSidebarProps) => {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];

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
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          size="small"
          sx={{ width: "100%", paddingRight: "40px", marginBottom: "1.5rem" }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
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
