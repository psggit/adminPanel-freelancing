import React, { useCallback, useEffect, useState } from "react";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Loader from "Components/Loader";
import PageTitle from "Components/PageTitle";
import Inputbase from "Components/Inputbase";
import InputLabel from "Components/InputLabel";
import Layout from "Components/Layout";
import DialogBox from "Components/DialogBox";
import Button from "Components/Button";
import Table from "Components/List/Table";
import Notification from "Components/Notification";
import ListTableToolbar from "Components/List/ListTableToolbar";
import { getCompanies, addCompany } from "Utils/http";
import { styles } from "../../styles/container/admin.styles";
import { withStyles } from "@material-ui/core/styles";

const companyTableColumns = [
  { name: "ID", value: (row) => row.companyId, width: 300 },
  { name: "Name", value: (row) => row.name, width: 300 },
  // { name: "Logo", width: 100 },
  { name: "Email", value: (row) => row.email, width: 300 },
];

const Company = ({ classes, title, history }) => {
  //const imageInputRef = React.createRef();
  const fileInputRef = React.createRef();

  const [isLoadingList, setIsLoadingList] = useState(false);
  const [companyList, setCompanyList] = useState([]);

  const [openDialog, setopenDialog] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [companyLogoUrl, setCompanyLogoUrl] = useState("");
  const [file, setFile] = useState("");
  const [isAddingCompany, setIsAddingCompany] = useState(false);

  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
    messageType: "",
  });

  useEffect(() => {
    fetchCompanyList();
  }, []);

  const resetError = () => {
    setErrorObject({ open: false, message: "", messageType: "" });
  };

  const renderLink = (row) => {
    return (
      <p className={classes.link} onClick={() => handleRowClick(row)}>
        {row.companyId}
      </p>
    );
  };

  companyTableColumns[
    companyTableColumns.findIndex((item) => item.name === "ID")
  ].render = renderLink;

  const handleRowClick = (row) => {
    history.push(`/company/${row.companyId}`);
  };

  const fetchCompanyList = () => {
    setIsLoadingList(true);
    setCompanyList([]);
    getCompanies({})
      .then((response) => {
        setIsLoadingList(false);
        setCompanyList(response.data);
      })
      .catch((error) => {
        setIsLoadingList(false);
        setErrorObject({
          open: true,
          message: error.errorMessage,
          messageType: "error",
        });
        console.log("Error in fetching companies", error);
      });
  };

  const toolbar = useCallback(() => {
    return <ListTableToolbar title="Company List" />;
  }, []);

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // const uploadFileUpload = () => {
  //   imageInputRef.current.click();
  // };

  const uploadImage = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      //setFile(file);
      setCompanyLogoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    console.log("file", e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const handleAddCompany = () => {
    setIsAddingCompany(true);
    console.log("file p", file);
    const payload = {
      companyName,
      companyEmail: email,
      companyLogo: companyLogoUrl,
      employeeList: file,
    };
    addCompany(payload)
      .then((response) => {
        setIsAddingCompany(false);
        setErrorObject({
          open: true,
          message: "Successfully added company",
          messageType: "success",
        });
      })
      .catch((error) => {
        setIsAddingCompany(false);
        // setErrorObject({
        //   open: true,
        //   message: error.errorMessage,
        //   messageType: "error",
        // });
        console.log("Error in adding company", error);
      });
  };

  return (
    <Layout>
      <div className={classes.buttonWrapper}>
        <PageTitle title={title} />

        <Button
          id="add-company"
          text="Add Company"
          className="add-company"
          buttonWithIcon={true}
          style={{ padding: "12px 16px", marginLeft: 8 }}
          color="secondary"
          useRealText={true}
          onClick={() => setopenDialog(true)}
          disabled={isAddingCompany}
        />
      </div>

      {!isLoadingList && companyList.length > 0 && (
        <Table
          cols={companyTableColumns}
          toolbar={toolbar}
          data={companyList}
          pageable={false}
          totalDataCount={companyList.length}
        />
      )}
      {isLoadingList && (
        <Loader
          classname={classes.loaderStyle}
          isOpen={true}
          hasLoadingText={true}
          loadingText="Loading..."
        />
      )}
      {openDialog && (
        <DialogBox
          title="Add Company"
          isEditable={false}
          actions={[
            <Button
              onClick={() => setopenDialog(false)}
              color="secondary"
              key={1}
              autoFocus
              text="Cancel"
            />,
            <Button
              onClick={() => handleAddCompany()}
              color="primary"
              key={2}
              autoFocus
              text="Done"
            />,
          ]}
          handleEdit={() => {}}
        >
          <div className={classes.inputWrapper}>
            <InputLabel style={{ width: 170 }}>Company Name</InputLabel>
            <Inputbase
              id="inputbase-text"
              className={classes.inputbase}
              style={{ width: "100%" }}
              defaultValue={companyName}
              handleTextChange={handleCompanyNameChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <InputLabel style={{ width: 170 }}>Company Email</InputLabel>
            <Inputbase
              id="inputbase-text"
              className={classes.inputbase}
              style={{ width: "100%" }}
              defaultValue={email}
              handleTextChange={handleEmailChange}
            />
          </div>
          <div className={classes.inputWrapper}>
            <InputLabel style={{ width: 125 }}>Company Logo</InputLabel>
            <div
              className={classes.fileInput}
              //onClick={uploadFileUpload}
            >
              {/* {companyLogoUrl && (
                <img
                  src={companyLogoUrl}
                  alt=""
                  className={classes.fileInputImage}
                />
              )} */}
              <input
                type="file"
                //ref={imageInputRef}
                onChange={uploadImage}
                accept="image/*"
                //style={{ display: "none" }}
              />
              {/* <CloudUploadIcon /> */}
            </div>
          </div>
          <div className={classes.inputWrapper}>
            <InputLabel style={{ width: 125 }}>Upload Employees</InputLabel>
            <div onClick={handleUploadClick} className={classes.fileUploader}>
              <span style={{ marginRight: 10 }}>
                {file ? file.name : "Choose csv file"}
              </span>
              {!file && <CloudUploadIcon />}
            </div>
            <input
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={(e) => {
                handleFileChange(e);
              }}
              type="file"
              accept=".csv"
            />
          </div>
        </DialogBox>
      )}
      {errorObject.open && (
        <Notification
          handleClose={resetError}
          open={errorObject.open}
          message={errorObject.message}
          messageType={errorObject.messageType}
        />
      )}
    </Layout>
  );
};

export default withStyles(styles, { withTheme: true })(Company);
