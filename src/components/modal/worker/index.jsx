import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { forwardRef, cloneElement, useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { worker } from "@service";
import { workerValidationSchema } from "@validation";
import { useMask } from "@react-input/mask";

const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Index({ open, handleClose, item }) {
  const inputRef = useMask({
    mask: "998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const initialValues = {
    email: item?.email || "",
    age: item?.age || "",
    first_name: item?.first_name || "",
    gender: item?.gender || "",
    last_name: item?.last_name || "",
    password: "",
    phone_number: item?.phone_number || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const phone_number = values.phone_number.replace(/\D/g, "");
    const payload = {
      ...values,
      phone_number: `${phone_number}`,
    };

    try {
      const response = item
        ? await worker.update({ id: item.id, ...payload })
        : await worker.create(payload);

      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              className="text-center"
              id="spring-modal-title"
              variant="h5"
              component="h2"
            >
              {item ? "Employee Replacement" : "Add a Worker"}
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={workerValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="email"
                    type="text"
                    as={TextField}
                    label="Email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="age"
                    type="number"
                    as={TextField}
                    label="Age"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="age"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="first_name"
                    type="text"
                    as={TextField}
                    label="First Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="first_name"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field name="gender">
                    {({ field }) => (
                      <RadioGroup {...field} row>
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                      </RadioGroup>
                    )}
                  </Field>
                  <Field
                    name="last_name"
                    type="text"
                    as={TextField}
                    label="Last Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="last_name"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="password"
                    type="password"
                    as={TextField}
                    label="Password"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="phone_number"
                    type="text"
                    as={TextField}
                    label="Phone Number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    inputRef={inputRef}
                    helperText={
                      <ErrorMessage
                        name="phone_number"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                  >
                    {isSubmitting ? "Submitting" : item ? "Replacement" : "Add"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
