import { useCookies } from "react-cookie";

import "./User.css";

export default function UserWidget() {
  const [cookies, setCookies, removeCookies] = useCookies(["user"]);
  console.log(cookies);

  return <div className="home-btn">{cookies.user}</div>;
}
