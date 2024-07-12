import * as React from "react";
import { Product } from "@modal";
import { Button } from "@mui/material";
import { ProductTable } from "@ui";
import { useEffect, useState } from "react";
import { product } from "@service";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getData = async () => {
    try {
      const response = await product.get();
      if (response.status === 200 && response?.data?.products) {
        setData(response.data.products);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Product open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Add
          </Button>
        </div>
        <ProductTable data={currentItems} />
        <Stack spacing={2} alignItems="center">
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
    </>
  );
};

export default Index;
