import { Box } from "@mui/material";
import React from "react";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import "../../styles/ProfileStyles.css";
import { BorderRight } from "@mui/icons-material";

const ProfilePost = () => {
  return (
    <Box>
      <table className="postButton">
        <tr>
          <td style={{ borderRight: "solid 1px" }}>
            <ImageRoundedIcon className="iconButton" />
          </td>
          <td>
            <ViewListRoundedIcon className="iconButton" />
          </td>
        </tr>
      </table>
    </Box>
  );
};

export default ProfilePost;
