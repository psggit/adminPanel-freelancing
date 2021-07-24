import React from "react";
import CustomTableHeader from "./TableHeader";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PropTypes from "prop-types";
import StandardButton from "./../Button";
import { TableCell } from "@material-ui/core";
import CustomTableCell from "./TableCell";
import Tooltip from "@material-ui/core/Tooltip";
// import AutoCompleteSearchbox from "../AutoCompleteHighlights";
// import StandardCheckbox from "../Checkbox";
import classnames from "classnames";
// import DraggableTableRow from "./DraggableTableRow";

const CustomTableBody = (props) => {
  const DEFAULT_KEY_PREFIX = "custom-table-key-";

  const {
    cols,
    rows,
    totalDataCount,
    classes,
    selectedRows = [],
    //onRowSelect,
    onSelectAll,
    selectable,
    rowOverflowMenu,
    onRowClick,
    selectedRow = {},
    // clearSelection,
    // handleRowDrop,
    // rowKeyIdentifier,
    // rowDropTargetType,
    // supportDnd,
  } = props;

  const classNames = useStyles();
  const customRowDataHash = {};

  const getRowHashKey = (rowIndex) => `${DEFAULT_KEY_PREFIX}${rowIndex}`;
  const getRowColHashKey = (rowIndex, colIndex) =>
    cols[colIndex]?.selector || `${DEFAULT_KEY_PREFIX}${rowIndex}-${colIndex}`;

  const RenderTableRows = () => {
    return rows.map((row, index) => {
      // if (supportDnd) {
      //   return (
      //     <DraggableTableRow
      //       key={index}
      //       id={index.toString()}
      //       selectedItems={selectedRows}
      //       row={row}
      //       onClick={onRowClick ? () => onRowClick(row) : () => {}}
      //       clearSelection={clearSelection}
      //       onDrop={() => handleRowDrop(selectedRows)}
      //       keyIdentifier={rowKeyIdentifier}
      //       targetType={rowDropTargetType}
      //       className={classnames(
      //         onRowClick ? classNames.highlightPointer : "",
      //         Object.keys(selectedRow).length > 0 &&
      //           row.rowNumber === selectedRow.rowNumber
      //           ? classNames.highlighted
      //           : ""
      //       )}
      //     >
      //       <Cells row={row} index={index} />
      //     </DraggableTableRow>
      //   );
      // } else {
      return (
        <TableRow
          key={index}
          hover={true}
          // onClick={onRowClick ? () => onRowClick(row) : () => { }}
          className={classnames(
            onRowClick ? classNames.highlightPointer : "",
            Object.keys(selectedRow).length > 0 &&
              row.rowNumber === selectedRow.rowNumber
              ? classNames.highlighted
              : ""
          )}
        >
          <Cells row={row} index={index} />
        </TableRow>
      );
      //}
    });
  };

  // const handleSearchChange = (v, rowIndex, colIndex) => {
  //   const rowHashKey = getRowHashKey(rowIndex);
  //   const colHashKey = getRowColHashKey(rowIndex, colIndex);
  //   customRowDataHash[rowHashKey] = {
  //     ...rows[rowIndex],
  //     ...customRowDataHash[rowHashKey],
  //     [colHashKey]: v,
  //   };
  // };

  const renderActionButtons = (rowIndex, colIndex) => {
    const rowKey = getRowHashKey(rowIndex);

    return (
      // <ButtonGroup
      //   variant="text"
      //   color="primary"
      //   aria-label="text primary button group"
      // >
      <React.Fragment>
        {cols[colIndex].actions.map((action, index) => {
          const buttonColor = action.color || "primary";
          const customButtonStyle =
            action.activeRow.indexOf(rowIndex) !== -1 && action.disabled
              ? {}
              : action.style;
          return (
            <StandardButton
              key={`custom-table-action-${index}`}
              style={{ ...customButtonStyle, marginRight: 10 }}
              color={buttonColor}
              text={action.text}
              useRealText={action.useRealText ? action.useRealText : false}
              disabled={
                action.disabled && action.activeRow.indexOf(rowIndex) !== -1
              }
              onClick={() => {
                action.onClick(customRowDataHash[rowKey]);
              }}
            />
          );
        })}
      </React.Fragment>
      // </ButtonGroup>
    );
  };

  // const renderAutocompleteBox = (rowIndex, colIndex) => {
  //   const col = cols[colIndex];
  //   const row = rows[rowIndex];
  //   const options = col.selectable ? col.options(row) : [];

  //   return (
  //     <AutoCompleteSearchbox
  //       optionList={options}
  //       style={{ width: 300, marginTop: 16, marginBottom: 8 }}
  //       label={col.label}
  //       noOptionsText={col.noOptionsText}
  //       value={
  //         col[`selValue${rowIndex}${colIndex}`] &&
  //         rowIndex === col[`selValue${rowIndex}${colIndex}`].rowIndex &&
  //         colIndex === col[`selValue${rowIndex}${colIndex}`].colIndex
  //           ? col[`selValue${rowIndex}${colIndex}`]
  //           : ""
  //       }
  //       handleSearchChange={(_, v) => handleSearchChange(v, rowIndex, colIndex)}
  //       id={`autocomplete+${colIndex}+rowIndex-${rowIndex}`}
  //     />
  //   );
  // };

  const getColumnWidth = (col) => {
    const maxWidth = 500;
    const minWidth = 300;

    return Math.min(col.width ? col.width : minWidth, maxWidth);
  };

  const Cells = ({ row, index: rowIndex }) => {
    //let isCheckboxDisabled;
    const defaultSelectKey = getRowHashKey(rowIndex);
    customRowDataHash[defaultSelectKey] = { ...row, rowIndex };

    const filteredCols = cols
      .filter((col) => !col.hide)
      .map((col, colIndex) => {
        const colHashKey = getRowColHashKey(rowIndex, colIndex);

        if (
          col[`selValue${rowIndex}${colIndex}`] &&
          col[`selValue${rowIndex}${colIndex}`].rowIndex === rowIndex &&
          col[`selValue${rowIndex}${colIndex}`].colIndex === colIndex
        ) {
          customRowDataHash[defaultSelectKey] = {
            ...row[rowIndex],
            [colHashKey]: col[`selValue${rowIndex}${colIndex}`],
            rowIndex,
          };
        }

        if (col.render && typeof col.render === "function") {
          return (
            <CustomTableCell
              key={`table-body-${colIndex}`}
              style={{ width: getColumnWidth(col) }}
            >
              {col.render(customRowDataHash[defaultSelectKey])}
            </CustomTableCell>
          );
        }

        if (col.actions)
          return (
            <CustomTableCell
              key={`table-body-${colIndex}`}
              style={{ width: getColumnWidth(col) }}
            >
              {renderActionButtons(rowIndex, colIndex)}
            </CustomTableCell>
          );

        // if (col.selectable)
        //   return (
        //     <CustomTableCell
        //       key={`table-body-${colIndex}`}
        //       style={{ width: getColumnWidth(col) }}
        //     >
        //       {renderAutocompleteBox(rowIndex, colIndex)}
        //     </CustomTableCell>
        //   );

        const value = !col.selectable ? col.value(row) : "";

        //isCheckboxDisabled = col.disabled ? col.disabled(row) : false;

        return (
          <CustomTableCell
            style={{ width: getColumnWidth(col) }}
            key={`table-body-${colIndex}`}
            onClick={onRowClick ? () => onRowClick(row) : () => {}}
          >
            <Tooltip title={value ? value : ""} enterDelay={1000}>
              <div className={classNames.cell}>{value}</div>
            </Tooltip>
          </CustomTableCell>
        );
      });

    return [
      // selectable && (
      //   <CustomTableCell key={-1} style={{ width: 50 }}>
      //     <StandardCheckbox
      //       data-testid="checkbox"
      //       disabled={isCheckboxDisabled}
      //       checkboxStyle={classNames.checkbox}
      //       checked={
      //         selectedRows && selectedRows.length > 0
      //           ? selectedRows.findIndex((data) => data.id === row.id) !== -1
      //             ? true
      //             : false
      //           : false
      //       }
      //       onClick={onRowSelect ? () => onRowSelect(row) : () => {}}
      //     />
      //   </CustomTableCell>
      // ),
      ...filteredCols,
      rowOverflowMenu && (
        <CustomTableCell
          key={filteredCols.length + 1}
          className={classes.overflow}
          style={{ width: 50 }}
        >
          {rowOverflowMenu(row)}
        </CustomTableCell>
      ),
    ];
  };

  return (
    <React.Fragment>
      <CustomTableHeader
        cols={cols}
        numSelected={selectedRows.length}
        onSelectAllClick={onSelectAll ? () => onSelectAll(rows) : () => {}}
        totalDataCount={totalDataCount}
        selectable={selectable}
        adjustForOverflow={rowOverflowMenu}
      />
      <TableBody className={classNames.tableBody}>
        {rows.length > 0 && <RenderTableRows />}
        {rows.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={
                selectable || rowOverflowMenu
                  ? cols.length + 1
                  : selectable && rowOverflowMenu
                  ? cols.length + 2
                  : cols.length
              }
              align="center"
            >
              No Results Found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </React.Fragment>
  );
};

CustomTableBody.propTypes = {
  cols: PropTypes.array,
  rows: PropTypes.array,
  classes: PropTypes.object,
  onRowSelect: PropTypes.func,
  onSelectAll: PropTypes.func,
  selectable: PropTypes.bool,
  selectedRows: PropTypes.array,
  totalDataCount: PropTypes.number,
  rowOverflowMenu: PropTypes.func,
  onRowClick: PropTypes.func,
  selectedRow: PropTypes.object,
  clearSelection: PropTypes.func,
  handleRowDrop: PropTypes.func,
  rowKeyIdentifier: PropTypes.string,
  rowDropTargetType: PropTypes.string,
  supportDnd: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  overflow: {
    width: 48,
  },
  cell: {
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: "0 16px",
  },
  tableBody: {
    backgroundColor: "inherit",
  },
  checkbox: {
    marginLeft: 14,
    marginRight: -16,
    padding: "0 12px 0 24px",
  },
  highlighted: {
    backgroundColor: "#E5F0F8",
  },
  highlightPointer: {
    cursor: "pointer",
  },
}));

export default CustomTableBody;
