import styled from "@emotion/styled";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";

const PlanCompare = () => {
  function createData(
    feature: string,
    basicPlan: string,
    standardPlan: string,
    premiumPlan: string
  ) {
    return { feature, basicPlan, standardPlan, premiumPlan };
  }

  const rows = [
    createData("Price", "$9.99/Month", "$12.99/Month", "$14.99/Month"),
    createData(
      "Content",
      "Access to a wide selection of movies and shows, including some new releases.",
      "Access to a wider selection of movies and shows, including most new releases and exclusive content",
      "Access to a widest selection of movies and shows, including all new releases and Offline Viewing"
    ),

    createData(
      "Devices",
      "Watch on one device simultaneously",
      "Watch on Two device simultaneously",
      "Watch on Four device simultaneously"
    ),

    createData("Cancel Anytime", "Yes", "Yes", "Yes"),
    createData("HDR", "No", "Yes", "Yes"),
    createData("Dolby Atmos", "No", "Yes", "Yes"),
    createData("Ad - Free", "No", "Yes", "Yes"),
    createData(
      "Offline Viewing",
      "No",
      "Yes, for select titles.",
      "Yes, for all titles."
    ),
    createData(
      "Family Sharing",
      "No",
      "Yes, up to 5 family members.",
      "Yes, up to 6 family members."
    ),
  ];

  const StyledTableCell = styled(TableCell)(({ theme }: any) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#6062e8",
      color: theme.palette.common.white,
      fontSize: 18,
    },

    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }: any) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <>
      <Stack spacing={2} marginTop="5rem">
        <Typography variant="h2" fontWeight="700">
          Compare our plans and find the right one for you
        </Typography>

        <Typography variant="body1" fontStyle="italic" sx={{ opacity: 0.7 }}>
          Movix offers three different plans to fit your needs: Basic, Standard,
          and Premium. Compare the features of each plan and choose the one
          that's right for you.
        </Typography>
      </Stack>

      <TableContainer component={Paper}>
        <Table aria-label="simple-table" sx={{ fontSize: "1rem" }}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Features</StyledTableCell>
              <StyledTableCell>Basic</StyledTableCell>
              <StyledTableCell>Standard</StyledTableCell>
              <StyledTableCell>Premium</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.feature}
                </StyledTableCell>
                <StyledTableCell>{row.basicPlan}</StyledTableCell>
                <StyledTableCell>{row.standardPlan}</StyledTableCell>
                <StyledTableCell>{row.premiumPlan}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PlanCompare;
