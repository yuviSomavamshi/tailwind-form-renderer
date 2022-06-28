//import * as Icons from "./Icons";
import * as MuiIcons from "@mui/icons-material";
import classNames from "classnames";

export default function IconRenderer({ icon = "Info", className, ...props }) {
  const MyIcon = MuiIcons[icon];
  return <MyIcon {...props} className={classNames("h-4 w-5", className)} />;
}
