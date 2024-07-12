import { TextField, Button } from "@mui/material";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { ToastContainer } from "react-toastify";
import React, { useState } from "react";
import { ForgotPasswordModal } from "@modal";
import { auth } from "@service";
import { ValidationForgotPassword } from "@validation";
import Notification from "@notification";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = async (values, { setSubmitting }) => {
    setEmail(values.email);
    try {
      const response = await auth.forgot_password(values);
      if (response.status === 200) {
        setOpen(true);
        Notification({ title: "Code has been sent", type: "success" });
      }
    } catch (error) {
      console.log(error);
      Notification({ title: "Something went wrong", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <ForgotPasswordModal
        open={open}
        handleClose={() => setOpen(false)}
        email={email}
      />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full sm:w-[600px] p-5">
          <h1 className="text-center my-6 text-[50px]">Enter email...</h1>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ValidationForgotPassword}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2">
                <Field
                  as={TextField}
                  fullWidth
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
                <Button
                  variant="contained"
                  disableElevation
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
