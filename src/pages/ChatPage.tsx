import { Box, Divider } from "@mui/material";
import uiConfigs from "../configs/ui.config";
import ChatSidebar from "../components/common/ChatSidebar";
import MainChat from "../components/common/MainChat";
import { useEffect, useState } from "react";
import { UserMessageType } from "../types/MessageType";
import { messageAPI } from "../api/modules/message.api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { GeneralType } from "../types/GeneralType";
import { toast } from "react-toastify";

const ChatPage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [userMessage, setUserMessage] = useState<UserMessageType[]>([]);
  const [defaultScreen, setDefaultScreen] = useState(true);

  useEffect(() => {
    const getUserMessage = async () => {
      const response: GeneralType<UserMessageType[]> = await (
        await messageAPI.getUserMessage(user?.id || "")
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else setUserMessage(response.data);
    };

    getUserMessage();
  }, []);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent, marginTop: "5rem" }}>
      <Box
        display="flex"
        sx={{ backgroundColor: "#171717" }}
        paddingX="1.5rem"
        paddingBottom="2rem"
        borderRadius="8px"
      >
        <ChatSidebar
          userMessage={userMessage}
          setDefaultScreen={setDefaultScreen}
        />
        <Divider
          sx={{
            minHeight: "100vh",
            width: "2px",
            backgroundColor: "rgba(105, 108, 255, 0.5)",
            marginX: "10px",
          }}
        />
        <MainChat
          userMessage={userMessage}
          setUserMessage={setUserMessage}
          defaultScreen={defaultScreen}
        />
      </Box>
    </Box>
  );
};

export default ChatPage;
