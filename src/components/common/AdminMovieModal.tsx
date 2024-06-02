import {
  Box,
  Button,
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  TextareaAutosize,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { GenreType } from "../../types/MovieType";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type AdminMovieModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, genreName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      genreName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AdminMovieModal = ({ open, setOpen }: AdminMovieModalProps) => {
  const theme = useTheme();
  const [status, setStatus] = useState("");
  const [genreList, setGenreList] = useState<GenreType[]>([]);
  const hideModal = () => {
    setOpen(false);
  };

  const handleGenreChange = () => {
    console.log("hehehe");
  };

  const handleChangeStatus = (e: SelectChangeEvent) => {
    setStatus(e.target.value as string);
  };

  return (
    <Box
      className={`movieViewPopup ${open ? "visible" : ""}`}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        opacity: 0,
        visibility: "hidden",
        zIndex: 900,
      }}
    >
      <Box
        className="opacityLayer"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.25)",
          backdropFilter: "blur(3.5px)",
          WebkitBackdropFilter: "blur(3.5px)",
          opacity: 0,
          transition: "opacity 400ms",
        }}
        onClick={hideModal}
      ></Box>

      <Box
        className="movieViewContent"
        sx={{
          width: "1000px",
          height: "600px",
          transform: "scale(0.2)",
          transition: "transform 250ms",
          backgroundColor: "#1e1e1e",

          flexGrow: "1 1",
          padding: "2.5rem 2rem",
          overflowY: "scroll",
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
      >
        <Box display="flex" gap={2.5}>
          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            border="1.5px solid #383636"
            height="fit-content"
          >
            <Typography
              padding="10px 16px"
              sx={{
                borderBottom: "1.5px solid #383636",
              }}
              fontSize="1.3rem"
              fontWeight="600"
            >
              General Information
            </Typography>

            <Box
              display="flex"
              flexDirection="column"
              gap={3}
              padding="0 20px 10px 20px"
            >
              <Typography fontWeight="600" fontSize="1.05rem">
                Movie poster
              </Typography>
              <Box
                width="100%"
                height="220px"
                sx={{
                  aspectRatio: "16 / 9",
                  borderStyle: "dashed",
                  borderColor: "rgba(255,255,255, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: "#1976d2",
                    "&:hover": {
                      backgroundColor: "#0d66bf",
                    },
                  }}
                >
                  Upload an image
                </Button>
                <Typography>Drag and drop an image</Typography>
              </Box>

              <TextField defaultValue="Star wars" label="Title" focused />

              <TextareaAutosize
                minRows={5}
                placeholder="Movie overview"
                className="admin-movie-modal-textarea"
                onChange={() => {}}
                style={{
                  backgroundColor: "#1c2025",
                  color: "#fff",
                  fontSize: "1rem",
                  padding: "10px 12px",
                  resize: "none",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.5)",
                  outline: "none",
                  width: "400px",
                }}
              />

              <FormControl fullWidth>
                <InputLabel htmlFor="movie-runtime">Runtime</InputLabel>
                <OutlinedInput
                  id="movie-runtime"
                  startAdornment={
                    <InputAdornment position="start">(min)</InputAdornment>
                  }
                  label="Runtime"
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="genre-label-id">Genres</InputLabel>

                <Select
                  labelId="genre-label-id"
                  id="genre-label"
                  multiple
                  value={genreList}
                  onChange={handleGenreChange}
                  input={
                    <OutlinedInput id="select-multiple-genre" label="genre" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value.id} label={value.name} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {genreList.map((genre) => (
                    <MenuItem
                      key={genre.id}
                      value={genre.name}
                      style={getStyles(
                        genre.name,
                        genreList.map((genre) => genre.name),
                        theme
                      )}
                    >
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  zIndex: 20000,
                }}
              >
                <InputLabel id="movie-status-label">Status</InputLabel>
                <Select
                  labelId="movie-status-label"
                  id="movie-status-select"
                  value={status}
                  label="status"
                  onChange={handleChangeStatus}
                >
                  <MenuItem value="Released">Released</MenuItem>
                  <MenuItem value="Upcoming">Upcoming</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            border="1.5px solid #383636"
            height="fit-content"
            flex={1}
          >
            <Typography
              padding="10px 16px"
              sx={{
                borderBottom: "1.5px solid #383636",
              }}
              fontSize="1.3rem"
              fontWeight="600"
            >
              Detail Information
            </Typography>

            <Box
              display="flex"
              flexDirection="column"
              gap={3}
              padding="0 20px 10px 20px"
            >
              <FormControl
                fullWidth
                sx={{
                  zIndex: 10000,
                }}
              >
                <InputLabel id="movie-status-label">Status</InputLabel>
                <Select
                  labelId="movie-status-label"
                  id="movie-status-select"
                  value={status}
                  label="status"
                  onChange={handleChangeStatus}
                >
                  <MenuItem value="Released">Released</MenuItem>
                  <MenuItem value="Upcoming">Upcoming</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ width: "100%" }}>
                <Typography marginBottom="12px" fontWeight="600">
                  Release date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker sx={{ width: "100%" }} />
                </LocalizationProvider>
              </Box>

              <Box>
                <Typography fontWeight="600" marginBottom="10px">
                  Movie video
                </Typography>
                <Box
                  width="100%"
                  height="220px"
                  sx={{
                    aspectRatio: "16 / 9",
                    borderStyle: "dashed",
                    borderColor: "rgba(255,255,255, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#1976d2",
                      "&:hover": {
                        backgroundColor: "#0d66bf",
                      },
                    }}
                  >
                    Upload an image
                  </Button>
                  <Typography>Drag and drop an image</Typography>
                </Box>
              </Box>

              <Box>
                <Typography fontWeight="600" marginBottom="10px">
                  Background image
                </Typography>
                <Box
                  width="100%"
                  height="220px"
                  sx={{
                    aspectRatio: "16 / 9",
                    borderStyle: "dashed",
                    borderColor: "rgba(255,255,255, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Button
                    sx={{
                      color: "white",
                      backgroundColor: "#1976d2",
                      "&:hover": {
                        backgroundColor: "#0d66bf",
                      },
                    }}
                  >
                    Upload an image
                  </Button>
                  <Typography>Drag and drop an image</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" marginTop="12px" gap={2} justifyContent="flex-end">
          <Button>Cancel</Button>
          <Button>Submit</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminMovieModal;
