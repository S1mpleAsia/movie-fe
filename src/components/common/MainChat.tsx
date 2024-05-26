import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import MessageHeader from "./MessageHeader";
import MessageContent from "./MessageContent";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import SendIcon from "@mui/icons-material/Send";
import { useWebsocket } from "../../hooks/useWebsocket";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { MessageType, UserMessageType } from "../../types/MessageType";
import { FrameImpl } from "@stomp/stompjs";
import { GeneralType } from "../../types/GeneralType";
import { messageAPI } from "../../api/modules/message.api";
import { storageAPI } from "../../api/modules/upload.api";
import { toast } from "react-toastify";

type MainChatProps = {
  userMessage: UserMessageType[];
  setUserMessage: React.Dispatch<React.SetStateAction<UserMessageType[]>>;
  defaultScreen: boolean;
};

const decoder = new TextDecoder();

const MainChat = ({
  userMessage,
  setUserMessage,
  defaultScreen,
}: MainChatProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const { chatPartnerId } = useSelector(
    (state: RootState) => state.chatPartnerId
  );

  const messageRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef();
  const [currentPayload, setCurrentPayload] = useState<MessageType>({
    senderId: user?.id || "",
    receiverId: "",
    content: "",
    imagePath: null,
    type: "TEXT",
  });

  const { sendMessage, connect, disconnect } = useWebsocket(user?.id || "");

  useEffect(() => {
    connect(onPrivateMessage);
    console.log();

    return () => disconnect();
  }, []);

  useEffect(() => {
    if (messageRef?.current) messageRef.current.value = "";

    if (bottomRef.current)
      bottomRef.current?.lastElementChild?.scrollIntoView();
  }, [userMessage]);

  useEffect(() => {
    console.log("Change user");
    setCurrentPayload({ ...currentPayload, receiverId: chatPartnerId });
  }, [chatPartnerId]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    setCurrentPayload({ ...currentPayload, content: content });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendPrivateMessage();
    }
  };

  const onPrivateMessage = (payload: FrameImpl) => {
    console.log("Receive Private message");
    const payloadData: MessageType = JSON.parse(
      decoder.decode(payload.binaryBody)
    );
    console.log("UserId:", user!.id);
    console.log("Payload: ", payloadData);

    setUserMessage((userMessage) =>
      userMessage.map((partner) => {
        if (user!.id === payloadData.senderId) {
          if (partner.partnerId === payloadData.receiverId) {
            return {
              ...partner,
              messageDtoList: [...partner.messageDtoList, payloadData],
            };
          }

          return partner;
        } else if (user!.id === payloadData.receiverId) {
          if (partner.partnerId === payloadData.senderId) {
            return {
              ...partner,
              messageDtoList: [...partner.messageDtoList, payloadData],
            };
          }
          return partner;
        }

        return partner;
      })
    );
  };

  const sendPrivateMessage = () => {
    if (messageRef.current?.value === "") return;

    sendMessage(currentPayload, "/app/private");
  };

  const handleMessageImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

        if (response.status.statusCode !== 200)
          toast.error("Upload file failed. Please try again");
        else {
          console.log(e.target.files[0].name);

          const payload = {
            ...currentPayload,
            content: null,
            imagePath: e.target.files[0].name,
            type: "IMAGE",
          };

          setCurrentPayload({
            ...currentPayload,
            content: "",
          });

          sendMessage(payload, "/app/private");
        }
      }
    }
  };

  return (
    <Box flex="1" paddingTop="1rem" paddingX="1rem">
      {defaultScreen && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap={2}
          width="100%"
          height="100%"
        >
          <Box
            component="img"
            src={require("../../assets/chat-illustrator.png")}
            alt="Default theme"
            sx={{
              width: "450px",
              height: "450px",
            }}
          />

          <Typography variant="h2" fontSize="2rem" fontWeight="700">
            Click on a message to display it here 🎉🎉
          </Typography>
        </Box>
      )}

      {!defaultScreen && (
        <>
          {/* Message Header */}
          <MessageHeader userMessage={userMessage} />
          {/* Message Header */}

          <Divider
            sx={{ height: "2px", backgroundColor: "red", marginY: "1rem" }}
          />

          {/* Message Content */}
          <MessageContent userMessage={userMessage} bottomRef={bottomRef} />
          {/* Message Content */}

          {/* User Input */}
          <Box
            className="textbox"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              marginY: "1rem",
              marginRight: "3rem",
              padding: "6px 12px",
              backgroundColor: "gray",
              borderRadius: "100px",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
            }}
          >
            <Box className="text-bar" width="100%" display="flex">
              <Box
                component="input"
                type="text"
                placeholder="Your message"
                borderRadius="100px"
                fontSize="1.1rem"
                sx={{
                  backgroundColor: "gray",
                  border: "none",
                  outline: "none",
                  padding: "8px",
                  width: "calc(100% - 1rem)",
                }}
                ref={messageRef}
                onChange={(e) => {
                  handleInput(e);
                }}
                onKeyDown={handleKeyDown}
              />
              <Box className="photo-wrapper" display="flex" margin="0 1rem">
                <Box
                  component="label"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box
                    component="input"
                    type="file"
                    sx={{ display: "none" }}
                    ref={fileRef}
                    onChange={(e) => handleMessageImg(e)}
                  />
                  <InsertPhotoOutlinedIcon sx={{ color: "#6062e8" }} />
                </Box>
              </Box>
            </Box>

            <SendIcon sx={{ color: "#6062e8" }} onClick={sendPrivateMessage} />
          </Box>
          {/* User Input */}
        </>
      )}
    </Box>
  );
};

export default MainChat;
