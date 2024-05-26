import * as React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

type MinHeightTextareaProps = {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
};

export default function MinHeightTextarea({
  textareaRef,
}: MinHeightTextareaProps) {
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
  );

  const setValue = (value: string) => {
    textareaRef.current!.value = value;
  };

  return (
    <Textarea
      ref={textareaRef}
      aria-label="minimum height"
      minRows={4}
      placeholder="Enter your feedback"
      sx={{
        width: {
          xs: "100%",
          md: "550px",
          lg: "550px",
        },

        resize: "none",
      }}
      onChange={(e) => setValue(e.target.value)}
      // value={feedbackRequest.feedback || ""}
      // onChange={(e) =>
      //   setFeedbackRequest({ ...feedbackRequest, feedback: e.target.value })
      // }
      // onFocus={(e) =>
      //   e.currentTarget.setSelectionRange(
      //     e.currentTarget.value.length,
      //     e.currentTarget.value.length
      //   )
      // }
    />
  );
}
