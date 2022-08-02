import {
  Button,
  CssBaseline,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { LoginContext } from "./LoginContext";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as YUP from "yup";
import axios from "axios";
import NewAccount from "./NewAccount";
import { AuthContext } from "../../MainContext";

const mainDiv = {
  position: "absolute",
  width: "40%",
  left: "60%",
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.1)",
};

const btnStyle = {
  marginLeft: "10%",
  marginRight: "10%",
  marginTop: "5%",
};
const fieldStyles = {
  marginTop: "3%",
};

const paperStyle = {
  position: "absolute",
  left: "20%",
  right: "20%",
  top: "20%",
  bottom: "10%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
};

function RightPanel() {
  const { user, setMessage, setOpen } = useContext(LoginContext);
  const [signUp, setSignUp] = useState(false);

  const { googleSignIn } = useContext(AuthContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, props) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    await axios.post("http://localhost:5000/Login", data).then((res) => {
      if (res.data === "correct") {
        // all good, move to the next page
        setMessage("All good");
        setOpen(true);
        props.resetForm();
      } else if (res.data === "incorrect password") {
        setMessage("Incorrect password");
        setOpen(true);
      } else {
        // no account
        setMessage("No account");
        setOpen(true);
      }
    });
  };

  const validation = YUP.object().shape({
    email: YUP.string().email("Enter valid email").required(),
    password: YUP.string().required("Required"),
  });

  const handleNewAccount = (event) => {
    event.preventDefault();
    setSignUp(!signUp);
  };

  const handleGoogleSignIn = async (event) => {
    event.preventDefault();
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={mainDiv}>
      {signUp ? (
        <NewAccount handleNewAccount={handleNewAccount} />
      ) : (
        <Paper elevation={15} style={paperStyle}>
          <CssBaseline />
          <Typography
            variant="h4"
            style={{
              marginTop: "5%",
              color: "#115571",
            }}
          >
            LOGIN
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validation={validation}
          >
            {(props) => (
              <Form>
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
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#31AFB4",
                    width: "50%",
                    margin: "3% 0",
                  }}
                  variant="contained"
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <div>
            <Typography variant="overline">Don't have an account?</Typography>
            <Button variant="text" style={{color:"#115571"}} size="small" onClick={handleNewAccount}>
              Sign in
            </Button>
          </div>
          <Divider>OR</Divider>
          <Button
            style={{ ...btnStyle, backgroundColor: "#31AFB4", color: "white" }}
            onClick={handleGoogleSignIn}
            variant="outlined"
          >
            sign in with Google
          </Button>
          <Button
            style={{ ...btnStyle, backgroundColor: "#31AFB4", color: "white" }}
            variant="outlined"
          >
            sign in with Facebook
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default RightPanel;
