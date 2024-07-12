import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { worker } from "@service";
import { Worker } from "@modal";
import { useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables() {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [workers, setWorkers] = useState([]);

  const getData = async () => {
    try {
      const response = await worker.get();
      if (response.status === 200 && response?.data?.user) {
        setWorkers(response.data.user);
        console.log(workers);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const deleteItem = async id => {
    try {
      const response = await worker.delete(id);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editItem = item => {
    setEdit(item);
    setOpen(true);
  };

  return (
    <>
      <Worker item={edit} open={open} handleClose={() => setOpen(false)} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S/N</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.first_name}
                </StyledTableCell>{" "}
                <StyledTableCell align="center">
                  {item.last_name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.gender}</StyledTableCell>
                <StyledTableCell align="center">{item.age}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    onClick={() => deleteItem(item.id)}
                    color="error"
                  >
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                  <Button onClick={() => editItem(item)}>
                    <ModeEditOutlineOutlinedIcon />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
