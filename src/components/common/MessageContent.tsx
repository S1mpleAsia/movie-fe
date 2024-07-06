import { Box } from "@mui/material";
import MessageCard from "./MessageCard";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserMessageType } from "../../types/MessageType";

type MessageContentProps = {
  userMessage: UserMessageType[];
  bottomRef: React.RefObject<HTMLInputElement>;
};

const MessageContent = ({ userMessage, bottomRef }: MessageContentProps) => {
  const { chatPartnerId } = useSelector(
    (state: RootState) => state.chatPartnerId
  );

  const filterMessage = (
    userMessage: UserMessageType[],
    chatPartnerId: string
  ) => {
    const filterMessage: UserMessageType | undefined = userMessage
      .filter((item) => item.partnerId === chatPartnerId)
      .at(0);

    return filterMessage;
  };

  return (
    <Box
      paddingTop="1rem"
      paddingBottom="0.5rem"
      height="100vh"
      sx={{
        overflowY: "scroll",
        scrollBehavior: "smooth",
        scrollbarWidth: "thin",
        "&::-webkit-scrollbar": {
          width: "0.4em",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "#555",
        },
      }}
      ref={bottomRef}
    >
      {filterMessage(userMessage, chatPartnerId)?.messageDtoList.map((item) => (
        <MessageCard
          externalInfo={
            filterMessage(userMessage, chatPartnerId)?.userCredential
          }
          message={item}
        />
      ))}
    </Box>
  );
};

export default MessageContent;
