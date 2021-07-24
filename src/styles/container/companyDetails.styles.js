export const styles = (theme) => ({
  optionWrapper: {
    display: "flex",
    marginBottom: 40,
  },
  optionStyle: {
    width: 160,
    backgroundColor: "#757575",
    color: "#fff",
    marginRight: 20,
    padding: 20,
    textAlign: "center",
    cursor: "pointer",
    borderRadius: 4,
    "&.active": {
      backgroundColor: "#3d7ebc",
    },
  },
  loaderStyle: {
    zIndex: 1024,
  },
});
