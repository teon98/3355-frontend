import React, { useEffect, useState } from "react";
import Quagga from "quagga";
import { Box, Typography } from "@mui/material";
import "../styles/MainCSS/Barcode.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Scanner(props) {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            facingMode: "environment", // or user
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: 2,
        frequency: 1,
        decoder: {
          readers: ["code_128_reader"],
        },
        locate: true,
      },
      function (err) {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(_onDetected);
    return () => {
      Quagga.offDetected(_onDetected);
    };
  });

  const _onDetected = (result) => {
    props.onDetected(result);
  };

  return (
    <Box
      sx={{ width: "100%", height: "100%" }}
      id="interactive"
      className="viewport"
    />
  );
}

function BarcodeScan(props) {
  const navi = useNavigate();
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null);

  // useEffect(() => {
  //   setScanning(open);
  // }, [open]);

  useEffect(() => {
    console.log(scanning);
  }, [scanning]);

  const _onDetected = (newResult) => {
    if (!result || result.codeResult.code !== newResult.codeResult.code)
      setResult(newResult);
  };

  useEffect(() => {
    if (result) {
      setScanning(false);
      // document.getElementById("interactive").remove();

      axios({
        url: "/home/barcode",
        method: "get",
        params: { storeNo: result?.codeResult.code },
      })
        .then((response) => {
          if (response.data)
            navi("/home/pay", {
              state: {
                storeNo: result.codeResult.code,
                storeName: response.data,
              },
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [navi, result, scanning]);

  return (
    <Box sx={{ height: "100%" }} p={3}>
      <Box>
        <Typography variant="h6" align="center" sx={{ m: "24px 0 0" }}>
          바코드를 스캔하세요
        </Typography>
      </Box>
      <Box
        sx={{
          margin: "24px 0",
          height: "50vh",
          backgroundColor: "#eee",
          borderRadius: "12px",
        }}
      >
        {scanning ? <Scanner onDetected={_onDetected} /> : null}
      </Box>
    </Box>
  );
}

export default BarcodeScan;
