export const styles = (theme) => ({
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: 20,
    width: 500,
  },
  loaderStyle: {
    zIndex: 1024,
  },
  imgStyle: {
    width: 150,
    height: 150,
  },
  link: {
    textDecoration: "underline",
    paddingLeft: 16,
    color: "#2369aa",
    cursor: "pointer",
  },
  adminWrapper: {
    padding: 60,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 40,
    alignItems: "center",
  },
  fileInput: {
    // width: 60,
    // height: 60,
    // background: "#000",
    // borderRadius: 4,
    cursor: "pointer",
    marginRight: 10,
  },
  fileInputImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "12px 12px 0px 0px",
  },
  fileUploader: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
});
