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
import { product } from "@service";
import { useState } from "react";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import { useNavigate } from "react-router-dom";
import { media } from "@service"
import http from "../../../service/config"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(35,137,218,1)",
    color: theme.palette.common.white,
  },
  [`.${tableCellClasses.body}`]: {
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

export default function CustomizedTables({ data }) {
  const [edit, setEdit] = useState({});
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const navigate = useNavigate();

  const deleteItem = async id => {
    try {
      const response = await product.delete(id);
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

  const viewItem = async (id) => {
    try {
      const response = await product.get(id);
      if (response.status === 200) {
        navigate(`/main/product/${id}`, { state: { product: response.data } });
      } else {
        console.log("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const id ='8e379e2a-dd23-4aae-b5f0-9654627649a9'
  const handleChange = e => {
    console.log(e.target.files[0])
    const file = new FormData()
    file.append("file", e.target.files[0])
    http.post(`media/upload-photo?id=${id}`, file)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">S/N</StyledTableCell>
              <StyledTableCell align="center">Product Name</StyledTableCell>
              <StyledTableCell align="center">Color</StyledTableCell>
              <StyledTableCell align="center">Size</StyledTableCell>
              <StyledTableCell align="center">Count</StyledTableCell>
              <StyledTableCell align="center">Cost</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell align="center">{index + 1}</StyledTableCell>
                <StyledTableCell align="center">{item.product_name}</StyledTableCell>
                <StyledTableCell align="center">{item.color}</StyledTableCell>
                <StyledTableCell align="center">{item.size}</StyledTableCell>
                <StyledTableCell align="center">{item.count}</StyledTableCell>
                <StyledTableCell align="center">{item.cost}</StyledTableCell>
                <StyledTableCell align="center">
                  <Button onClick={() => deleteItem(item.product_id)} color="error">
                    <DeleteOutlineOutlinedIcon />
                  </Button>
                  <Button onClick={() => uploadItem()} color="success">
                    <AddPhotoAlternateOutlinedIcon />
                    {/* <input type="file" onChange={handleChange} /> */}
                  </Button>
                  <Button onClick={() => viewItem(item.product_id)} color="inherit">
                    <RemoveRedEyeIcon />
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
