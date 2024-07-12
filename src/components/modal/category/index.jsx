import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { forwardRef, cloneElement } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { category } from "@service";
import { categoryValidationSchema } from "@validation";

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
  const initialValues = {
    category_name: item?.category_name || "",
    category_id: item?.category_id || "",
  };
  console.log(initialValues);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = item
        ? await category.update({ id: item.id, ...values })
        : await category.create(values);

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
              {item ? "Edit Category" : "Create Category"}
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={categoryValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="category_name"
                    type="text"
                    as={TextField}
                    label="Category Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="category_name"
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
                    {isSubmitting ? "Submitting" : item ? "Change" : "To Add"}
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
