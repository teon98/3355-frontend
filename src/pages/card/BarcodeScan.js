import React, { useEffect, useState } from "react";
import Quagga from "quagga";
import { Box, IconButton, Typography } from "@mui/material";
import CropFreeOutlinedIcon from "@mui/icons-material/CropFreeOutlined";
import "./Barcode.css";
import { Link } from "react-router-dom";
import TopNavbar from "../../components/TopNavbar";

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
        frequency: 4,
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

function Result(props) {
  //const navi = useNavigate();

  let { result } = props;
  // console.log(result);
  if (!result) {
    return null;
  } else {
    // console.log(result.codeResult);
    console.log("code", result.codeResult.code);
    console.log("format", result.codeResult.format);
    // navi("/payment", { state: { store_no: result.codeResult.code } });
    return (
      <>
        <p style={{ margin: "0" }}>{result.codeResult.code}</p>
        <p style={{ margin: "0" }}>{result.codeResult.format}</p>
      </>
    );
  }
}

function BarcodeScan(props) {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const _scan = () => {
    setScanning(!scanning);
  };

  const _onDetected = (result) => {
    setResult(result);
  };

  return (
    <>
      <TopNavbar />
      <Typography
        variant="h6"
        align="center"
        color="white"
        sx={{ m: "24px auto 12px" }}
      >
        바코드를 스캔하세요
      </Typography>
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
      <Box
        sx={{
          backgroundColor: "#eee",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <Result result={result} />
        {result && (
          <Link
            to={"/home/pay"}
            state={{ store_no: result.codeResult.code }}
            // style={{ visibility: "hidden" }}
          >
            Pay
          </Link>
        )}
      </Box>
      <Box style={{ backgroundColor: "lightgray", display: "flex" }}>
        <IconButton
          aria-label="barcode-scan"
          size="large"
          onClick={_scan}
          sx={{ margin: "8px auto" }}
        >
          <CropFreeOutlinedIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </>
  );
}

export default BarcodeScan;
