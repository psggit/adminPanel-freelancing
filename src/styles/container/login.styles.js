export const styles = (theme) => ({
  loginWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  loginForm: {
    width: "400px",
    border: `3px solid ${theme.palette.primary.main}`,
    padding: "40px",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100vw - 40px)",
      margin: "20px",
      maxWidth: "500px",
    },
  },
  inputField: {
    width: "100%",
  },
  errorMessage: {
    color: "#c81922",
    fontSize: "12px",
    paddingTop: "4px",
  },
  loginButtonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  loginButton: {
    background: theme.palette.primary.main,
    color: "#fff",
    "&:disabled": {
      color: "#fff",
    },
  },
  rootInput: {
    color: "#000",
    "& .MuiOutlinedInput-root": {
      color: "#000",
      "& fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
});
