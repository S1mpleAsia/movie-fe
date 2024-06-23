import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import uiConfigs from "../configs/ui.config";
import Container from "../components/common/Container";
import {
  DataGrid,
  GridActionsCellItem,
  GridActionsCellItemProps,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import timeUtils from "../utils/time.utils";
import languageUtils from "../utils/language.utils";
import { CustomNoRowsOverlay } from "../components/common/CustomNoRowOverlay";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useEffect, useState } from "react";
import AdminMovieModal from "../components/common/AdminMovieModal";
import { LockMovieRequest, MovieOverviewType } from "../types/MovieType";
import { movieAPI } from "../api/modules/movie.api";
import { GeneralType } from "../types/GeneralType";
import { toast } from "react-toastify";
import AdminMovieDetailModal from "../components/common/AdminMovieDetailModal";
import { useNavigate } from "react-router-dom";

function DeleteMovieActionItem({
  movieId,
  status,
  ...props
}: GridActionsCellItemProps & { movieId: number; status: string }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <GridActionsCellItem {...props} onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Change the movie status from system 🚫🚫
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Carefully. This action can not be undo !!!
          </DialogContentText>
          <DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                onClick={async () => {
                  setOpen(false);
                  const request: LockMovieRequest = {
                    movieId: movieId,
                    status: status,
                  };

                  const response: GeneralType<MovieOverviewType> = (
                    await movieAPI.lockMovie(request)
                  ).data;

                  if (response.status.statusCode !== 200)
                    toast.error(response.status.message);
                  else navigate(0);
                }}
                color="warning"
                autoFocus
              >
                {status === "Released" ? "Close" : "Open"}
              </Button>
            </DialogActions>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </>
  );
}

function statusCellRender(params: GridRenderCellParams<any, string>) {
  return (
    <Typography
      sx={{
        padding: "2px 6px",
        color: "#fff",
        backgroundColor: params.value === "Released" ? "#1b91fe" : "#c71924",
        fontSize: "0.8rem",
        borderRadius: "8px",
      }}
    >
      {params.value}
    </Typography>
  );
}

const AdminMoviePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [movies, setMovies] = useState<MovieOverviewType[]>([]);

  useEffect(() => {
    const getAllMovie = async () => {
      const response: GeneralType<MovieOverviewType[]> = (
        await movieAPI.getAllMovie()
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else setMovies(response.data);
    };

    getAllMovie();
  }, []);

  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },

    {
      field: "title",
      headerName: "Title",
      width: 300,
    },

    {
      field: "runtime",
      headerName: "Runtime",
      width: 250,
      valueGetter: (value, row) => {
        return timeUtils.convertMovieRuntime(value);
      },
    },

    {
      field: "language",
      headerName: "Language",
      width: 200,
      valueGetter: (value, row) => {
        return languageUtils.convertCodeToName(value);
      },
    },

    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: statusCellRender,
      display: "flex",
    },

    {
      field: "actions",
      type: "actions",
      width: 120,
      headerName: "Acitons",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<VisibilityOutlinedIcon />}
          label="Info"
          onClick={() => {
            setDetailModalOpen(true);
            sessionStorage.setItem("tempId", params.row.id.toString());
          }}
        />,

        <DeleteMovieActionItem
          icon={
            params.row.status === "Released" ? <BlockIcon /> : <LockOpenIcon />
          }
          label="Delete"
          closeMenuOnClick={false}
          movieId={params.row.id}
          status={params.row.status}
          sx={{ color: "#c71924" }}
        />,
      ],
    },
  ];

  const rows = [
    {
      id: 11,
      title: "Star Wars",
      runtime: "121",
      language: "en",
      status: "Released",
    },

    {
      id: 12,
      title: "Finding Nemo",
      runtime: "100",
      language: "en",
      status: "Released",
    },

    {
      id: 13,
      title: "Forrest Gump",
      runtime: "142",
      language: "en",
      status: "Released",
    },

    {
      id: 15,
      title: "Citizen Kane",
      runtime: "119",
      language: "en",
      status: "Released",
    },

    {
      id: 16,
      title: "The Fifth Element",
      runtime: "126",
      language: "en",
      status: "Released",
    },

    {
      id: 17,
      title: "Pirates of the Caribbean: The Curse of the Black Pearl",
      runtime: "143",
      language: "en",
      status: "Released",
    },
  ];

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Manage movie">
        <>
          <Box>
            <Button
              variant="contained"
              sx={{
                borderRadius: "8px",
                outline: "none",
                padding: "8px 16px",
                backgroundColor: "#282d33",
                color: "white",
                textTransform: "uppercase",
                "&:hover": {
                  backgroundColor: "#282d33",
                },
              }}
              onClick={() => {
                setModalOpen(true);
              }}
            >
              Add Movie
            </Button>
          </Box>
          <Box width="100%">
            <AdminMovieModal open={modalOpen} setOpen={setModalOpen} />

            <AdminMovieDetailModal
              open={detailModalOpen}
              setOpen={setDetailModalOpen}
            />
            <DataGrid
              autoHeight
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              columns={columns}
              rows={movies}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
                toolbar: GridToolbar,
              }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              sx={{ "--DataGrid-overlayHeight": "300px" }}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10, 25]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </>
      </Container>
    </Box>
  );
};

export default AdminMoviePage;
