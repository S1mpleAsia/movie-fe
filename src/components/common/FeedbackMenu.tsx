import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
} from "@mui/material";
import {
  FeedbackResponse,
  FeedbackType,
  FeedbackUpdateRequest,
} from "../../types/FeedbackType";
import { feedbackAPI } from "../../api/modules/feedback.api";
import { GeneralType } from "../../types/GeneralType";
import { toast } from "react-toastify";
import MinHeightTextarea from "./Textarea";

const options = ["Edit feedback", "Remove feedback"];

const ITEM_HEIGHT = 48;

type FeedbackMenuProps = {
  feedback: FeedbackType;
  setCanaryCheck: React.Dispatch<React.SetStateAction<number>>;
};

export default function FeedbackMenu({
  feedback,
  setCanaryCheck,
}: FeedbackMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [vote, setVote] = useState<number | null>(feedback.vote);

  const open = Boolean(anchorEl);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubmitEdit = async () => {
    const request: FeedbackUpdateRequest = {
      id: feedback.id,
      movieId: feedback.movieId,
      userId: feedback.userId,
      feedback: textareaRef.current?.value || "",
      vote: vote || 1,
    };

    const response: GeneralType<FeedbackResponse> = (
      await feedbackAPI.updateFeedback(request)
    ).data;

    if (response.status.statusCode === 200)
      toast.success("Update successfully");
    else toast.error("Update failed");

    setCanaryCheck((prev) => prev + 1);
    setOpenEdit(false);
    setAnchorEl(null);
  };

  const handleSubmitRemove = async () => {
    const response: GeneralType<string> = (
      await feedbackAPI.deleteFeedback(feedback.id)
    ).data;

    if (response.status.statusCode === 200)
      toast.success("Remove feedback successfully");
    else toast.error("Remove failed");

    setCanaryCheck((prev) => prev + 1);
    setOpenRemove(false);
    setAnchorEl(null);
  };

  const handleRemove = () => {
    setOpenRemove(true);
  };

  const handleEdit = () => {
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenRemove(false);
    setOpenEdit(false);
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            onClick={index === 0 ? handleEdit : handleRemove}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>

      {openRemove && (
        <Dialog
          open={openRemove}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Remove your feedback"}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Warning !!! This will permanently delete your feedback. Please
              check your action carefully
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleSubmitRemove}>Delete</Button>
          </DialogActions>
        </Dialog>
      )}

      {openEdit && (
        <Dialog open={openEdit} onClose={handleClose}>
          <DialogTitle>{"Edit Page"}</DialogTitle>

          <DialogContent>
            <DialogContentText>Update your feedback below</DialogContentText>

            <Rating
              name="size-medium"
              size="medium"
              defaultValue={feedback.vote}
              sx={{ marginTop: "1rem", marginBottom: "0.5rem" }}
              onChange={(e, value) => setVote(value)}
            />

            <MinHeightTextarea textareaRef={textareaRef} />

            <Button
              sx={{
                backgroundColor: "#6062e8",
                color: "#fff",
                marginTop: "0.5rem",
                "&:hover": {
                  backgroundColor: "#6062e8",
                },
              }}
              onClick={handleSubmitEdit}
            >
              Submit
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
