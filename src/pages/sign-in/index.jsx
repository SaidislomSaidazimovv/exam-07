import { Button, IconButton, InputAdornment } from "@mui/material";
import { Image, Visibility, VisibilityOff } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "@validation";
import Notification from "@notification";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { auth } from "@service";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../assets/login.jpg";

const Index = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    email: "xasannosirov094@gmail.com",
    password: "Sehtols@01",
  };

  const handleSubmit = async values => {
    console.log(values);
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        console.log(response);
        Notification({ title: "Success", type: "success" });
        localStorage.setItem("access_token", response?.data?.access_token);
        localStorage.setItem("refresh_token", response?.data?.refresh_token);
        setTimeout(() => {
          navigate("/main");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      Notification({ title: "Error", type: "error" });
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="w-full h-screen flex items-center justify-center bg-gray-100"
        style={{
          backgroundImage: `url(${Login})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full sm:w-[710px] p-16 bg-white  rounded-tl-3xl shadow-lg bg-opacity-80 backdrop-blur-0">
          <h1 className="text-center my-4 text-6xl font-bold text-black">
            Log in
          </h1>
          <Formik
            initialValues={initialValues}
            validationSchema={signInValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  className="mb-5"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-[red] text-[15px] "
                    />
                  }
                />
                <Link
                  className="text-blue"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </Link>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  className="mb-4"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-[red] text-[15px] "
                    />
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  fullWidth
                  className="mb-2"
                >
                  {isSubmitting ? "Submitting" : "Submit"}
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
