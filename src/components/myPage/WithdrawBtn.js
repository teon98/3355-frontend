import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditButton = styled(Button)({
  background: "white",
  width: "100%",
  marginTop: "25px",
  marginBottom: "25px",
  borderBottom: "2px solid green",
  borderRight: "2px solid green",
  "&:hover": {
    background: "#7cde9d",
  },
});

const WithdrawBtn = () => {
  const navi = useNavigate({});
  //유저 정보들
  const userNo = useSelector((state) => state.userNo);
  const dispatch = useDispatch(); //리덕스 변경
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDraw = () => {
    axios({
      url: `/user/delete.sam`,
      method: "delete",
      params: { userNo: userNo },
    })
      .then((res) => {
        if (res.data == 0) {
          console.log(res.data);
          dispatch({ type: "setUserNo", num: res.data });
          navi("/");
          setOpen(false);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <EditButton
        variant="contained"
        onClick={handleClickOpen}
        style={{ color: "green" }}
      >
        회원 탈퇴
      </EditButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ color: "black" }}>
          {`주의!
            되돌릴 수 없습니다!
          `}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ color: "black" }}
          >
            정말로 탈퇴하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "gray" }}>
            돌아가기
          </Button>
          <Button onClick={handleDraw} style={{ color: "red" }} autoFocus>
            탈퇴
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WithdrawBtn;
