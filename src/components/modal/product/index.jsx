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
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { product, category } from "@service";
import { productValidationSchema } from "@validation";

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

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  maxWidth: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "16px",
};

const fullWidthStyle = {
  gridColumn: "span 2",
};

export default function Index({ open, handleClose, item }) {
  const [cate, setCate] = useState([]);

  const getData = async () => {
    try {
      const res = await category.get();
      if (res.status === 200 && res?.data?.categories) {
        setCate(res?.data?.categories);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [setCate]);

  const initialValues = {
    age_max: item?.age_max ?? "",
    age_min: item?.age_min ?? "",
    category_id: item?.category_id ?? "",
    color: item?.color ?? [],
    cost: item?.cost ?? "",
    count: item?.count ?? "",
    description: item?.description ?? "",
    discount: item?.discount ?? "",
    for_gender: item?.for_gender ?? "",
    made_in: item?.made_in ?? "",
    product_name: item?.product_name ?? "",
    size: item?.size ?? [],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const payload = { ...values };

    const newV = {
      age_max: +values.age_max,
      age_min: +values.age_min,
      cost: +values.cost,
      count: +values.count,
      description: values.description,
      discount: +values.discount,
      for_gender: values.for_gender,
      made_in: values.made_in,
      product_name: values.product_name,
      size: [values.size],
      color: [values.color],
      category_id: values.category_id,
    };

    console.log(newV);

    try {
      const response = item
        ? await product.update({ id: item.id, ...payload })
        : await product.create(newV);

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
          <Box sx={modalStyle}>
            <Typography
              className="text-center"
              id="spring-modal-title"
              variant="h5"
              component="h2"
            >
              {item ? "Employee Replacement" : "Add a Product"}
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={productValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, values, touched, errors }) => (
                <Form style={formStyle}>
                  <Field
                    name="age_maximum"
                    type="number"
                    as={TextField}
                    label="Age Maximum"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="age_maximum"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="age_minimum"
                    type="number"
                    as={TextField}
                    label="Age Minimum"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="age_minimum"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="count"
                    type="number"
                    as={TextField}
                    label="Count"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="count"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="discount"
                    type="number"
                    as={TextField}
                    label="Discount"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="discount"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />

                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Category</InputLabel>
                    <Field
                      name="category_id"
                      as={Select}
                      label="Category"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      inputProps={{
                        name: "category_id",
                      }}
                      onChange={e =>
                        setFieldValue("category_id", e.target.value)
                      }
                      value={values.category_id}
                      required
                      error={touched.category_id && Boolean(errors.category_id)}
                    >
                      <MenuItem value="">
                        <em>Category</em>
                      </MenuItem>
                      {cate.map((item, index) => (
                        <MenuItem value={item.category_id} key={index}>
                          {item.category_name}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>

                  <FormControl fullWidth margin="normal" variant="outlined">
                    <InputLabel>Country</InputLabel>
                    <Field
                      name="made_in"
                      as={Select}
                      label="Country"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      inputProps={{
                        name: "made_in",
                      }}
                      onChange={e => setFieldValue("made_in", e.target.value)}
                      value={values.made_in}
                      required
                      error={touched.made_in && Boolean(errors.made_in)}
                      helperText={
                        <ErrorMessage
                          name="made_in"
                          component="p"
                          className="text-[red] text-[15px]"
                        />
                      }
                    >
                      <MenuItem value="Uzbekistan">Uzbekistan</MenuItem>
                      <MenuItem value="Turkey">Turkey</MenuItem>
                      <MenuItem value="China">China</MenuItem>
                    </Field>
                  </FormControl>

                  <Field
                    name="color"
                    type="text"
                    as={TextField}
                    label="Color"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="color"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <RadioGroup
                    row
                    name="gender"
                    value={values.for_gender}
                    onChange={e => setFieldValue("for_gender", e.target.value)}
                    helperText={
                      <ErrorMessage
                        name="for_gender"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  >
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
                  <Field
                    name="cost"
                    type="number"
                    as={TextField}
                    label="Cost"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="cost"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="size"
                    type="text"
                    as={TextField}
                    label="Size"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    helperText={
                      <ErrorMessage
                        name="size"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="product_name"
                    type="text"
                    as={TextField}
                    label="Product Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    style={fullWidthStyle}
                    helperText={
                      <ErrorMessage
                        name="product_name"
                        component="p"
                        className="text-[red] text-[15px]"
                      />
                    }
                  />
                  <Field
                    name="description"
                    type="text"
                    as={TextField}
                    label="Description"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    style={fullWidthStyle}
                    helperText={
                      <ErrorMessage
                        name="description"
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
                    style={fullWidthStyle}
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
