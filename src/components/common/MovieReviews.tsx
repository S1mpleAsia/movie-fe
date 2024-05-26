import { useSelector } from "react-redux";
import {
  FeedbackOverallResponse,
  FeedbackRequest,
  FeedbackResponse,
  FeedbackType,
} from "../../types/FeedbackType";
import { RootState } from "../../redux/store";
import { useEffect, useRef, useState } from "react";
import { GeneralType } from "../../types/GeneralType";
import {
  Avatar,
  Box,
  Button,
  Pagination,
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
import timeUtils from "../../utils/time.utils";

type MoviewReviewsProps = {
  movie: MovieOverviewType;
};

const MovieReviews = ({ movie }: MoviewReviewsProps) => {
  const { user } = useSelector((state: RootState) => state.user);

  const [feedbackOverall, setFeedbackOverall] =
    useState<FeedbackOverallResponse>();
  const [feedbackList, setFeedbackList] = useState<FeedbackType[]>();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [feedbackRequest, setFeedbackRequest] = useState<FeedbackRequest>({
    movieId: movie.id,
    feedback: null,
    vote: 3,
    userId: user?.id || "",
  });
  const [canaryCheck, setCanaryCheck] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const getFeedbackOverall = async () => {
      const response: GeneralType<FeedbackOverallResponse> = (
        await feedbackAPI.getFeedbackOverall(movie.id)
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else setFeedbackOverall(response.data);
    };

    const getFeedbackList = async () => {
      const response: GeneralType<FeedbackType[]> = (
        await feedbackAPI.getFeedbackList(movie.id, page - 1)
      ).data;

      if (response.status.statusCode === 200) setFeedbackList(response.data);
    };

    const getTotalPage = async () => {
      const response: GeneralType<number> = (
        await feedbackAPI.getFeedbackTotalPage(movie.id)
      ).data;

      if (response.status.statusCode === 200) setTotalPage(response.data);
    };

    getFeedbackOverall();
    getFeedbackList();
    getTotalPage();
  }, [movie, page, canaryCheck]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const data: FeedbackRequest = {
      ...feedbackRequest,
      feedback: textareaRef.current?.value || "",
    };

    const response: GeneralType<FeedbackResponse> = (
      await feedbackAPI.addFeedback(data)
    ).data;

    console.log(response);

    if (response.status.statusCode === 200) {
      toast.success("Submit review successfully");
      setFeedbackRequest({
        movieId: movie.id,
        feedback: null,
        vote: 3,
        userId: user?.id || "",
      });

      setCanaryCheck((prev) => prev + 1);
    } else toast.error(response.status.message);
  };

  return (
    <>
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
              {parseFloat(feedbackOverall?.voteAverage.toFixed(2) || "0")}
            </Typography>
            <Rating
              name="half-rating-read"
              value={feedbackOverall?.voteAverage || 1.0}
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
          {feedbackList?.map((feedback) => (
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
                  <Typography
                    variant="body1"
                    fontSize="1.1rem"
                    fontWeight="700"
                  >
                    {feedback.userCredential.fullName}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontSize="1rem"
                    fontStyle="italic"
                    sx={{ opacity: 0.8 }}
                  >
                    {timeUtils.formatDateToString(
                      feedback.updatedAt.toString() ||
                        feedback.createdAt.toString()
                    )}
                  </Typography>
                </Stack>
              </Box>

              <Box className="rating" minWidth="400px">
                <Rating
                  name="half-rating-read"
                  value={feedback.vote}
                  precision={1}
                  size="medium"
                  readOnly
                />

                <Typography maxWidth="400px">{feedback.feedback}</Typography>
              </Box>

              {user?.id === feedback.userId && (
                <FeedbackMenu
                  feedback={feedback}
                  setCanaryCheck={setCanaryCheck}
                />
              )}
            </Box>
          ))}

          {totalPage === 0 && feedbackList?.length === 0 && (
            <Typography
              fontSize={{ xs: "0.5rem", md: "0.5rem", lg: "1rem" }}
              fontStyle="italic"
              sx={{ opacity: 0.6 }}
            >
              No comments yet
            </Typography>
          )}

          {totalPage !== 0 && (
            <Pagination
              count={totalPage}
              variant="outlined"
              shape="rounded"
              size="large"
              page={page}
              onChange={handleChangePage}
            />
          )}
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
              <Box
                display="flex"
                flexDirection="row"
                gap={2}
                alignItems="center"
              >
                <Typography fontSize="1.2rem" fontWeight="700">
                  Rating:
                </Typography>
                <Rating
                  name="size-medium"
                  size="medium"
                  defaultValue={3}
                  onChange={(e, value) => {
                    setFeedbackRequest((request) => ({
                      ...request,
                      vote: value,
                    }));
                  }}
                />
              </Box>

              <Box display="flex" flexDirection="column" gap={2}>
                <Typography fontSize="1.2rem" fontWeight="700">
                  Your feedback (optional):
                </Typography>

                <>
                  <MinHeightTextarea textareaRef={textareaRef} />
                </>

                <Button
                  sx={{
                    backgroundColor: "#6062e8",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#6062e8",
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MovieReviews;
