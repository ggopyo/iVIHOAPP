import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { Box, Paper } from "@mui/material";
import { select, selectFailure } from "../../redux/postRedux";
import { makeStyles } from "@mui/styles";

const columns = [
  {
    field: "id",
    headerName: "번호",
    width: 60,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "identifier",
    headerName: "구분",
    width: 70,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "title",
    headerName: "제목",
    width: 150,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },

  {
    field: "desc",
    headerName: "상세",
    width: 162,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },
  {
    field: "core",
    headerName: "데이터",
    width: 160,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
  },

  {
    field: "comments",
    headerName: "댓글개수",
    width: 90,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "like",
    headerName: "좋아요개수",
    width: 90,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "createdAt",
    headerName: "생성일자",
    width: 90,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "updatedAt",
    headerName: "수정일자",
    width: 80,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "modify",
    headerName: "비고1",
    width: 86,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
  {
    field: "delete",
    headerName: "비고2",
    width: 86,
    headerClassName: "super-app-theme--header",
    headerAlign: "center",
    align: "center",
  },
];

let initialRows = [
  {
    id: 1,
    title: "Jane",
    last: "Carter",
    second: "1",
    third: "2",
  },
  {
    id: 2,
    first: "Jack",
    last: "Smith",
  },
  {
    id: 3,
    first: "Gill",
    last: "Martin",
  },
];

const MyDataGrid = ({ setTab, whichData, myGridResult }) => {
  const { newArray: searchResult, tempArray: originalData } = myGridResult;
  const dispatch = useDispatch();

  const selectPost = (postidx) => {
    try {
      dispatch(select(originalData[postidx]));
      setTab(8);
    } catch (err) {
      console.log(err);
      dispatch(selectFailure);
    }
  };

  const [rows, setRows] = useState(
    whichData === "root" ? searchResult : searchResult
  );
  const [selectedRow, setSelectedRow] = useState(null);

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setSelectedRow(Number(event.currentTarget.getAttribute("data-id")));
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4 }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  const convertToUppercase = () => {
    const newRows = rows.map((row) => {
      if (row.id === selectedRow) {
        return {
          ...row,
          first: row.first.toUpperCase(),
          last: row.last.toUpperCase(),
        };
      }
      return row;
    });
    setRows(newRows);
    handleClose();
  };

  const convertToLowercase = () => {
    const newRows = rows.map((row) => {
      if (row.id === selectedRow) {
        return {
          ...row,
          first: row.first.toLowerCase(),
          last: row.last.toLowerCase(),
        };
      }
      return row;
    });
    setRows(newRows);
    handleClose();
  };

  const useStyles = makeStyles((theme) => ({
    columnHeaderTitle: {
      backgroundColor: "#d8e2f3",
      MuiTypography: {
        fontVariant: "h4",
      },
    },
  }));
  return (
    <Box
      sx={{
        backgroundColor: "#FFFBF2",
        ml: 1,
        borderRadius: "5px",
        height: "100%",
        pb: 1,
        pt: 0.1,
      }}
    >
      <Paper
        elevation={1}
        style={{
          marginLeft: "5px",
          marginRight: "5px",
          marginTop: "5px",
          overflowY: "auto",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            height: 1,
            width: 1,
            "& .super-app-theme--header": {
              backgroundColor: "black",
              color: "white",
              fontSize: "11.5px ",
              fontWeight: "700",
            },
          }}
        >
          <DataGrid
            onCellDoubleClick={(params, event) => {
              if (!event.ctrlKey) {
                event.defaultMuiPrevented = true;
                selectPost(params.id - 1);
              }
            }}
            sx={{
              boxShadow: 2,
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
            }}
            autoHeight={true}
            disableColumnMenu={true}
            disableColumnFilter={true}
            className={useStyles}
            columns={columns}
            rows={rows}
            componentsProps={{
              row: {
                onContextMenu: handleContextMenu,
                style: { cursor: "context-menu" },
              },
            }}
          />
        </Box>
        <Menu
          open={contextMenu !== null}
          onClose={handleClose}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenu !== null
              ? {
                  top: contextMenu.mouseY,
                  left: contextMenu.mouseX,
                }
              : undefined
          }
          componentsProps={{
            root: {
              onContextMenu: (e) => {
                e.preventDefault();
                handleClose();
              },
            },
          }}
        >
          <MenuItem onClick={convertToUppercase}>UPPERCASE</MenuItem>
          <MenuItem onClick={convertToLowercase}>lowercase</MenuItem>
        </Menu>
      </Paper>
    </Box>
  );
};

export default MyDataGrid;
