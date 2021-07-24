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
import { getEmployees } from "Utils/http";

const empTableColumns = [
  { name: "First Name", value: (row) => row.firstName, width: 300 },
  { name: "Last Name", value: (row) => row.lastName, width: 300 },
  { name: "Email", value: (row) => row.email, width: 300 },
  { name: "Gender", value: (row) => row.gender, width: 100 },
  { name: "DOB", value: (row) => row.datOfBirth, width: 200 },
  {
    name: "Start Date",
    value: (row) => Moment(row.employmentStartDate).format("DD MMM YYYY"),
    width: 200,
  },
];

const EmployeeList = (props) => {
  const { classes, companyId } = props;

  const [isLoadingList, setIsLoadingList] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
    messageType: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const toolbar = () => {
    return <ListTableToolbar title={`Employee List`} />;
  };

  const fetchEmployees = () => {
    setIsLoadingList(true);
    getEmployees({
      companyId,
    })
      .then((response) => {
        setIsLoadingList(false);
        setEmployeeList(response.data);
      })
      .catch((error) => {
        setIsLoadingList(false);
        setErrorObject({
          open: true,
          message: error.errorMessage,
          messageType: "error",
        });
        console.log("error in fetching employees", error);
      });
  };

  const resetError = () => {
    setErrorObject({ open: false, message: "", messageType: "" });
  };

  return (
    <Layout>
      {!isLoadingList && employeeList.length > 0 && (
        <Table
          cols={empTableColumns}
          toolbar={toolbar}
          data={employeeList}
          pageable={false}
          totalDataCount={employeeList.length}
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

export default withStyles(styles, { withTheme: true })(EmployeeList);
