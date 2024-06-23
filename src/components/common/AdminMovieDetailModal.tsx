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
  styled,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  GenreType,
  MovieModifiedResponse,
  MovieOverviewType,
} from "../../types/MovieType";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { GeneralType } from "../../types/GeneralType";
import { movieAPI } from "../../api/modules/movie.api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { definedLanguage } from "../../assets/language";
import { storageAPI } from "../../api/modules/upload.api";
import {
  baseEndpoint,
  getImage,
  storageImage,
  videoPath,
} from "../../utils/constant";
import CancelIcon from "@mui/icons-material/Cancel";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

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

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "rgb(105, 108, 255)", // Hover border color
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(105, 108, 255)", // Focused border color
    },
  },

  "& label.Mui-focused": {
    color: "rgb(105, 108, 255)",
  },
}));

const AdminMovieDetailModal = ({ open, setOpen }: AdminMovieModalProps) => {
  const theme = useTheme();
  const [movie, setMovie] = useState<MovieModifiedResponse>({
    status: "Released",
    posterPath: null,
    backdropPath: null,
    videoPath: null,
  });
  const [language, setLanguage] = useState("");
  const [genreList, setGenreList] = useState<GenreType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const bgInputRef = useRef<HTMLInputElement | null>(null);
  const posterInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const hideModal = () => {
    setOpen(false);
  };

  const handleGenreChange = (
    event: SelectChangeEvent<typeof selectedGenres>
  ) => {
    const {
      target: { value },
    } = event;

    setSelectedGenres(typeof value === "string" ? value.split(",") : value);
    setMovie((movie) => ({
      ...movie,
      genres: typeof value === "string" ? value.split(",") : value,
    }));
  };

  const handleChangeLanguage = (e: SelectChangeEvent) => {
    setLanguage(e.target.value);
    setMovie((movie) => ({ ...movie, language: e.target.value as string }));
  };

  const handleBgButtonClick = () => {
    bgInputRef.current?.click();
  };

  const handleVideoButtonClick = () => {
    videoInputRef.current?.click();
  };

  const handlePosterButtonClick = () => {
    posterInputRef.current?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    uploadType: string
  ) => {
    if (e.target.files) {
      if (
        e.target.files[0].type === "image/png" ||
        e.target.files[0].type === "image/jpeg"
      ) {
        const formData = new FormData();
        formData.set("file", e.target.files[0]);

        if (uploadType === "background")
          formData.set("path", "uploadFiles/original/");
        else if (uploadType === "poster")
          formData.set("path", "uploadFiles/w500/");

        const response: GeneralType<any> = await (
          await storageAPI.uploadFileWithPrefixPath(formData)
        ).data;

        if (response.status.statusCode !== 200)
          toast.error("Upload background image failed. Please try again");
        else {
          if (uploadType === "background")
            setMovie((movie) => ({
              ...movie,
              backdropPath: e.target.files ? e.target.files[0].name : null,
            }));
          else if (uploadType === "poster") {
            setMovie((movie) => ({
              ...movie,
              posterPath: e.target.files ? e.target.files[0].name : null,
            }));
          }
        }
      } else {
        const formData = new FormData();
        formData.set("file", e.target.files[0]);

        const response: GeneralType<any> = await (
          await storageAPI.uploadFile(formData)
        ).data;

        if (response.status.statusCode !== 200)
          toast.error("Upload movie video failed. Please try again");
        else {
          setMovie((movie) => ({
            ...movie,
            videoPath: e.target.files ? e.target.files[0].name : null,
          }));
        }
      }
    }
  };

  const handleSubmit = async () => {
    const response: GeneralType<any> = (await movieAPI.updateMovie(movie)).data;

    if (response.status.statusCode !== 200) toast.error("Create movie failed");
    else {
      toast.success("Create movie successfully");
      setOpen(false);
      navigate(0);
    }
  };

  useEffect(() => {
    const getGenreList = async () => {
      const response: GeneralType<GenreType[]> = (await movieAPI.getGenreList())
        .data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
      } else {
        setGenreList(response.data);
      }
    };

    getGenreList();
  }, []);

  useEffect(() => {
    const getBasicInfo = async () => {
      const response: GeneralType<MovieModifiedResponse> = (
        await movieAPI.getBasicInfo(
          parseInt(sessionStorage.getItem("tempId") || "0")
        )
      ).data;

      if (response.status.statusCode !== 200)
        toast.error("Can not get movie information");
      else {
        setMovie(response.data);
        setSelectedGenres(response.data.genres || []);
        setLanguage(response.data.language || "en");
      }
    };

    getBasicInfo();
  }, [sessionStorage.getItem("tempId")]);

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
                height={movie.posterPath ? "auto" : "220px"}
                sx={{
                  aspectRatio: movie.posterPath ? "auto" : "16 / 9",
                  borderStyle: "dashed",
                  borderColor: "rgba(255,255,255, 0.4)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {movie.posterPath && (
                  <Box position="relative">
                    <Box
                      component="img"
                      src={getImage(storageImage.w500Path, movie.posterPath)}
                      sx={{
                        objectFit: "center",
                        objectPosition: "center",
                        width: "100%",
                        height: "100%",
                      }}
                    />

                    <CancelIcon
                      sx={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setMovie((movie) => ({ ...movie, posterPath: null }));
                      }}
                    />
                  </Box>
                )}

                {movie.posterPath == null && (
                  <>
                    <Box
                      component="input"
                      type="file"
                      sx={{
                        display: "none",
                        width: "100%",
                        height: "100%",
                      }}
                      ref={posterInputRef}
                      accept=".jpg, .jpeg"
                      onChange={(e) => handleFileChange(e, "poster")}
                    />
                    <Button
                      sx={{
                        color: "white",
                        backgroundColor: "#1976d2",
                        "&:hover": {
                          backgroundColor: "#0d66bf",
                        },
                      }}
                      onClick={handlePosterButtonClick}
                    >
                      Upload an image
                    </Button>
                    <Typography>Drag and drop an image</Typography>
                  </>
                )}
              </Box>

              <CustomTextField
                label="Title"
                focused
                value={movie.title}
                onChange={(e) => {
                  setMovie((movie) => ({ ...movie, title: e.target.value }));
                }}
              />

              <TextareaAutosize
                minRows={5}
                placeholder="Movie overview"
                className="admin-movie-modal-textarea"
                value={movie.overview}
                onChange={(e) => {
                  setMovie((movie) => ({ ...movie, overview: e.target.value }));
                }}
                style={{
                  backgroundColor: "#1c2025",
                  color: "#fff",
                  fontSize: "1rem",
                  padding: "10px 12px",
                  resize: "none",
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.5)",
                  outline: "none",
                  width: "100%",
                }}
              />

              <FormControl fullWidth>
                <InputLabel
                  htmlFor="movie-runtime"
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    "&.Mui-focused": {
                      color: "rgb(105, 108, 255)",
                    },
                  }}
                >
                  Runtime
                </InputLabel>
                <OutlinedInput
                  id="movie-runtime"
                  value={movie.runtime}
                  startAdornment={
                    <InputAdornment position="start">(min)</InputAdornment>
                  }
                  inputProps={{
                    inputMode: "numeric", // Ensures the virtual keyboard shows numbers
                    pattern: "[0-9]*", // Ensures only numeric input
                  }}
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.5)", // Normal border color
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(105, 108, 255)", // Hover border color
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(105, 108, 255)", // Focused border color
                    },
                  }}
                  label="Runtime"
                  onChange={(e) => {
                    setMovie((movie) => ({
                      ...movie,
                      runtime: e.target.value,
                    }));
                  }}
                />
              </FormControl>

              <FormControl fullWidth>
                <InputLabel
                  id="genre-label-id"
                  sx={{
                    color: "rgba(255, 255, 255, 0.5)",
                    "&.Mui-focused": {
                      color: "rgb(105, 108, 255)",
                    },
                  }}
                >
                  Genres
                </InputLabel>

                <Select
                  labelId="genre-label-id"
                  id="genre-label"
                  multiple
                  value={selectedGenres}
                  onChange={handleGenreChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-genre"
                      label="genre"
                      sx={{
                        "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "rgb(105, 108, 255)",
                          },
                        "&.MuiOutlinedInput-root .Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: "rgb(105, 108, 255)",
                          },
                      }}
                    />
                  }
                  sx={{
                    "&.MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":
                      { borderColor: "rgb(105, 108, 255)" },
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((item) => (
                        <Chip key={item} label={item} />
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
                <InputLabel id="movie-language-label">Language</InputLabel>
                <Select
                  labelId="movie-language-label"
                  id="movie-language-select"
                  value={language}
                  label="language"
                  onChange={handleChangeLanguage}
                >
                  {definedLanguage.map((item) => (
                    <MenuItem value={item.code}>{item.value}</MenuItem>
                  ))}
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
              <TextField
                defaultValue="Released"
                label="Status"
                disabled
                sx={{
                  backgroundColor: "rgb(28, 32, 37)",
                }}
              />

              <Box sx={{ width: "100%" }}>
                <Typography marginBottom="12px" fontWeight="600">
                  Release date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                          borderColor: "rgb(105, 108, 255)", // Hover border color
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "rgb(105, 108, 255)", // Focused border color
                        },
                      },

                      "& label.Mui-focused": {
                        color: "rgb(105, 108, 255)",
                      },
                    }}
                    value={dayjs(movie.releaseDate)}
                    onChange={(value) =>
                      setMovie((movie) => ({
                        ...movie,
                        releaseDate: dayjs(value).format("YYYY-MM-DD"),
                      }))
                    }
                  />
                </LocalizationProvider>
              </Box>

              <Box>
                <Typography fontWeight="600" marginBottom="10px">
                  Movie video
                </Typography>
                <Box
                  width="100%"
                  height={movie.videoPath ? "auto" : "220px"}
                  sx={{
                    aspectRatio: movie.videoPath ? "auto" : "16 / 9",
                    borderStyle: "dashed",
                    borderColor: "rgba(255,255,255, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {movie.videoPath && (
                    <Box position="relative" width="100%" height="auto">
                      <ReactPlayer
                        controls
                        onReady={() => true}
                        width="100%"
                        height="100%"
                        url={
                          movie.videoSite === "system"
                            ? getImage(baseEndpoint, movie.videoPath)
                            : videoPath(movie.videoPath)
                        }
                      />
                      <CancelIcon
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setMovie((movie) => ({
                            ...movie,
                            videoPath: null,
                          }));
                        }}
                      />
                    </Box>
                  )}

                  {movie.videoPath == null && (
                    <>
                      <Box
                        component="input"
                        type="file"
                        sx={{ display: "none", width: "100%", height: "100%" }}
                        ref={videoInputRef}
                        accept="video/mp4,video/mov,video/webm,video/quicktime"
                        onChange={(e) => handleFileChange(e, "video")}
                      />

                      <Button
                        sx={{
                          color: "white",
                          backgroundColor: "#1976d2",
                          "&:hover": {
                            backgroundColor: "#0d66bf",
                          },
                        }}
                        onClick={handleVideoButtonClick}
                      >
                        Upload an video
                      </Button>
                      <Typography>Drag and drop an video</Typography>
                    </>
                  )}
                </Box>
              </Box>

              <Box>
                <Typography fontWeight="600" marginBottom="10px">
                  Background image
                </Typography>
                <Box
                  width="100%"
                  height={movie.backdropPath ? "auto" : "220px"}
                  sx={{
                    aspectRatio: movie.backdropPath ? "auto" : "16 / 9",
                    borderStyle: "dashed",
                    borderColor: "rgba(255,255,255, 0.4)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {movie.backdropPath && (
                    <Box position="relative">
                      <Box
                        component="img"
                        src={getImage(
                          storageImage.originalPath,
                          movie.backdropPath
                        )}
                        sx={{
                          objectFit: "center",
                          objectPosition: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      />

                      <CancelIcon
                        sx={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setMovie((movie) => ({
                            ...movie,
                            backdropPath: null,
                          }));
                        }}
                      />
                    </Box>
                  )}

                  {movie.backdropPath == null && (
                    <>
                      <Box
                        component="input"
                        type="file"
                        ref={bgInputRef}
                        sx={{
                          display: "none",
                          width: "100%",
                          height: "100%",
                        }}
                        accept=".jpg, .jpeg"
                        onChange={(e) => handleFileChange(e, "background")}
                      />
                      <Button
                        sx={{
                          color: "white",
                          backgroundColor: "#1976d2",
                          "&:hover": {
                            backgroundColor: "#0d66bf",
                          },
                        }}
                        onClick={handleBgButtonClick}
                      >
                        Upload an image
                      </Button>
                      <Typography>Drag and drop an image</Typography>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display="flex" marginTop="12px" gap={2} justifyContent="flex-end">
          <Button
            onClick={() => {
              setMovie((movie) => ({
                status: "Released",
                posterPath: null,
                backdropPath: null,
                videoPath: null,
              }));

              setOpen(false);
            }}
            sx={{
              color: "white",
              backgroundColor: "rgb(105, 108, 255)",
              "&:hover": {
                backgroundColor: "rgb(96, 98, 232)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            sx={{
              color: "white",
              backgroundColor: "rgb(105, 108, 255)",
              "&:hover": {
                backgroundColor: "rgb(96, 98, 232)",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminMovieDetailModal;
