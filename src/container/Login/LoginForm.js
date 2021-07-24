import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { styles } from "../../styles/container/login.styles";
import { withStyles } from "@material-ui/core/styles";
import FormField from "./FormField";
import Button from "../../components/Button";

//setting the initial values
const initialValues = {
  email: "",
  password: "",
};

//creating the validation schema
const validationSchema = yup.object().shape({
  email: yup.string().email().required("Email is a required field"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
});

function LoginForm({ classes, onSubmit }) {
  //using useFormik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  //use formik.getFieldProps for input fields
  const emailProps = formik.getFieldProps("email");
  const passwordProps = formik.getFieldProps("password");

  /**
   * getFieldProps is a way to reduce boilerplate (repetitive) code.
   * It returns helper methods like `onChange`, `onBlur`, `value`, `name`.
   *
   * @see Formik https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
   */
  return (
    <div className={classes.loginWrapper}>
      <form className={classes.loginForm}>
        <div style={{ marginBottom: 20 }}>
          <FormField
            label="Email"
            type="email"
            classes={classes}
            className={classes.inputField}
            placeholder="Please Enter your email"
            {...emailProps}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={classes.errorMessage}>* {formik.errors.email}</div>
          ) : null}
        </div>
        <div style={{ marginBottom: 20 }}>
          <FormField
            label="Password"
            type="password"
            className={classes.inputField}
            classes={classes}
            placeholder="Please Enter your password"
            {...passwordProps}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className={classes.errorMessage}>
              * {formik.errors.password}
            </div>
          ) : null}
        </div>
        <div className={classes.loginButtonWrapper}>
          <Button
            text="Login"
            disabled={!(formik.isValid && formik.dirty)}
            className={classes.loginButton}
            onClick={formik.handleSubmit}
          />
        </div>
      </form>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(LoginForm);
