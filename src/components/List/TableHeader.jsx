import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CustomTableCell from "./TableCell";
import PropTypes from "prop-types";
// import StandardCheckbox from "../Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

const CustomTableHeader = (props) => {
  const {
    cols,
    // numSelected,
    // totalDataCount,
    // selectable,
    // onSelectAllClick,
    adjustForOverflow,
  } = props;
  const classes = useStyles();
  const colNames = cols.filter((col) => !col.hide);

  const getColumnWidth = (col) => {
    const maxWidth = 500;
    const minWidth = 300;

    if (Object.keys(col).length === 0) return 50;
    return Math.min(col.width ? col.width : minWidth, maxWidth);
  };

  if (adjustForOverflow) colNames.push({});

  return (
    <TableHead>
      <TableRow className={classes.tableRow}>
        {/* {selectable && (
          <CustomTableCell style={{ width: 50 }}>
            <StandardCheckbox
              indeterminate={numSelected > 0 && numSelected < totalDataCount}
              checked={numSelected === totalDataCount && numSelected > 0}
              disabled={totalDataCount === 0}
              onChange={onSelectAllClick}
              checkboxStyle={classes.checkbox}
            />
          </CustomTableCell>
        )} */}
        {colNames.map((column, key) => {
          return (
            <CustomTableCell
              style={{ width: getColumnWidth(column) }}
              className={classes.header}
              key={key}
              //style={{marginLeft: 16}}
            >
              <Tooltip title={column.name ? column.name : ""} enterDelay={1000}>
                <div className={classes.headerCell}>{column.name}</div>
              </Tooltip>
            </CustomTableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

CustomTableHeader.propTypes = {
  cols: PropTypes.array,
  onSelectAllClick: PropTypes.func,
  selectable: PropTypes.bool,
  numSelected: PropTypes.number,
  totalDataCount: PropTypes.number,
};

const useStyles = makeStyles((theme) => ({
  tableRow: {
    fontSize: "19px",
    color: "#363545",
    "& th": {
      paddingLeft: 20,
    },
  },
  checkbox: {
    marginLeft: "14px",
    marginRight: "-16px",
    // width: 50,
  },
  header: {
    padding: "0 16px",
    textAlign: "left",
  },
  headerCell: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    width: "100%",
    whiteSpace: "nowrap",
  },
}));

export default CustomTableHeader;
