import * as Yup from "yup";

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    "Password must be at least 6 characters  and contain at least one uppercase"
  ),
});

export const updatePassValidationSchema = Yup.object().shape({
  code: Yup.string().required().trim(),
});

// =========== Forgot Password ============

export const ValidationForgotPassword = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

// =========== Category ============

export const categoryValidationSchema = Yup.object().shape({
  category_name: Yup.string().required(" Name is required"),
});

//  =========== Worker ============

export const workerValidationSchema = Yup.object().shape({
  age: Yup.number().required(" Age is required"),
  first_name: Yup.string().required(" FullName is required"),
  last_name: Yup.string().required(" LastName is required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone_number: Yup.string()
    .min(18, "Invalid phone number")
    .required("Phone is required"),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    "Password must be at least 6 characters  and contain at least one uppercase"
  ),
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
});

//  =========== Product ============

export const productValidationSchema = Yup.object().shape({
  age_maximum: Yup.string().required("Max age  is required"),
  age_minimum: Yup.string().required("Min age  is required"),
  color: Yup.string().required("Color is required"),
  cost: Yup.number()
    .required("Cost is required")
    .typeError("Cost must be a number"),
  count: Yup.number()
  .required("Count is required")
  .typeError("Count must be a number"),
  size: Yup.string()
  .required("Size is required")
  .typeError(
    "Size must be one or more of the following: M, CM, D, C, XC, L, XL, X, V, I"
  ),
  description: Yup.string().required("Description is required"),
  made_in: Yup.string().required("Country  is required"),
  discount: Yup.number()
  .required("Discount is required")
  .typeError("Discount must be a number"),
  product_name: Yup.string().required("Product Name is required"),
  for_gender: Yup.string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
});
