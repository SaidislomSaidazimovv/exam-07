// import {
//   Route,
//   RouterProvider,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from "react-router-dom";
// import App from "../App";
// import { SignIn, Main, Category, Worker, ForgotPassword, Product } from "@pages";
// const Index = () => {
//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<App />}>
//         <Route index element={<SignIn />} />
//         <Route path="forgot-password" element={<ForgotPassword />} />
//         <Route path="main/*" element={<Main />}>
//           <Route index element={<Category />} />
//           <Route path="products" element={<Product />} />
//           <Route path="worker" element={<Worker />} />
//         </Route>
//       </Route>
//     )
//   );
//   return <RouterProvider router={router} />;
// };
// export default Index;

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../App";
import { SignIn, Main, Category, Worker, ForgotPassword, Product, ProductDetail } from "@pages";

const Index = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="main/*" element={<Main />}>
          <Route index element={<Category />} />
          <Route path="products" element={<Product />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="worker" element={<Worker />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Index;
