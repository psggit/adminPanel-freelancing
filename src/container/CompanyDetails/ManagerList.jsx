/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Moment from "moment";
import Layout from "Components/Layout";
import Notification from "Components/Notification";
import Loader from "Components/Loader";
import Table from "Components/List/Table";
import ListTableToolbar from "Components/List/ListTableToolbar";
import { styles } from "../../styles/container/companyDetails.styles";
import { withStyles } from "@material-ui/core/styles";
import { getManagers } from "Utils/http";

const managersTableColumns = [
  { name: "Id", value: (row) => row.userId, width: 100 },
  { name: "FirstName", value: (row) => row.firstName, width: 300 },
  { name: "LastName", value: (row) => row.lastName, width: 300 },
  { name: "Email", value: (row) => row.email, width: 300 },
  { name: "Gender", value: (row) => row.gender, width: 100 },
  { name: "DOB", value: (row) => row.datOfBirth, width: 200 },
  {
    name: "Start Date",
    value: (row) => Moment(row.employmentStartDate).format("DD MMM YYYY"),
    width: 200,
  },
];

const ManagerList = (props) => {
  const { classes, companyId } = props;

  const [isLoadingList, setIsLoadingList] = useState(false);
  const [managerList, setManagerList] = useState([]);

  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
    messageType: "",
  });

  useEffect(() => {
    fetchManagers();
  }, []);

  const toolbar = () => {
    return <ListTableToolbar title={`Manager List`} />;
  };

  const fetchManagers = () => {
    setIsLoadingList(true);
    getManagers({
      companyId,
    })
      .then((response) => {
        setIsLoadingList(false);
        setManagerList(response.data);
      })
      .catch((error) => {
        setIsLoadingList(false);
        setErrorObject({
          open: true,
          message: error.errorMessage,
          messageType: "error",
        });
        console.log("error in fetching managers", error);
      });
  };

  const resetError = () => {
    setErrorObject({ open: false, message: "", messageType: "" });
  };

  return (
    <Layout>
      {!isLoadingList && managerList.length > 0 && (
        <Table
          cols={managersTableColumns}
          toolbar={toolbar}
          data={managerList}
          pageable={false}
          totalDataCount={managerList.length}
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

export default withStyles(styles, { withTheme: true })(ManagerList);
