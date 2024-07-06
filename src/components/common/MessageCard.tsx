import { Box, Stack, Typography } from "@mui/material";
import { Message, MessageType } from "../../types/MessageType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CredentialType } from "../../types/CredentialType";
import timeUtils from "../../utils/time.utils";
import { baseEndpoint, getImage, storageImage } from "../../utils/constant";
import uiConfigs from "../../configs/ui.config";
import { useNavigate } from "react-router-dom";
import { Movie } from "@mui/icons-material";

type MessageCardProps = {
  externalInfo: CredentialType | undefined;
  message: MessageType;
};

const MessageCard = ({ externalInfo, message }: MessageCardProps) => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);

  const isSend = user?.id === message.senderId;
  return (
    <Box className="message-card" display="flex" paddingBottom="1rem">
      <Box
        display="flex"
        width={isSend ? "100%" : "auto"}
        flexDirection={isSend ? "row-reverse" : "row"}
      >
        <Box
          component="img"
          src={getImage(baseEndpoint, "no-avatar.png")}
          alt=""
          sx={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
          }}
        />

        <Box
          className="wrapper"
          width="100%"
          marginLeft={isSend ? "0" : "1rem"}
          marginRight={isSend ? "1rem" : 0}
        >
          <Stack
            className="info"
            direction={isSend ? "row-reverse" : "row"}
            alignItems="baseline"
            gap={1.5}
          >
            <Typography variant="body1" fontSize="1.1rem" fontWeight="700">
              {isSend ? user.fullName : externalInfo?.fullName}
            </Typography>
            <Typography fontSize="0.9rem" sx={{ opacity: "0.9" }}>
              {timeUtils.formatAMPM(message.createdAt || new Date())}
            </Typography>
          </Stack>

          {message.content && message.type !== Message.LINK && (
            <Box
              className="chatbox"
              marginTop="5px"
              display={isSend ? "flex" : ""}
              width={isSend ? "100%" : "auto"}
              flexDirection={isSend ? "row-reverse" : "row"}
            >
              <Typography
                flexDirection="row-reverse"
                padding="0.8rem"
                sx={{
                  backgroundColor: "#602512",
                  borderTopRightRadius: isSend ? "0" : "1rem",
                  borderTopLeftRadius: isSend ? "1rem" : "0",
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                  maxWidth: "80%",
                  width: isSend ? "auto" : "max-content",
                }}
              >
                {message.content}
              </Typography>
            </Box>
          )}

          {message.type === Message.IMAGE && (
            <Box
              className="image-wrapper"
              sx={{
                float: isSend ? "right" : "",
              }}
            >
              <Box
                className="image"
                sx={{
                  marginTop: "0.5rem",
                  width: "20rem",
                  height: "20rem",
                }}
              >
                <Box
                  component="img"
                  src={baseEndpoint + message.imagePath}
                  alt=""
                  sx={{
                    float: "right",
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          )}

          {message.type === Message.LINK && (
            <Box
              className="movie-link"
              sx={{
                marginTop: "0.5rem",
                backgroundColor: "#ec6701",
                borderRadius: "12px",
                cursor: "pointer",
                float: isSend ? "right" : "",
              }}
              display="flex"
              gap={2}
              padding="1rem"
              onClick={() => navigate(`/movie/${message.movieId}`)}
            >
              <Box
                component="img"
                src={getImage(
                  storageImage.w500Path,
                  message.movie?.posterPath || ""
                )}
                alt=""
                sx={{
                  borderRadius: "8px",
                  width: "10rem",
                  height: "10rem",
                  objectFit: "cover",
                }}
              />
              <Box
                className="movie-link-content"
                display="flex"
                flexDirection="column"
              >
                <Typography fontWeight="700" fontSize="1.1rem">
                  {message.movie?.title}
                </Typography>
                <Typography>
                  {timeUtils.formatDateToString(
                    message.movie?.releaseDate || ""
                  )}
                </Typography>
                <Typography>
                  {message.movie?.genreList.reduce(
                    (acc, item) =>
                      acc + (acc.length > 0 ? ", " : "") + item.name,
                    ""
                  )}
                </Typography>
                <Typography
                  sx={{
                    maxWidth: "350px",
                    marginTop: "0.5rem",
                    ...uiConfigs.style.typoLines(3, "left"),
                  }}
                >
                  {message.movie?.overview}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageCard;
