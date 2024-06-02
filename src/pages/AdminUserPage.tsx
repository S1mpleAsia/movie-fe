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
import React, { useEffect, useState } from "react";
import { CredentialType } from "../types/CredentialType";
import { GeneralType } from "../types/GeneralType";
import { userAPI } from "../api/modules/user.api";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import {
  DataGrid,
  GridActionsCellItem,
  GridActionsCellItemProps,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import regions from "../assets/region_modified.json";
import { RegionType } from "../types/region.type";
import { CustomNoRowsOverlay } from "../components/common/CustomNoRowOverlay";
import BlockIcon from "@mui/icons-material/Block";
import tagUtils from "../utils/tag.utils";

function regionCellRender(params: GridRenderCellParams<any, string>) {
  const region = regions.find(
    (item: RegionType) => item.name.common === params.value
  );
  return region ? (
    <Box display="flex" alignItems="center">
      <Box
        component="img"
        src={region.flags.svg}
        alt={region.flags.alt}
        width="50px"
        marginRight={1}
      />
      <Typography>{region.name.common}</Typography>
    </Box>
  ) : (
    <Typography>{params.value}</Typography>
  );
}

function userInfoCellRender(params: GridRenderCellParams<any, any>) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Box
        component="img"
        src={params.row.imagePath}
        alt="Avatar"
        width="45px"
        height="45px"
        sx={{
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
      <Box display="flex" flexDirection="column">
        <Typography fontSize="0.95rem">{params.row.email}</Typography>
        <Typography fontSize="0.85rem" sx={{ opacity: 0.8 }}>
          {tagUtils.getTagFromName(params.row.fullName)}
        </Typography>
      </Box>
    </Box>
  );
}

function statusCellRender(params: GridRenderCellParams<any, string>) {
  return (
    <Typography
      sx={{
        padding: "2px 6px",
        color: "#fff",
        backgroundColor:
          params.value === "Active"
            ? "#44B401"
            : params.value === "Pending"
            ? "#12a097"
            : "#941d24",
        borderRadius: "8px",
        fontSize: "0.8rem",
      }}
    >
      {params.value}
    </Typography>
  );
}

function BannedUserActionItem({
  deleteUser,
  ...props
}: GridActionsCellItemProps & { deleteUser: () => void }) {
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
        <DialogTitle id="alert-dialog-title">Banned this user 🚫🚫</DialogTitle>
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
                  deleteUser();
                }}
                color="warning"
                autoFocus
              >
                Block
              </Button>
            </DialogActions>
          </DialogContent>
        </DialogContent>
      </Dialog>
    </>
  );
}

const AdminUserPage = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const [userList, setUserList] = React.useState<any>();

  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "info",
      headerName: "USER INFO",
      width: 350,
      renderCell: userInfoCellRender,
      display: "flex",
    },

    {
      field: "fullName",
      headerName: "Fullname",
      width: 200,
    },

    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
    },

    {
      field: "region",
      headerName: "Region",
      description: "This column has custom render cell",
      width: 160,
      renderCell: regionCellRender,
      display: "flex",
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: statusCellRender,
      display: "flex",
    },

    {
      field: "actions",
      type: "actions",
      width: 120,
      headerName: "Actions",
      getActions: (params) => [
        <BannedUserActionItem
          icon={<BlockIcon />}
          label="Banned"
          deleteUser={() => {}}
          closeMenuOnClick={false}
          sx={{ color: "#c71924" }}
        />,
      ],
    },
  ];

  const rows = [
    {
      id: 1,
      email: "duongk65bkhn@gmail.com",
      imagePath: "http://127.0.0.1:9000/movie-system/download.jpg",
      fullName: "John Smith",
      age: 24,
      region: "Moldova",
      status: "Active",
    },

    {
      id: 2,
      email: "duongk65bkhn@gmail.com",
      imagePath: "http://127.0.0.1:9000/movie-system/download.jpg",
      fullName: "Olivia Taylor",
      age: 31,
      region: "California",
      status: "Active",
    },

    {
      id: 3,
      email: "duongk65bkhn@gmail.com",
      imagePath: "http://127.0.0.1:9000/movie-system/download.jpg",
      fullName: "Liam Jackson",
      age: 18,
      region: "England",
      status: "Active",
    },

    {
      id: 4,
      email: "duongk65bkhn@gmail.com",
      imagePath: "http://127.0.0.1:9000/movie-system/download.jpg",
      fullName: "Ava Rodriguez",
      age: 27,
      region: "Texas",
      status: "Active",
    },

    {
      id: 5,
      email: "duongk65bkhn@gmail.com",
      imagePath: "http://127.0.0.1:9000/movie-system/download.jpg",
      fullName: "Noah Lee",
      age: 42,
      region: "Australia",
      status: "Active",
    },
    {
      id: 6,
      email: "duongk65bkhn@gmail.com",
      imagePath: "http://127.0.0.1:9000/movie-system/download.jpg",
      fullName: "Sophia Williams",
      age: 19,
      region: "France",
      status: "Active",
    },
    {
      id: 7,
      email: "duongk65bkhn@gmail.com",
      imagePath: "http://127.0.0.1:9000/movie-system/download.jpg",
      fullName: "William Brown",
      age: 35,
      region: "Canada",
      status: "Active",
    },
    {
      id: 8,
      email: "duongk65bkhn@gmail.com",
      imagePath: "http://127.0.0.1:9000/movie-system/download.jpg",
      fullName: "Mia Miller",
      age: 21,
      region: "Germany",
      status: "Active",
    },
    {
      id: 9,
      email: "duongk65bkhn@gmail.com",
      imagePath: "http://127.0.0.1:9000/movie-system/download.jpg",
      fullName: "James Davis",
      age: 50,
      region: "New York",
      status: "Banned",
    },
    {
      id: 10,
      email: "duongk65bkhn@gmail.com",
      imagePath: "http://127.0.0.1:9000/movie-system/download.jpg",
      fullName: "Charlotte Clark",
      age: 29,
      region: "Spain",
      status: "Pending",
    },
  ];

  useEffect(() => {
    const getUserList = async () => {
      const response: GeneralType<CredentialType[]> = (
        await userAPI.getAllUser()
      ).data;

      if (response.status.statusCode === 200) {
        const userListResponse: CredentialType[] = response.data.filter(
          (data) => data.id !== user?.id && data.role !== "ADMIN"
        );

        setUserList(userListResponse);
      } else {
        toast.error(response.status.message);
      }
    };

    // getUserList();
  }, []);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Manage user">
        <Box width="100%">
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

export default AdminUserPage;
