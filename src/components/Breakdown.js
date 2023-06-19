import {
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
import React, { useRef, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import "../styles/MainCSS/Pay.css";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";

const options = ["전체", "입금", "출금"];

function Breakdown({ list, flag }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [start, setStart] = useState(new Date(2023, 0, 1));
  const [end, setEnd] = useState(new Date());

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

  function dateFormat(date) {
    return (
      date.getFullYear().toString().substring(2, 4) +
      "/" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getDate().toString().padStart(2, "0")
    );
  }

  const optionedList = list.slice(1).filter((item) => {
    // if (item.amount === 0) {
    //   return false;
    // } else {
    if (selectedIndex === 0) {
      return true; // 전체
    } else if (selectedIndex === 1) {
      return item.type === "+"; // 입금
    } else if (selectedIndex === 2) {
      return item.type === "-"; // 출금
    } else {
      return false;
    }
    // }
  });
  const filteredList = optionedList.filter((item) => {
    let sliceDate = item.date.toString().substring(0, 8);
    if (
      dateFormat(start).toString() <= sliceDate.toString() &&
      sliceDate.toString() <= dateFormat(end).toString()
    ) {
      return true;
    } else {
      return false;
    }
  });

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
          <Grid
            item
            xs={12}
            mb={2}
            // sx={{ display: "flex", alignItems: "center" }}
          >
            <Typography
              variant="h4"
              component="div"
              sx={{ fontSize: "32px", display: "flex", alignItems: "center" }}
            >
              {list[1]?.amountHistory.toLocaleString()}
              {flag ? (
                <StarsRoundedIcon sx={{ color: "#FBBC05", fontSize: "32px" }} />
              ) : (
                "원"
              )}
            </Typography>
          </Grid>

          <Grid item xs={5.4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={start}
                label="시작 날짜"
                onChange={(newStart) => setStart(newStart)}
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
                onChange={(newEnd) => setEnd(newEnd)}
                TextField={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Divider>
              <Chip
                id="editChip"
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
                        color: "#A055FF",
                        width: "90px",
                        borderRadius: "16px",
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
                                    onClick={(event) =>
                                      handleMenuItemClick(event, index)
                                    }
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
                {item.type === "-" ? "-" : ""} {item.amount.toLocaleString()}
                {flag ? " P" : " 원"}
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
                {flag ? " P" : " 원"}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Paper>
    </>
  );
}

export default Breakdown;
