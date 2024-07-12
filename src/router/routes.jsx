import { Icon } from "@mui/material";
import CategorySharpIcon from '@mui/icons-material/CategorySharp';
import ProductionQuantityLimitsSharpIcon from '@mui/icons-material/ProductionQuantityLimitsSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';


const routes = [
  {
    path: "/main",
    content: "Category",
    icon: <Icon component={CategorySharpIcon} />,
  },
  {
    path: "/main/products",
    content: "Products",
    icon: <Icon component={ProductionQuantityLimitsSharpIcon} />,
  },
  {
    path: "/main/worker",
    content: "Workers",
    icon: <Icon component={PeopleAltSharpIcon} />,
  },
];

export default routes;
