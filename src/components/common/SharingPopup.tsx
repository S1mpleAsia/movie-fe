import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CredentialType } from "../../types/CredentialType";
import { GeneralType } from "../../types/GeneralType";
import { userAPI } from "../../api/modules/user.api";
import { toast } from "react-toastify";
import tagUtils from "../../utils/tag.utils";
import { Message, MessageType } from "../../types/MessageType";
import { messageAPI } from "../../api/modules/message.api";
import { baseEndpoint, getImage } from "../../utils/constant";

type SharingPopupProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  movieId: number;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SharingPopup = ({ show, setShow, movieId }: SharingPopupProps) => {
  const { user } = useSelector((state: RootState) => state.user);

  const [activeUser, setActiveUser] = useState<CredentialType | null>(null);
  const [friendList, setFriendList] = useState<CredentialType[]>([]);

  useEffect(() => {
    const getFriendList = async () => {
      const response: GeneralType<CredentialType[]> = (
        await userAPI.getAllUser()
      ).data;

      if (response.status.statusCode === 200) {
        const friendCredential: CredentialType[] = response.data.filter(
          (data) => data?.id !== user?.id && data.role !== "ADMIN"
        );

        setFriendList(friendCredential);
      } else {
        toast.error(response.status.message);
      }
    };

    getFriendList();
  }, []);

  const handleClose = () => {
    setShow(false);
    setActiveUser(null);
  };

  const handleSubmit = async () => {
    const message: MessageType = {
      senderId: user?.id || "",
      receiverId: activeUser?.id || "",
      type: Message.LINK,
      movieId: movieId,
    };

    console.log(message);

    const response: GeneralType<MessageType> = (
      await messageAPI.saveMessage(message)
    ).data;
    if (response.status.statusCode !== 200)
      toast.error(response.status.message);
    else toast.success("Send message successfully");

    setActiveUser(null);
    setShow(false);
  };

  const handleChoose = (item: CredentialType) => {
    console.log(item.fullName);
    setActiveUser(item);
  };

  return (
    <Dialog
      open={show}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle>Sharing movie with your friends.</DialogTitle>
      <DialogContent>
        {/* <Box
          component="input"
          type="search"
          placeholder="Search username"
          sx={{
            padding: "8px 10px",
            width: "100%",
            outline: "none",
            fontSize: "1.1rem",
            borderRadius: "8px",
          }}
        /> */}

        <Box
          marginTop="1rem"
          height="300px"
          width="500px"
          display="flex"
          flexDirection="column"
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
          gap={1.5}
        >
          {friendList.map((item) => (
            <Box
              display="flex"
              gap={2}
              sx={{
                padding: "8px",
                borderRadius: "10px",
                cursor: "pointer",
                backgroundColor: activeUser?.id === item.id ? "#3f405c" : "",
                "&:hover": {
                  backgroundColor: "#3f405c",
                },
              }}
              onClick={() => handleChoose(item)}
            >
              <Box
                component="img"
                src={getImage(baseEndpoint, item.imagePath || "no-avatar.png")}
                sx={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />

              <Box display="flex" flexDirection="column" marginTop="0.5rem">
                <Typography fontWeight={700}>{item.fullName}</Typography>
                <Typography fontSize="0.9rem" sx={{ opacity: 0.8 }}>
                  {tagUtils.getTagFromName(item.fullName)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Button
          sx={{
            backgroundColor: "#6062e8",
            color: "#fff",
            width: "100%",
            "&:hover": {
              backgroundColor: "#6062e8",
            },
            marginTop: "1rem",
          }}
          onClick={handleSubmit}
        >
          Send message
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SharingPopup;
