/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "Components/Layout";
import Notification from "Components/Notification";
import Loader from "Components/Loader";
import Table from "Components/List/Table";
import ListTableToolbar from "Components/List/ListTableToolbar";
import { styles } from "../../styles/container/companyDetails.styles";
import { withStyles } from "@material-ui/core/styles";
import { getGroupsets } from "Utils/http";

const groupsetsTableColumns = [
  { name: "Id", value: (row) => row.groupId, width: 100 },
  { name: "Name", value: (row) => row.groupName, width: 300 },
  { name: "Description", value: (row) => row.groupDesc, width: 300 },
  { name: "Managers", value: (row) => row.managerList.join(", "), width: 300 },
];

const GroupsetList = (props) => {
  const { classes, companyId } = props;

  const [isLoadingList, setIsLoadingList] = useState(false);
  const [groupsetList, setGroupsetList] = useState([]);

  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
    messageType: "",
  });

  useEffect(() => {
    fetchGroupsets();
  }, []);

  const toolbar = () => {
    return <ListTableToolbar title={`Groupset List`} />;
  };

  const fetchGroupsets = () => {
    setIsLoadingList(true);
    getGroupsets({
      companyId,
    })
      .then((response) => {
        setIsLoadingList(false);
        const modifiedResponse = response.data.map((groupset) => {
          groupset.managerList = groupset.manager.map(
            (manager) => `${manager.firstName} ${manager.lastName}`
          );
          return groupset;
        });
        setGroupsetList(modifiedResponse);
      })
      .catch((error) => {
        setIsLoadingList(false);
        setErrorObject({
          open: true,
          message: error.errorMessage,
          messageType: "error",
        });
        console.log("error in fetching groupsets", error);
      });
  };

  const resetError = () => {
    setErrorObject({ open: false, message: "", messageType: "" });
  };

  return (
    <Layout>
      {!isLoadingList && groupsetList.length > 0 && (
        <Table
          cols={groupsetsTableColumns}
          toolbar={toolbar}
          data={groupsetList}
          pageable={false}
          totalDataCount={groupsetList.length}
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

export default withStyles(styles, { withTheme: true })(GroupsetList);
