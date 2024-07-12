import * as React from "react";
import { Worker } from "@modal";
import { Button } from "@mui/material";
import { WorkerTable } from "@ui";
import { useEffect, useState } from "react";
import { worker } from "@service";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import http from "../../service/config"

const Index = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const getData = async () => {
    try {
      const response = await worker.get();
      if (response.status === 200 && response?.data?.workers) {
        setData(response.data.workers);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    http.get("/users", {params:{
      page:1,
      limit:10
    }})
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
      <Worker open={open} handleClose={() => setOpen(false)} />
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
          >
            To add
          </Button>
        </div>
        <WorkerTable data={currentItems} />
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
