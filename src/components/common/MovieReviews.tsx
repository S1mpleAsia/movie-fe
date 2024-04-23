import { useSelector } from "react-redux";
import {
  FeedbackOverallResponse,
  FeedbackType,
} from "../../types/FeedbackType";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { GeneralType } from "../../types/GeneralType";
import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from "@mui/lab";
import TextAvatar from "./TextAvatar";
import { MovieOverviewType } from "../../types/MovieType";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import { feedbackAPI } from "../../api/modules/feedback.api";
import { toast } from "react-toastify";
import BorderLinearProgress from "./BorderLinearProgress";
import FeedbackMenu from "./FeedbackMenu";

type ReviewItemProps = {
  review: FeedbackType;
  onRemoved: () => void;
};

type MoviewReviewsProps = {
  movie: MovieOverviewType;
};

const ReviewItem = ({ review, onRemoved }: ReviewItemProps) => {
  const { user } = useSelector((state: RootState) => state.user);

  const [onRequest, setOnRequest] = useState(false);
  const [feedbackOverall, setFeedbackOverall] =
    useState<FeedbackOverallResponse>();
  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    // const response = await api
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        opacity: onRequest ? 0.6 : 1,
        "&:hover": {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* Avatar */}
        <TextAvatar text="Duong Vu" />
        {/* Avatar */}

        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              ADMIN
            </Typography>

            <Typography variant="h6" fontWeight="700">
              {dayjs("2024-07-12 05:59:30").format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>

          <Typography variant="body1" textAlign="justify">
            This is my review
          </Typography>

          {user && user.id === review.userId && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onRemove}
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content",
              }}
            >
              remove
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const MovieReviews = ({ movie }: MoviewReviewsProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { globalLoading } = useSelector(
    (state: RootState) => state.globalLoading
  );
  const [feedbackOverall, setFeedbackOverall] =
    useState<FeedbackOverallResponse>();

  useEffect(() => {
    const getFeedbackOverall = async () => {
      const response: GeneralType<FeedbackOverallResponse> = (
        await feedbackAPI.getFeedbackOverall(movie.id)
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else setFeedbackOverall(response.data);
    };

    getFeedbackOverall();
  }, [movie]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={5}
      paddingX={{ xs: "20px", md: 0, lg: 0 }}
    >
      <Box
        className="overview"
        display="flex"
        flexDirection={{ xs: "column", md: "row", lg: "row" }}
        gap={{ xs: 5, md: 20, lg: 20 }}
      >
        <Stack>
          <Typography variant="h2" fontSize="5rem" fontWeight="700">
            {feedbackOverall?.voteAverage}
          </Typography>
          <Rating
            name="half-rating-read"
            defaultValue={feedbackOverall?.voteAverage}
            value={feedbackOverall?.voteAverage}
            onChange={() => console.log("Change")}
            precision={0.5}
            size="medium"
            readOnly
            sx={{ marginTop: "10px" }}
          />
          <Typography
            variant="body1"
            paddingLeft="5px"
            marginTop="5px"
            sx={{ opacity: 0.8 }}
            fontSize="1.05rem"
            fontStyle="italic"
          >
            {feedbackOverall?.voteCount} reviews from verified user
          </Typography>
        </Stack>

        <Box display="flex" flexDirection="column" gap={2}>
          {feedbackOverall?.feedbackComponentList.map((item, index) => (
            <Box
              display="flex"
              flexDirection="row"
              gap={2}
              key={index}
              alignItems="center"
            >
              <Typography variant="body1">{item.rating}</Typography>
              <BorderLinearProgress
                variant="determinate"
                value={item.percentage * 100}
                sx={{
                  width: "500px",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        className="reviews"
        marginTop="40px"
        display="flex"
        flexDirection="column"
        gap={5}
      >
        <Box className="review" display="flex" flexDirection="row" gap={20}>
          <Box className="info" display="flex" flexDirection="row" gap={3}>
            <Avatar
              variant="square"
              src={require("../../assets/no-avatar.png")}
              sx={{
                width: "4rem",
                height: "4rem",
                borderRadius: "10px",
              }}
            />

            <Stack spacing={1}>
              <Typography variant="body1" fontSize="1.1rem" fontWeight="700">
                GigaBox
              </Typography>
              <Typography
                variant="body2"
                fontSize="1rem"
                fontStyle="italic"
                sx={{ opacity: 0.8 }}
              >
                12 October, 2024
              </Typography>
            </Stack>
          </Box>

          <Box className="rating">
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              size="medium"
              readOnly
            />

            <Typography maxWidth="400px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              consequatur quae aliquam voluptas nihil ab molestiae consectetur
              nostrum dolor quia tempore itaque veritatis quaerat, dolorum
              blanditiis odio inventore. Similique, maxime?
            </Typography>
          </Box>

          <FeedbackMenu />
        </Box>

        <Box className="review" display="flex" flexDirection="row" gap={20}>
          <Box className="info" display="flex" flexDirection="row" gap={3}>
            <Avatar
              variant="square"
              src={require("../../assets/no-avatar.png")}
              sx={{
                width: "4rem",
                height: "4rem",
                borderRadius: "10px",
              }}
            />

            <Stack spacing={1}>
              <Typography variant="body1" fontSize="1.1rem" fontWeight="700">
                GigaBox
              </Typography>
              <Typography
                variant="body2"
                fontSize="1rem"
                fontStyle="italic"
                sx={{ opacity: 0.8 }}
              >
                12 October, 2024
              </Typography>
            </Stack>
          </Box>

          <Box className="rating">
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              size="medium"
              readOnly
            />

            <Typography maxWidth="400px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              consequatur quae aliquam voluptas nihil ab molestiae consectetur
              nostrum dolor quia tempore itaque veritatis quaerat, dolorum
              blanditiis odio inventore. Similique, maxime?
            </Typography>
          </Box>

          <FeedbackMenu />
        </Box>

        <Box className="review" display="flex" flexDirection="row" gap={20}>
          <Box className="info" display="flex" flexDirection="row" gap={3}>
            <Avatar
              variant="square"
              src={require("../../assets/no-avatar.png")}
              sx={{
                width: "4rem",
                height: "4rem",
                borderRadius: "10px",
              }}
            />

            <Stack spacing={1}>
              <Typography variant="body1" fontSize="1.1rem" fontWeight="700">
                GigaBox
              </Typography>
              <Typography
                variant="body2"
                fontSize="1rem"
                fontStyle="italic"
                sx={{ opacity: 0.8 }}
              >
                12 October, 2024
              </Typography>
            </Stack>
          </Box>

          <Box className="rating">
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              size="medium"
              readOnly
            />

            <Typography maxWidth="400px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              consequatur quae aliquam voluptas nihil ab molestiae consectetur
              nostrum dolor quia tempore itaque veritatis quaerat, dolorum
              blanditiis odio inventore. Similique, maxime?
            </Typography>
          </Box>

          <FeedbackMenu />
        </Box>
      </Box>

      <Box className="personal-feedback"></Box>
    </Box>
  );
};

export default MovieReviews;
