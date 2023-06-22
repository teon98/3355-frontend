import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReceiptDetail from "./ReceiptDetail";
import axios from "axios";

function ReceiptDialog({ no, openDialog, handleCloseDetail }) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (no) {
      axios({
        url: `/home/history/detail`,
        method: "get",
        params: { withdrawNo: no },
      })
        .then((response) => {
          console.log(response.data);
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [no]);

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDetail}>
        <ReceiptDetail data={data} />
      </Dialog>
    </>
  );
}

export default ReceiptDialog;
