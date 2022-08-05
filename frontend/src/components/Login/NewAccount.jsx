import {
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import React,{useContext} from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as YUP from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { LoginContext } from "./LoginContext";

const paperStyle = {
  width: "70%",
  margin: "0",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  paddingBottom: "30px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

const fieldStyles = {
  marginTop: "3%",
};
const btnStyle = {
  marginTop: "6%",
  marginBottom: "6%",
  backgroundColor: "#31AFB4",
  color: "#FFFFFF"
};
function NewAccount({ handleNewAccount }) {
  const { setMessage, setOpen } = useContext(LoginContext);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    conPassword: "",
  };

  const onSubmit = async (values, props) => {
    // console.log(values);
    const data = {
      email: values.email,
      name: values.name,
      password: values.password,
    };
    await axios.post("/NewUser", data).then((response) => {
      console.log(response);
      if (response.data === "added") {
        setMessage("ingenile")
        setOpen(true)
        handleNewAccount();
      } else {
        setMessage("Account with that email exists")
        setOpen(true)
      }
    });
  };

  const validation = YUP.object().shape({
    name: YUP.string().required("Required"),
    email: YUP.string().email("Enter valid email").required("Required"),
    password: YUP.string()
      .min(
        8,
        "password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .required("Required"),
    conPassword: YUP.string().oneOf(
      [YUP.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <Paper elevation={15} style={paperStyle}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <IconButton onClick={handleNewAccount}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h4"
          style={{ marginTop: "5%", marginBottom: "10%",color: "#115571" }}
        >
          New Account
        </Typography>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validation={validation}
      >
        {(props) => (
          <Form>
            <Field
              as={TextField}
              label="Name"
              name="name"
              type="text"
              size="small"
              style={fieldStyles}
              helperText={<ErrorMessage name="name" />}
            />
            <Field
              as={TextField}
              label="Email"
              name="email"
              type="email"
              size="small"
              style={fieldStyles}
              helperText={<ErrorMessage name="email" />}
            />
            <Field
              as={TextField}
              label="Password"
              name="password"
              type="password"
              size="small"
              style={fieldStyles}
              helperText={<ErrorMessage name="password" />}
            />
            <Field
              as={TextField}
              label="Confirm password"
              name="conPassword"
              type="password"
              size="small"
              style={fieldStyles}
              helperText={<ErrorMessage name="conPassword" />}
            />
            <Button style={btnStyle} type="submit" variant="conteined">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default NewAccount;
