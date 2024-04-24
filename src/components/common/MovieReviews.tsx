import { useSelector } from "react-redux";
import { FeedbackOverallResponse } from "../../types/FeedbackType";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { GeneralType } from "../../types/GeneralType";
import {
  Avatar,
  Box,
  Button,
  Rating,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { MovieOverviewType } from "../../types/MovieType";
import { useDispatch } from "react-redux";
import { feedbackAPI } from "../../api/modules/feedback.api";
import { toast } from "react-toastify";
import BorderLinearProgress from "./BorderLinearProgress";
import FeedbackMenu from "./FeedbackMenu";
import MinHeightTextarea from "./Textarea";

type MoviewReviewsProps = {
  movie: MovieOverviewType;
};

const MovieReviews = ({ movie }: MoviewReviewsProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { globalLoading } = useSelector(
    (state: RootState) => state.globalLoading
  );
  const [feedbackOverall, setFeedbackOverall] =
    useState<FeedbackOverallResponse>();

  const [feedback, setFeedback] = useState<string>("");

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

      <Box
        className="personal-feedback"
        marginTop="40px"
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <Typography fontStyle="italic" fontSize="1.3rem" sx={{ opacity: 1 }}>
          Please let us know your feedback 🎉️🎉
        </Typography>

        <Box display="flex" flexDirection="row" gap={5}>
          <Avatar
            variant="square"
            src={require("../../assets/no-avatar.png")}
            sx={{
              width: "4rem",
              height: "4rem",
              borderRadius: "10px",
              display: {
                xs: "none",
                md: "block",
              },
            }}
          />

          <Stack direction="column" spacing={2}>
            <Box display="flex" flexDirection="row" gap={2} alignItems="center">
              <Typography fontSize="1.2rem" fontWeight="700">
                Rating:
              </Typography>
              <Rating name="size-medium" size="medium" defaultValue={3} />
            </Box>

            <Box display="flex" flexDirection="column" gap={2}>
              <Typography fontSize="1.2rem" fontWeight="700">
                Your feedback (optional):
              </Typography>

              <MinHeightTextarea />

              <Button
                sx={{
                  backgroundColor: "#6062e8",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#6062e8",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieReviews;
