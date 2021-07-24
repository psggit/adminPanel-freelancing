import { useCallback, useState } from "react";

const useDialogState = (props) => {
  const { defaultOpen = false, keepMounted = false } = props;
  const initialState = keepMounted ? "hidden" : null;
  const [dialogState, setDialogState] = useState(
    defaultOpen ? "visible" : initialState
  );
  const openDialog = useCallback(() => setDialogState("visible"), []);
  const closeDialog = useCallback(() => setDialogState("hidden"), []);
  const dialogRendered = !!dialogState;
  const dialogOpen = dialogState === "visible";

  return [dialogRendered, dialogOpen, openDialog, closeDialog];
};

export default useDialogState;
