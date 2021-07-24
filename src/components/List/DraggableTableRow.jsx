/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { TableRow } from "@material-ui/core";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { getEmptyImage } from "react-dnd-html5-backend";

const DraggableTableRow = (props) => {
  const { onClick, className, children } = props;
  const { selectedItems = [], onDrop, clearSelection } = props;
  const { id, keyIdentifier = "id", row = {}, targetType = "ITEM" } = props;

  const canRowDragged = (monitor) => {
    return (
      selectedItems != null &&
      (selectedItems.some((i) => i[keyIdentifier] === row[keyIdentifier]) ||
        monitor
          .getItem()
          ?.fields?.some((f) => f[keyIdentifier] === row[keyIdentifier]))
    );
  };

  const [dragProps, dragRef, preview] = useDrag({
    item: { id: keyIdentifier, type: targetType }, // Required
    begin: (monitor) => {
      return { ...monitor.getItem(), fields: selectedItems };
    },
    end: (_item, monitor) => {
      if (monitor.didDrop()) {
        if (onDrop) onDrop();
        if (clearSelection) clearSelection();
      }
    },
    canDrag: canRowDragged,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging,
      canDrag: monitor.canDrag(),
    }),
  });

  // FOR REFERENCE TO HIDE PARENT REACT NODE
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  const { canDrag } = dragProps;

  return (
    <TableRow
      key={id}
      ref={dragRef}
      onClick={onClick}
      className={className}
      style={{ cursor: canDrag ? "move" : "pointer" }}
    >
      {children}
    </TableRow>
  );
};

DraggableTableRow.propTypes = {
  id: PropTypes.string,
  hover: PropTypes.bool,
  children: PropTypes.node,
  selectedItems: PropTypes.array,
  row: PropTypes.object,
  onClick: PropTypes.func,
  onDrop: PropTypes.func,
  clearSelection: PropTypes.func,
  keyIdentifier: PropTypes.string,
  targetType: PropTypes.string,
};

export default DraggableTableRow;
