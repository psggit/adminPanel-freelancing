/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CustomTableBody from "./TableBody";
import Divider from "@material-ui/core/Divider";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { every, find, uniqBy } from "lodash";
// import CustomDragLayer from "./../DragLayer";
// import { AddCircle } from "@material-ui/icons";
// import { green } from "@material-ui/core/colors";

const CustomTable = memo((props) => {
  const {
    cols = [],
    toolbar,
    pageable = false,
    page = "0",
    pageSize = 2,
    pageSizeOptions = [2, 20, 50, 100],
    data = [],
    totalDataCount = 0,
    handlePageSize,
    handlePagination,
    selectedRowsData = [],
    selectable,
    onRowSelection,
    selectionToolbar,
    rowOverflowMenu,
    selectedRowData = {},
    handleRowClick,
    style,
    clearSelection,
    onRowDidDrop,
    rowDropTargetType,
    renderOnDraggedItem,
    supportDnd = false,
  } = props;

  const classes = useStyles();

  const sizeOptions = totalDataCount ? pageSizeOptions : [];

  const [selectedRows, setSelectedRows] = useState(selectedRowsData);
  const [selectedRow, setSelectedRow] = useState(selectedRowData);
  const [toggleState, setToggleState] = useState(false);

  const tableProps = {
    style: { ...style },
  };

  useEffect(() => {
    if (handleRowClick) setSelectedRow(selectedRowData);
    if (selectable) setSelectedRows(selectedRowsData);
  }, [selectedRowData, selectedRowsData]);

  const ToolbarElement = () => {
    const displaySelectionToolbar = selectedRows.length > 0 && selectionToolbar;
    return (
      <React.Fragment>
        <div style={{ display: displaySelectionToolbar ? "none" : null }}>
          {typeof toolbar === "function" ? toolbar() : toolbar}
        </div>
        {displaySelectionToolbar && selectionToolbar(selectedRows)}
      </React.Fragment>
    );
  };

  const handlePageChange = (event, page) => {
    handlePagination(page);
  };

  const handlePageSizeChange = (event) => {
    handlePageSize(event.target.value);
  };

  const handleRowSelection = (selectedRow) => {
    let selectedRowsList = [...selectedRows];

    if (
      selectedRowsList &&
      selectedRowsList.findIndex((row) => row.id === selectedRow.id) >= 0
    ) {
      selectedRowsList = selectedRowsList.filter(
        (row) => row.id !== selectedRow.id
      );
    } else {
      selectedRowsList.push(selectedRow);
    }

    setSelectedRows(selectedRowsList);
    onRowSelection && onRowSelection(selectedRowsList);
  };

  const handleSelectAll = (pageRows) => {
    let selectedRowsList = [];

    if (toggleState) {
      selectedRowsList = [];
    } else {
      if (
        every(pageRows, (pageRow) => find(selectedRows, { id: pageRow.id }))
      ) {
        //unselect all pageRows
        selectedRowsList = selectedRows.filter(
          (item) => pageRows.findIndex((row) => row.id === item.id) === -1
        );
      } else {
        //select all pageRows
        selectedRowsList = uniqBy([...selectedRows, ...pageRows], "id");
      }
    }
    setSelectedRows(selectedRowsList);
    setToggleState(!toggleState);
    onRowSelection && onRowSelection(selectedRowsList);
  };

  // const renderDraggedItem = (items) => {
  //   return (
  //     <>
  //       <AddCircle color={green[200]} />
  //       {items.map((item, i) => (
  //         <div
  //           style={{ borderRadius: 5, padding: 10, background: "#009ad9" }}
  //           key={`dragged-item-${i}`}
  //         >
  //           {item}
  //         </div>
  //       ))}
  //     </>
  //   );
  // };

  return (
    <React.Fragment>
      <ToolbarElement />
      {/* {supportDnd && (
        <CustomDragLayer
          renderDraggingItem={
            renderOnDraggedItem ? renderOnDraggedItem : renderDraggedItem
          }
        />
      )} */}
      <div className={classes.tableWrapper}>
        <Table {...tableProps} className={classes.tableContainer}>
          <CustomTableBody
            cols={cols}
            rows={data}
            classes={{ overflow: classes.rowOverflow }}
            selectable={selectable}
            totalDataCount={totalDataCount}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelection}
            onSelectAll={handleSelectAll}
            rowOverflowMenu={rowOverflowMenu}
            selectedRow={selectedRow}
            onRowClick={handleRowClick}
            clearSelection={clearSelection}
            handleRowDrop={onRowDidDrop}
            rowDropTargetType={rowDropTargetType}
            renderOnDraggedItem={renderOnDraggedItem}
            supportDnd={supportDnd}
          />
        </Table>
      </div>
      <Divider />
      {pageable && data.length > 0 && (
        <Table>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={sizeOptions}
                count={totalDataCount}
                rowsPerPage={parseInt(pageSize)}
                page={parseInt(page)}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePageSizeChange}
                labelRowsPerPage={"Rows per page:"}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} of ${count}`
                }
              />
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </React.Fragment>
  );
});

CustomTable.propTypes = {
  cols: PropTypes.array,
  data: PropTypes.array,
  toolbar: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  selectionToolbar: PropTypes.func,
  pageable: PropTypes.bool,
  page: PropTypes.string,
  pageSize: PropTypes.string,
  pageSizeOptions: PropTypes.array,
  totalDataCount: PropTypes.number,
  handlePagination: PropTypes.func,
  selectedRowsData: PropTypes.array,
  selectable: PropTypes.bool,
  onRowSelection: PropTypes.func,
  rowOverflowMenu: PropTypes.func,
  selectedRowData: PropTypes.object,
  handleRowClick: PropTypes.func,
  clearSelection: PropTypes.func,
  onRowDidDrop: PropTypes.func,
  rowKeyIdentifier: PropTypes.string,
  rowDropTargetType: PropTypes.string,
  renderOnDraggedItem: PropTypes.func,
  supportDnd: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  overflow: {
    overflow: "auto",
    width: "100%",
  },
  table: {
    position: "relative",
  },
  tableWrapper: {
    overflow: "scroll",
    width: "100%",
  },
  tableContainer: {
    tableLayout: "fixed",
  },
}));

export default CustomTable;
