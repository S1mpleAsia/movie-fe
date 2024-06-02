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
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useState } from "react";
import AdminMovieModal from "../components/common/AdminMovieModal";

function DeleteMovieActionItem({
  deleteMovie,
  ...props
}: GridActionsCellItemProps & { deleteMovie: () => void }) {
  const [open, setOpen] = useState(false);

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
          Delete the movie from system 🚫🚫
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Carefully. This action can not be undo !!!
          </DialogContentText>
          <DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  setOpen(false);
                  deleteMovie();
                }}
                color="warning"
                autoFocus
              >
                Delete
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
        backgroundColor: "#1b91fe",
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
            setModalOpen(true);
          }}
        />,

        <DeleteMovieActionItem
          icon={<DeleteOutlinedIcon />}
          label="Delete"
          deleteMovie={() => {}}
          closeMenuOnClick={false}
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
        <Box width="100%">
          <AdminMovieModal open={modalOpen} setOpen={setModalOpen} />
          <DataGrid
            autoHeight
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            columns={columns}
            rows={rows}
            slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: GridToolbar }}
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
      </Container>
    </Box>
  );
};

export default AdminMoviePage;
