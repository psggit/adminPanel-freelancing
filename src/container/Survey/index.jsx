/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "Components/Layout";
import Button from "Components/Button";
import Inputbase from "Components/Inputbase";
import InputLabel from "Components/InputLabel";
import Notification from "Components/Notification";
import Select from "Components/Select";
import AutoCompleteMultiSelect from "Components/Autocomplete/multiSelect";
import { styles } from "../../styles/container/survey.styles";
import { withStyles } from "@material-ui/core/styles";
import { getCompanies, getGroupsets, sendSurvey } from "Utils/http";
import { startCase, camelCase } from "lodash";

const Survey = ({ classes }) => {
  const [url, setUrl] = useState("");
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [groupsetList, setGroupsetList] = useState([]);

  const [selectedCompanyId, setSelectedCompanyId] = useState("none");
  const [selectedGroups, setSelectedGroups] = useState([]);

  const [isSubmittingSurvey, setIsSubmittingSurvey] = useState(false);

  const [errorObject, setErrorObject] = useState({
    open: false,
    message: "",
    messageType: "",
  });

  useEffect(() => {
    fetchCompanyList();
  }, []);

  useEffect(() => {
    if (selectedCompanyId !== "none") {
      setSelectedGroups([]);
      fetchGroupsets();
    }
  }, [selectedCompanyId]);

  const fetchCompanyList = () => {
    setIsLoadingList(true);
    setCompanyList([]);
    getCompanies({})
      .then((response) => {
        setIsLoadingList(false);
        const modifiedList = response.data.map((item) => {
          return {
            id: item.companyId,
            name: item.name,
          };
        });
        setCompanyList(modifiedList);
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

  const fetchGroupsets = () => {
    setIsLoadingList(true);
    getGroupsets({
      companyId: selectedCompanyId,
    })
      .then((response) => {
        setIsLoadingList(false);
        let groupsetsData = response.data.map((item) => {
          return {
            id: item.groupId,
            value: item.groupName,
            displayName: startCase(camelCase(item.groupName)),
          };
        });

        setGroupsetList(groupsetsData);
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

  const handleTextChange = (e) => {
    setUrl(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setSelectedCompanyId(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmittingSurvey(true);
    const payload = {
      surveryUrl: url,
      groupsetIds: selectedGroups.map((item) => item.id).join(","),
    };
    sendSurvey(payload)
      .then((response) => {
        setIsSubmittingSurvey(false);
        setErrorObject({
          open: true,
          message: "Submitted successfully",
          messageType: "success",
        });
      })
      .catch((error) => {
        setIsSubmittingSurvey(false);
        // setErrorObject({
        //   open: true,
        //   message: error.errorMessage,
        //   messageType: "error",
        // });
        console.log("Error in submitting survey", error);
      });
  };

  return (
    <Layout>
      <div className={classes.inputWrapper}>
        <InputLabel style={{ width: 170 }}>Survey Url</InputLabel>
        <Inputbase
          id="inputbase-text"
          className={classes.inputbase}
          style={{ width: "100%" }}
          defaultValue={url}
          handleTextChange={handleTextChange}
        />
      </div>
      <div className={classes.inputWrapper}>
        <InputLabel style={{ width: 170 }}>Company</InputLabel>
        <Select
          options={!isLoadingList ? companyList : []}
          labelKey="name"
          placeholder="Company"
          defaultValue={selectedCompanyId}
          handleSelectChange={handleCompanyChange}
        />
      </div>
      <div className={classes.inputWrapper}>
        <InputLabel style={{ width: 170 }}>Groupsets</InputLabel>
        <AutoCompleteMultiSelect
          id="autocomplete-value-controlled-box"
          optionList={groupsetList}
          value={selectedGroups}
          handleSearchChange={(e, v) => {
            setSelectedGroups(v);
          }}
          style={{ width: 500 }}
        />
      </div>
      <div className={classes.inputWrapper}>
        <Button
          text="Submit"
          disabled={isSubmittingSurvey}
          color="primary"
          onClick={handleSubmit}
        />
      </div>

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

export default withStyles(styles, { withTheme: true })(Survey);
