import React, { useState } from "react";
import clsx from "clsx";
import Layout from "Components/Layout";
import GroupsetList from "./GroupsetList";
import EmployeeList from "./EmployeeList";
import ManagerList from "./ManagerList";
import { styles } from "../../styles/container/companyDetails.styles";
import { withStyles } from "@material-ui/core/styles";

const CompanyDetails = (props) => {
  const { classes } = props;

  const [activeBtn, setActiveBtn] = useState("groupsets");

  const handleOptionClick = (optionName) => {
    setActiveBtn(optionName);
  };

  return (
    <Layout>
      <div className={classes.optionWrapper}>
        <div
          className={clsx(
            classes.optionStyle,
            `${activeBtn === "groupsets" ? "active" : undefined}`
          )}
          onClick={() => handleOptionClick("groupsets")}
        >
          View Groupsets
        </div>
        <div
          className={clsx(
            classes.optionStyle,
            `${activeBtn === "employees" ? "active" : undefined}`
          )}
          onClick={() => handleOptionClick("employees")}
        >
          View Employees
        </div>
        <div
          className={clsx(
            classes.optionStyle,
            `${activeBtn === "managers" ? "active" : undefined}`
          )}
          onClick={() => handleOptionClick("managers")}
        >
          View Managers
        </div>
      </div>
      {activeBtn === "groupsets" && (
        <GroupsetList companyId={props.match.params.id} />
      )}
      {activeBtn === "employees" && (
        <EmployeeList companyId={props.match.params.id} />
      )}
      {activeBtn === "managers" && (
        <ManagerList companyId={props.match.params.id} />
      )}
    </Layout>
  );
};

export default withStyles(styles, { withTheme: true })(CompanyDetails);
