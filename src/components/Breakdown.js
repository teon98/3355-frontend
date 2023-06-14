import {
  Box,
  Button,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import "../styles/MainCSS/Pay.css";

const options = ["전체", "입금", "출금"];
const userNo = 110; // 사용자 번호

function Breakdown(props) {
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [start, setStart] = useState(new Date(2023, 0, 1));
  const [end, setEnd] = useState(new Date());
  // const [vision, setVision] = useState(true);

  useEffect(() => {
    axios({
      url: `/home/history/${userNo}`,
      method: "get",
    })
      .then((response) => {
        console.log(response.data);
        setList(response.data);
        setFilteredList(response.data.slice(1));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClick = (event) => {
    console.log(event.target.innerText);
    // console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    console.log("======================");
    console.log(dateFormat(start));
    console.log(dateFormat(end));
    console.log("----------------------");

    filteredList.map((item, idx) => {
      let sliceDate = item.date.toString().substring(0, 8);
      console.log(dateFormat(end).toString());
      console.log(sliceDate.toString());

      console.log("시작", dateFormat(start).toString() <= sliceDate.toString());
      console.log("끝", sliceDate.toString() <= dateFormat(end).toString());

      return null;
    });
  }, [list, start, end, filteredList]);

  function dateFormat(date) {
    return (
      date.getFullYear().toString().substring(2, 4) +
      "/" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getDate().toString().padStart(2, "0")
    );
  }

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: "24px 16px 4px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">{list[0]}</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h4">
              {list[1]?.amountHistory.toLocaleString()}원
            </Typography>
          </Grid>

          <Grid item xs={5.4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={start}
                label="시작 날짜"
                sx={{ width: "100%" }}
                onChange={(newStart) => {
                  setStart(newStart);
                }}
                TextField={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">~</Typography>
          </Grid>
          <Grid item xs={5.4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={end}
                label="종료 날짜"
                onChange={(newEnd) => {
                  setEnd(newEnd);
                }}
                TextField={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Divider>
              <Chip
                label={
                  <>
                    <Button
                      // variant="contained"
                      ref={anchorRef}
                      size="small"
                      aria-controls={open ? "split-button-menu" : undefined}
                      aria-expanded={open ? "true" : undefined}
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      onClick={handleToggle}
                      sx={{
                        width: "80px",
                        alignItems: "flex-end",
                        justifyContent: "space-between",
                      }}
                    >
                      {"　"} {/* 지우지 마시오 */}
                      {options[selectedIndex]}
                      <ArrowDropDownIcon />
                    </Button>
                    <Popper
                      sx={{
                        zIndex: 1,
                      }}
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === "bottom"
                                ? "center top"
                                : "center bottom",
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList id="split-button-menu" autoFocusItem>
                                {options.map((option, index) => (
                                  <MenuItem
                                    key={option}
                                    selected={index === selectedIndex}
                                    onClick={(event) => {
                                      handleMenuItemClick(event, index);
                                      handleClick(event);
                                    }}
                                  >
                                    {option}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </>
                }
              ></Chip>
            </Divider>
          </Grid>
        </Grid>

        {filteredList.map((item, idx) => (
          <Grid container spacing={0.2} px={1} mb={4} key={idx}>
            <Grid item xs={6}>
              <Typography variant="body1" align="left">
                {item.storeName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body1"
                align="right"
                sx={{
                  fontWeight: "bold",
                  color: item.type === "+" ? "#A055FF" : "#303030",
                }}
              >
                {item.type === "-" ? "-" : ""} {item.amount.toLocaleString()} 원
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                align="left"
                sx={{ fontWeight: "lighter" }}
              >
                {item.date}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                align="right"
                sx={{ fontWeight: "lighter" }}
              >
                {item.amountHistory.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Paper>
    </>
  );
}

export default Breakdown;
